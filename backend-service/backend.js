const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');

const PROTO_PATH = './payment.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const paymentProto = grpc.loadPackageDefinition(packageDefinition).payment;

const client = new paymentProto.PaymentService('payment-service:50051', grpc.credentials.createInsecure());

const app = express();
const port = 3000;

app.get('/pay', (req, res) => {
  const paymentRequest = {
    user_id: '123',
    amount: 99.99
  };

  client.ProcessPayment(paymentRequest, (error, response) => {
    if (!error) {
      res.json(response);
    } else {
      res.status(500).send(error);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
