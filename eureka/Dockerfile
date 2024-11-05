FROM maven:3.8.5-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/*.jar eureka.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "eureka.jar"]