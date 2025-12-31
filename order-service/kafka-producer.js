import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

export const publishOrderCreatedEvent = async (order) => {
  await producer.send({
    topic: "order-created",
    messages: [
      {
        key: order.orderId,
        value: JSON.stringify({
          eventType: "ORDER_CREATED",
          data: order,
          timestamp: new Date().toISOString()
        })
      }
    ]
  });
};
