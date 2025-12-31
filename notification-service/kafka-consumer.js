import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
  groupId: "notification-group"
});

export { consumer };