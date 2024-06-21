const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './payment.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const paymentProto = grpc.loadPackageDefinition(packageDefinition).payment;

const server = new grpc.Server();

server.addService(paymentProto.PaymentService.service, {
  ProcessPayment: (call, callback) => {
    const response = {
      success: true,
      transaction_id: 'txn_123456'
    };
    callback(null, response);
  }
});

const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Payment service running at http://localhost:${port}`);
  server.start();
});
