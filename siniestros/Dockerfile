FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

COPY ./pom.xml ./pom.xml
COPY ./.mvn .mvn/
COPY ./mvnw ./mvnw

RUN chmod +x mvnw && ./mvnw dependency:go-offline

COPY ./src ./src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=builder /app/target/siniestros-api-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 3001

ENTRYPOINT ["java", "-jar", "app.jar"]