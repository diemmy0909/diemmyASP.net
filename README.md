# DiemMyCMS - Dự án ASP.NET Core & ReactJS

Dự án này là hệ thống Quản trị nội dung và Cửa hàng trực tuyến (E-commerce) được phát triển theo lộ trình 8 buổi thực hành, sử dụng kiến trúc Backend ASP.NET Core MVC/WebAPI kết hợp với Frontend ReactJS.

---

## PHẦN 1: TỔNG QUAN & DATABASE (CHƯƠNG 1 & 2)

### Buổi 1: Tổng quan .NET Core & C# Nâng cao
- **Mục tiêu:** Cài đặt môi trường và hiểu cấu trúc Solution 3 lớp.
- **Nội dung:** Giới thiệu .NET Core, Dependency Injection cơ bản, và cấu trúc thư mục Web API.
- **Thực hành:** Khởi tạo Base Project; tạo các Class Entity đầu tiên (Category, Post).
- **Giải thích:** Giúp làm quen với Visual Studio và cách tổ chức code chuyên nghiệp ngay từ đầu.

### Buổi 2: EF Core & Migration (Trọng tâm Chương 2)
- **Mục tiêu:** Thiết lập kết nối CSDL và tạo bảng tự động.
- **Nội dung:** Cấu hình DbContext, Connection String trong `appsettings.json`, và các lệnh Migration.
- **Thực hành:** Chạy `Add-Migration` và `Update-Database` để sinh ra CSDL CMS_DB.
- **Giải thích:** Đây là bước "xương sống" để quản lý dữ liệu mà không cần viết SQL thủ công.

### Buổi 3: Truy vấn LINQ & Thao tác dữ liệu chuyên sâu
- **Mục tiêu:** Thành thạo các hàm xử lý dữ liệu của EF Core.
- **Nội dung:** Truy vấn LINQ (Select, Where, Include), cách thêm/sửa/xóa dữ liệu.
- **Thực hành:** Viết các hàm Logic xử lý dữ liệu cho Danh mục và Bài viết.
- **Giải thích:** Giúp hiểu cách lấy dữ liệu từ SQL lên đối tượng C# để xử lý.

---

## PHẦN 2: BACKEND API & ADMIN PANEL (CHƯƠNG 3 & 4)

### Buổi 4: ASP.NET Core MVC cho trang Quản trị
- **Mục tiêu:** Xây dựng giao diện nhập liệu cho Admin.
- **Nội dung:** Controller, View, Layout, và HTML Helpers.
- **Thực hành:** Tạo các trang liệt kê và form thêm mới Danh mục/Bài viết bằng Razor View.
- **Giải thích:** Nắm vững MVC để làm các trang quản trị nhanh chóng.

### Buổi 5: Validation & Identity (Bảo mật)
- **Mục tiêu:** Kiểm soát dữ liệu và phân quyền truy cập.
- **Nội dung:** Data Annotations (kiểm tra tính hợp lệ) và ASP.NET Core Identity.
- **Thực hành:** Thiết lập trang Đăng nhập cho Admin và ràng buộc dữ liệu cho form bài viết.
- **Giải thích:** Đảm bảo chỉ người có quyền mới được sửa nội dung website.

### Buổi 6: WebAPI RESTful Service (Trọng tâm Chương 4)
- **Mục tiêu:** Cung cấp "cửa ngõ" dữ liệu cho ReactJS.
- **Nội dung:** Định nghĩa Route, HTTP Methods (GET, POST, PUT, DELETE), và định dạng JSON.
- **Thực hành:** Xây dựng các API lấy danh sách bài viết theo danh mục và chi tiết bài viết.
- **Giải thích:** API là cầu nối để Backend và Frontend "nói chuyện" với nhau.

---

## PHẦN 3: FRONTEND REACTJS & KẾT NỐI (CHƯƠNG 4)

### Buổi 7: Nhập môn ReactJS cho .NET
- **Mục tiêu:** Hiểu cách xây dựng giao diện bằng Component.
- **Nội dung:** Cài đặt Node.js, tạo Project React, JSX, Props, và State.
- **Thực hành:** Tạo giao diện "Card" bài viết đơn giản.
- **Giải thích:** Chuyển đổi tư duy từ Render phía Server sang Render phía Client.

### Buổi 8: Gọi API từ ReactJS & useEffect
- **Mục tiêu:** Hiển thị dữ liệu thực tế từ Database lên ReactJS.
- **Nội dung:** Thư viện Axios, vòng đời Component (useEffect) để gọi API.
- **Thực hành:** Gọi API bài viết từ Backend và hiển thị lên trang chủ React.
- **Giải thích:** Đây là bước thực hiện mục tiêu "Sử dụng giao diện ReactJS gọi WebAPI" trong đề cương.
