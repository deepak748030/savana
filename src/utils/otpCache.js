import NodeCache from 'node-cache';

const otpCache = new NodeCache({ stdTTL: 300 }); // 5 mins TTL

export default otpCache;
