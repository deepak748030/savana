import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class ShiprocketService {
    constructor() {
        this.baseUrl = process.env.SHIPROCKET_API_URL;
        this.email = process.env.SHIPROCKET_EMAIL;
        this.password = process.env.SHIPROCKET_PASSWORD;
        this.token = null;
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
            const response = await this.axiosInstance.post('/v1/external/login', {
                email: this.email,
                password: this.password
            });

            this.token = response.data.token;
            this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.token}`;
            
            return this.token;
        } catch (error) {
            console.error('Shiprocket authentication failed:', error.response?.data || error.message);
            throw new Error(`Shiprocket authentication failed: ${error.response?.data?.message || error.message}`);
        }
    }

    // Ensure we have a valid token
    async ensureAuth() {
        if (!this.token) {
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
                pickup_location: 'Default',
                channel_id: "",
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
            console.error('Failed to create shipment:', error.response?.data || error.message);
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
            console.error('Failed to track shipment:', error.response?.data || error.message);
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
            console.error('Failed to get shipments:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to retrieve shipments'
            };
        }
    }
}

export default new ShiprocketService();
