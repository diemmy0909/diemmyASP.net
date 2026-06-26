# DiemMyCMS

Dự án Hệ thống quản trị nội dung và Cửa hàng trực tuyến DiemMyCMS.
Dự án được xây dựng với cấu trúc phân tầng:
- **CMS.Data**: Lớp truy cập dữ liệu (Entity Framework Core)
- **CMS.Backend**: Lớp xử lý nghiệp vụ, Web API và giao diện quản trị (ASP.NET Core MVC & Web API)
- **CMS.Frontend**: Giao diện cửa hàng dành cho khách hàng (ReactJS)

## Hướng dẫn chạy dự án

### 1. Chạy Backend (ASP.NET Core)
1. Mở file solution `DiemMyCMS_SOLUTION.sln` bằng **Visual Studio**.
2. Đảm bảo cấu hình chuỗi kết nối (`DefaultConnection`) tới SQL Server trong file `CMS.Backend/appsettings.json` là chính xác.
3. Thiết lập dự án khởi chạy mặc định (Startup Project) là **CMS.Backend**.
4. Nhấn phím **F5** (hoặc chọn Debug > Start Debugging) để biên dịch và chạy Backend.
5. Trình duyệt sẽ tự động mở và Backend sẽ lắng nghe các Web API cũng như phục vụ giao diện Admin.

### 2. Chạy FrontEnd (ReactJS)
1. Mở một cửa sổ Terminal (hoặc Command Prompt).
2. Di chuyển vào thư mục Frontend:
   ```bash
   cd CMS.Frontend
   ```
3. (Tùy chọn) Cài đặt các gói thư viện nếu đây là lần đầu chạy:
   ```bash
   npm install
   ```
4. Khởi động ứng dụng giao diện cửa hàng:
   ```bash
   npm start
   ```
5. Ứng dụng React sẽ khởi chạy (thường ở địa chỉ `http://localhost:3000`) và kết nối thành công tới Backend.
