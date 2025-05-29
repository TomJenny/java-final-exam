# 📦 Microservices Final Exam Project

## 📝 Giới thiệu
Dự án xây dựng hệ thống microservices hoàn chỉnh, sử dụng Docker Compose để orchestration, bao gồm backend (Spring Boot), frontend (React), database, monitoring, logging, service discovery/config. Phù hợp cho kiểm tra, demo hoặc phát triển thực tế.

## 🗂️ Cấu trúc dự án
- **server/**: Chứa toàn bộ backend, chia thành nhiều service nhỏ:
  - `eureka-server`: Service discovery (Spring Cloud Eureka)
  - `config-service`: Quản lý cấu hình tập trung (Spring Cloud Config)
  - `api-gateway`: Cổng vào cho toàn hệ thống (Spring Cloud Gateway)
  - `auth-service`: Xác thực, đăng nhập, đăng ký, refresh token (Spring Boot, JWT, OAuth2)
  - `department-service`, `account-service`, `admin-service`: Các service nghiệp vụ quản lý phòng ban, tài khoản, quản trị
  - `mysql`: Database MySQL, script khởi tạo bảng
  - `monitoring`: Prometheus, Grafana (giám sát)
  - `logstash`, `logs`: Thu thập, lưu trữ log
- **client/**: Frontend React, giao tiếp qua API Gateway

## ⚙️ Công nghệ sử dụng
- **Backend**: Java 17, Spring Boot, Spring Cloud, Spring Security, JWT, OAuth2, Lombok, Maven
- **Frontend**: React 16, React Router, Alert, React Scripts
- **Database**: MySQL
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Orchestration**: Docker Compose

## 🚀 Hướng dẫn cài đặt & chạy hệ thống
1. **Clone dự án:**
   ```bash
   git clone <repo-url>
   cd final-exam
   ```
2. **Cấu hình biến môi trường:**  
   Tạo file `.env` với các biến như `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`, `MYSQL_PORT`...
3. **Build tất cả các service backend (bỏ qua test):**
   ```bash
   ./build-all-services.sh
   ```
   > Nếu gặp lỗi permission, hãy chạy: `chmod +x build-all-services.sh`
4. **Khởi động hệ thống:**
   ```bash
   docker-compose up --build
   ```
5. **Dừng hệ thống:**
   ```bash
   docker-compose down
   ```
6. **Phát triển frontend:**
   ```bash
   cd client
   npm install
   npm start
   ```
   Truy cập [http://localhost:3000](http://localhost:3000)

## 🔑 Mô tả chi tiết các service chính

### 1. **Eureka Server**
- Đăng ký và phát hiện các service trong hệ thống.
- Truy cập: [http://localhost:8761](http://localhost:8761)

### 2. **Config Service**
- Quản lý cấu hình tập trung cho các microservice.
- Dễ dàng thay đổi cấu hình mà không cần build lại service.

### 3. **API Gateway**
- Là cổng vào duy nhất cho client.
- Định tuyến request, bảo mật, logging, rate limiting.

### 4. **Auth Service**
- Xác thực, đăng nhập, đăng ký, refresh token.
- Các API chính:
  - `POST /api/v1/auth/register`: Đăng ký tài khoản mới
  - `POST /api/v1/auth/login`: Đăng nhập, trả về JWT
  - `POST /api/v1/auth/refresh-token`: Làm mới access token
- Sử dụng JWT, refresh token, Spring Security, OAuth2.

### 5. **Các service nghiệp vụ**
- **Department Service**: Quản lý phòng ban
- **Account Service**: Quản lý tài khoản
- **Admin Service**: Quản trị hệ thống
- Mỗi service có controller, service, repository, entity riêng biệt.

### 6. **Monitoring & Logging**
- **Prometheus**: Thu thập số liệu từ các service (Spring Boot actuator)
- **Grafana**: Trực quan hóa số liệu, đăng nhập mặc định: admin/admin
- **Kibana**: Trực quan hóa log, tạo dashboard, search log
- **Logstash**: Thu thập log từ thư mục `server/logs` hoặc các service

## 🗄️ Database & Bảng dữ liệu
- Script khởi tạo: `server/mysql/init.sql`
- Các bảng: `users`, `department`, `account`, `roles`, `user_roles`, `refreshtoken`...

## 🛡️ Healthcheck & Phụ thuộc
- Các service cấu hình healthcheck trong `docker-compose.yml` đảm bảo khởi động đúng thứ tự.

## 📝 Lưu ý
- Kiểm tra port nếu gặp lỗi.
- Xem log tại Kibana hoặc thư mục `server/logs`.
- Tuỳ chỉnh cấu hình tại `server/config-service` hoặc các file cấu hình tương ứng.
- Reset MySQL: xóa thư mục `server/mysql/mysql-data`.

---
### 🔑 Lưu ý khi cấu hình Auth Service với GitHub OAuth2

Khi sử dụng chức năng đăng nhập với GitHub, bạn cần điền thông tin `clientId` và `clientSecret` vào file cấu hình:

Mở file:
```
server/auth-service/src/main/resources/application.properties
```
Và điền:
```
spring.security.oauth2.client.registration.github.clientId=<clientId của bạn>
spring.security.oauth2.client.registration.github.clientSecret=<clientSecret của bạn>
```
Bạn có thể lấy các thông tin này bằng cách đăng ký OAuth App tại:  
https://github.com/settings/developers

---
![Ảnh online](https://www.mermaidchart.com/raw/782a050e-f05a-414d-87bd-840e45651d9b?theme=light&version=v0.1&format=svg)

**Chúc bạn thành công với hệ thống microservices!** 