import dotenv from "dotenv";
import { connectProducer } from "./kafka-producer.js";
import { startGrpcServer } from "./grpc-server.js";

dotenv.config();

const startService = async () => {
  try {
    await connectProducer();
    startGrpcServer();
  } catch (error) {
    console.error("Failed to start Order Service", error);
    process.exit(1);
  }
};

startService();
