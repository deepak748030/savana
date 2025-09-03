import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class ShiprocketService {
    constructor() {
        this.baseUrl = process.env.SHIPROCKET_API_URL;
        this.email = process.env.SHIPROCKET_EMAIL;
        this.password = process.env.SHIPROCKET_PASSWORD;
        this.pickupPincode = process.env.SHIPROCKET_PICKUP_PINCODE;
        this.token = null;
        this.tokenExpiry = null; // To store token expiration timestamp

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Authenticate and get token
    async authenticate() {
        try {
            const response = await this.axiosInstance.post('/v1/external/auth/login', {
                email: this.email,
                password: this.password
            });

            this.token = response.data.token;
            // Shiprocket tokens typically expire in 15 days (1296000 seconds).
            // We'll set expiry to 14 days from now to ensure a refresh before actual expiration.
            this.tokenExpiry = Date.now() + (14 * 24 * 60 * 60 * 1000); // 14 days in milliseconds
            this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.token}`;

            return this.token;
        } catch (error) {
            console.error('[ShiprocketService] Shiprocket authentication failed:', error.response?.data || error.message, 'Request config:', error.config); // Keep critical error logging
            throw new Error(`Shiprocket authentication failed: ${error.response?.data?.message || error.message}`);
        }
    }

    // Ensure we have a valid token, refresh if expired or not present
    async ensureAuth() {
        if (!this.token || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
            await this.authenticate();
        }
    }

    // Create shipment in Shiprocket
    async createShipment(orderData) {
        try {
            await this.ensureAuth();

            const shipmentData = {
                order_id: orderData._id.toString(),
                order_date: new Date().toISOString().split('T')[0],
                pickup_location: 'Default', // This might need to be dynamic
                channel_id: "", // This might need to be dynamic
                comment: "Order placed via ecommerce platform",
                billing_customer_name: orderData.shippingAddress.fullName,
                billing_last_name: "",
                billing_address: orderData.shippingAddress.address,
                billing_address_2: "",
                billing_city: orderData.shippingAddress.city,
                billing_pincode: orderData.shippingAddress.postalCode,
                billing_state: orderData.shippingAddress.state,
                billing_country: "India",
                billing_email: orderData.user.email || "",
                billing_phone: orderData.shippingAddress.phone,
                shipping_is_billing: true,
                order_items: orderData.products.map(item => ({
                    name: item.product.title,
                    sku: item.productVariant?.sku || `SKU-${item.product._id}`,
                    units: item.quantity,
                    selling_price: item.product.discountedAmount || item.product.amount,
                    product_id: item.product._id.toString()
                })),
                payment_method: orderData.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
                sub_total: orderData.totalAmount,
                length: 10,
                breadth: 10,
                height: 10,
                weight: 0.5
            };

            const response = await this.axiosInstance.post('/v1/external/orders/create/adhoc', shipmentData);

            return {
                success: true,
                data: response.data,
                message: 'Shipment created successfully'
            };
        } catch (error) {
            console.error('Failed to create shipment:', error.response?.data || error.message); // Keep critical error logging
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to create shipment in Shiprocket'
            };
        }
    }

    // Track shipment
    async trackShipment(shippingId) {
        try {
            await this.ensureAuth();

            const response = await this.axiosInstance.get(`/v1/external/courier/track`, {
                params: { shipment_id: shippingId }
            });

            return {
                success: true,
                data: response.data,
                message: 'Tracking information retrieved successfully'
            };
        } catch (error) {
            console.error('Failed to track shipment:', error.response?.data || error.message); // Keep critical error logging
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to retrieve tracking information'
            };
        }
    }

    // Get all shipments
    async getShipments(page = 1, limit = 10) {
        try {
            await this.ensureAuth();

            const response = await this.axiosInstance.get('/v1/external/orders', {
                params: { page, limit }
            });

            return {
                success: true,
                data: response.data,
                message: 'Shipments retrieved successfully'
            };
        } catch (error) {
            console.error('Failed to get shipments:', error.response?.data || error.message); // Keep critical error logging
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to retrieve shipments'
            };
        }
    }

    // New method to check pincode serviceability and estimated delivery
    async checkServiceability(deliveryPincode, options = {}) {
        try {
            await this.ensureAuth(); // Ensure token is valid and refreshed if needed

            const {
                pickup_postcode = this.pickupPincode, // Use configured pickup pincode from .env
                cod = 1, // Default to COD enabled
                weight = 0.5, // Default weight in kg
                length = 15, // Default length in cm
                breadth = 10, // Default breadth in cm
                height = 5, // Default height in cm
                declared_value = 50 // Default declared value
            } = options;

            if (!pickup_postcode) {
                console.error('[ShiprocketService] SHIPROCKET_PICKUP_PINCODE is not configured in environment variables.'); // Keep critical error logging
                throw new Error('Shiprocket pickup pincode is not configured in environment variables (SHIPROCKET_PICKUP_PINCODE).');
            }

            const requestParams = {
                pickup_postcode,
                delivery_postcode: deliveryPincode,
                cod,
                weight,
                length,
                breadth,
                height,
                declared_value
            };

            const response = await this.axiosInstance.get('/v1/external/courier/serviceability', {
                params: requestParams
            });

            return {
                success: true,
                data: response.data,
                message: 'Pincode serviceability checked successfully'
            };
        } catch (error) {
            console.error('[ShiprocketService] Failed to check pincode serviceability:', error.response?.data || error.message, 'Request config:', error.config); // Keep critical error logging
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to check pincode serviceability with Shiprocket'
            };
        }
    }
}

export default new ShiprocketService();
