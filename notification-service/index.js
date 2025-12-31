import dotenv from "dotenv";
dotenv.config();

import { consumer} from "./kafka-consumer.js";

async function startConsumer() {
  await consumer.connect();
  console.log("🔌 Notification Service connected to Kafka");

  await consumer.subscribe({
    topic: "order-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());

      console.log("📩 New Order Event Received");
      console.log("Order ID:", order.orderId);
      console.log("User ID:", order.userId);
      console.log("Total Amount:", order.totalAmount);

      // Simulate notification
      console.log(`📨 Sending notification to user ${order.user_id}`);
    },
  });
}

startConsumer().catch(console.error);
