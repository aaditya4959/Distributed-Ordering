# gRPC + Kafka Capstone Project

This project is a real-world **event-driven microservices system** built using **gRPC** and **Apache Kafka**. It demonstrates how modern backend systems handle both **synchronous** and **asynchronous** communication at scale.

The **Order Service** exposes gRPC APIs for creating orders and publishes events to Kafka. Multiple independent services, such as **Notification Service** and **Analytics Service**, consume these events using different consumer groups. This showcases Kafka’s fan-out capability, fault tolerance, and message replay.

The project highlights key concepts like Protocol Buffers, Kafka producers and consumers, consumer groups, Docker-based deployment, and scalable system design. It closely reflects production-grade backend architectures used in industry.
