#!/bin/bash


# Danh sách các service cần build
services=(
  "eureka-server"
  "config-service"
  "api-gateway"
  "auth-service"
  "department-service"
  "account-service"
  "admin-service"
)

for service in "${services[@]}"
do
  echo "-----------------------------"
  echo "Đang build $service ..."
  cd $service
  ./mvnw clean install -DskipTests
  cd ..
done

echo "Hoàn thành build tất cả service!"