import client from 'prom-client';
import express from 'express';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const metricsApp = express();

metricsApp.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

metricsApp.listen(9100, () => {
    console.log('Prometheus metrics running on port 9100');
});
