import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { publishOrderCreatedEvent } from "./kafka-producer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../proto/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

const createOrder = async (call, callback) => {
  const { user_id, items, total_amount } = call.request;

  if (!user_id || !items || items.length === 0) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Invalid order request"
    });
  }

  const order = {
    orderId: uuidv4(),
    userId: user_id,
    items,
    totalAmount: total_amount
  };

  await publishOrderCreatedEvent(order);

  callback(null, {
    order_id: order.orderId,
    status: "SUCCESS",
    message: "Order created successfully"
  });
};

export const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(orderProto.OrderService.service, {
    CreateOrder: createOrder
  });

  const port = process.env.GRPC_PORT;

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running on port ${port}`);
      server.start();
    }
  );
};
