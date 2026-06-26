# DiemMyCMS - Nền tảng Thương mại Điện tử Mô hình Đồ chơi & Figure

Chào mừng bạn đến với **DiemMyCMS** - một hệ thống Thương mại điện tử (E-commerce) và Quản trị nội dung (CMS) toàn diện, được thiết kế chuyên biệt cho việc **kinh doanh mô hình đồ chơi sưu tầm**. 

Dự án là nơi giao lưu và mua sắm lý tưởng dành cho các tín đồ đam mê: **Mô hình Anime, Figure, Gundam, LEGO** và các bộ sưu tập giới hạn.

---

## 🌟 Chức năng nổi bật (Features)

### 🛍️ Phân hệ Khách hàng (Storefront - ReactJS)
- **Giao diện đậm chất Wibu/Collector:** Phong cách thiết kế hiện đại, làm nổi bật chi tiết sắc nét của từng mô hình.
- **Gian hàng Mô hình Đa dạng:** Trưng bày sản phẩm theo các chuyên mục: *Anime Figure, Gunpla (Gundam), LEGO, Blind Box*.
- **Slider Banner Động (Swiper.js):** Trình chiếu các sự kiện pre-order (đặt trước), ra mắt mô hình mới cực kỳ bắt mắt ngay trang chủ.
- **Giỏ hàng & Đặt hàng:** Xử lý logic giỏ hàng (Cart) linh hoạt, quy trình Checkout mượt mà dành cho các "dân chơi" chốt đơn.
- **Quản lý Tài khoản Khách hàng:** Đăng ký, Đăng nhập, Quản lý thông tin cá nhân và lịch sử Đơn hàng bảo mật.

### 📝 Phân hệ Quản trị & Blog CMS (Admin Panel - ASP.NET Core)
Hệ thống CMS mạnh mẽ, nơi admin quản lý toàn bộ gian hàng và xuất bản các bài viết chất lượng:
- **Bài viết Review Mô hình (Post):** Đánh giá chi tiết các mẫu figure mới ra mắt, soi độ tinh xảo, màu sơn và khớp nối.
- **Hướng dẫn Lắp ráp (Tutorials):** Các bài viết hướng dẫn lắp ráp Gundam, LEGO từ cơ bản đến nâng cao.
- **Bảo quản & Custom:** Cẩm nang hướng dẫn cách bảo quản mô hình tránh ẩm mốc, phai màu và các mẹo độ/chế (custom) mô hình.
- **Quản lý Sản phẩm (Catalog):** Thêm, sửa, xóa các mô hình, phân loại theo tỷ lệ (1/7, 1/8) hoặc thương hiệu (Bandai, Good Smile Company).
- **Quản lý Đơn hàng & User:** Theo dõi và xử lý đơn hàng, quản trị người dùng.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

### Backend (Server-side)
* **Framework:** ASP.NET Core 8.0 (MVC & Web API)
* **Database:** Microsoft SQL Server
* **ORM:** Entity Framework Core (Code-First Approach & Migrations)
* **Kiến trúc:** Cấu trúc 3 lớp (3-Tier Architecture) phân tách rõ ràng Data, Service và UI.

### Frontend (Client-side)
* **Framework/Library:** ReactJS (v18+)
* **Build Tool:** Vite 
* **State Management & API:** Axios, LocalStorage.
* **UI/UX:** Vanilla CSS, Bootstrap Icons, Lucide React, Swiper.js.

---

## 🚀 Hướng dẫn Cài đặt & Chạy dự án (Installation Guide)

### Yêu cầu hệ thống:
- Visual Studio 2022 (Hỗ trợ .NET 8.0)
- Node.js (Bản v18.x trở lên)
- Microsoft SQL Server 

### Bước 1: Khởi động Backend & Cơ sở dữ liệu
1. Mở file **`DiemMyCMS_SOLUTION.sln`** bằng Visual Studio 2022.
2. Thiết lập dự án `CMS.Backend` làm **Startup Project**.
3. Cập nhật chuỗi kết nối (`DefaultConnection`) trong `CMS.Backend/appsettings.json`.
4. Mở **Package Manager Console**, chọn Default project là `CMS.Data`.
5. Chạy lệnh: `Update-Database` để tự động sinh CSDL.
6. Bấm **F5** để chạy dự án. Backend sẽ khởi động (thường ở `http://localhost:5188`).

### Bước 2: Khởi động Frontend ReactJS
1. Mở Terminal và di chuyển vào thư mục Frontend: `cd CMS.Frontend`
2. Cài đặt các thư viện: `npm install --legacy-peer-deps`
3. Chạy Frontend Server: `npm start`
4. Truy cập `http://localhost:5173` để trải nghiệm cửa hàng mô hình!

---

## 📅 Lộ trình Phát triển (Development Roadmap)

### PHẦN 1: TỔNG QUAN & DATABASE (CHƯƠNG 1 & 2)

#### Buổi 1: Tổng quan .NET Core & C# Nâng cao
- **Mục tiêu:** Cài đặt môi trường và hiểu cấu trúc Solution 3 lớp.
- **Nội dung:** Giới thiệu .NET Core, Dependency Injection cơ bản, và cấu trúc thư mục Web API.
- **Thực hành:** Khởi tạo Base Project; tạo các Class Entity đầu tiên (Category, Post).
- **Giải thích:** Giúp làm quen với Visual Studio và cách tổ chức code chuyên nghiệp ngay từ đầu.

#### Buổi 2: EF Core & Migration (Trọng tâm Chương 2)
- **Mục tiêu:** Thiết lập kết nối CSDL và tạo bảng tự động.
- **Nội dung:** Cấu hình DbContext, Connection String trong `appsettings.json`, và các lệnh Migration.
- **Thực hành:** Chạy `Add-Migration` và `Update-Database` để sinh ra CSDL `CMS_DB`.
- **Giải thích:** Đây là bước "xương sống" để quản lý dữ liệu mà không cần viết SQL thủ công.

#### Buổi 3: Truy vấn LINQ & Thao tác dữ liệu chuyên sâu
- **Mục tiêu:** Thành thạo các hàm xử lý dữ liệu của EF Core.
- **Nội dung:** Truy vấn LINQ (Select, Where, Include), cách thêm/sửa/xóa dữ liệu.
- **Thực hành:** Viết các hàm Logic xử lý dữ liệu cho Danh mục và Bài viết Review Mô hình.
- **Giải thích:** Giúp hiểu cách lấy dữ liệu từ SQL lên đối tượng C# để xử lý.

### PHẦN 2: BACKEND API & ADMIN PANEL (CHƯƠNG 3 & 4)

#### Buổi 4: ASP.NET Core MVC cho trang Quản trị
- **Mục tiêu:** Xây dựng giao diện nhập liệu cho Admin.
- **Nội dung:** Controller, View, Layout, và HTML Helpers.
- **Thực hành:** Tạo các trang liệt kê và form thêm mới Danh mục/Bài viết bằng Razor View.
- **Giải thích:** Nắm vững MVC để làm các trang quản trị chuyên nghiệp, nơi Admin có thể cập nhật các mẫu mô hình đồ chơi mới.

#### Buổi 5: Validation & Identity (Bảo mật)
- **Mục tiêu:** Kiểm soát dữ liệu và phân quyền truy cập.
- **Nội dung:** Data Annotations (kiểm tra tính hợp lệ) và ASP.NET Core Identity.
- **Thực hành:** Thiết lập trang Đăng nhập cho Admin và ràng buộc dữ liệu cho form bài viết.
- **Giải thích:** Đảm bảo chỉ người có quyền (Admin) mới được đăng tải thông tin, thay đổi giá cả của mô hình giới hạn.

#### Buổi 6: WebAPI RESTful Service (Trọng tâm Chương 4)
- **Mục tiêu:** Cung cấp "cửa ngõ" dữ liệu cho ReactJS.
- **Nội dung:** Định nghĩa Route, HTTP Methods (GET, POST, PUT, DELETE), và định dạng JSON.
- **Thực hành:** Xây dựng các API lấy danh sách bài viết theo danh mục và chi tiết bài viết.
- **Giải thích:** API là cầu nối để Backend và Frontend "nói chuyện" với nhau, truyền tải thông tin sản phẩm từ Database ra Storefront.

### PHẦN 3: FRONTEND REACTJS & KẾT NỐI (CHƯƠNG 4)

#### Buổi 7: Nhập môn ReactJS cho .NET
- **Mục tiêu:** Hiểu cách xây dựng giao diện bằng Component.
- **Nội dung:** Cài đặt Node.js, tạo Project React, JSX, Props, và State.
- **Thực hành:** Tạo giao diện "Card" bài viết đơn giản.
- **Giải thích:** Chuyển đổi tư duy từ Render phía Server sang Render phía Client, đem lại trải nghiệm mượt mà như xem danh mục mô hình thật.

#### Buổi 8: Gọi API từ ReactJS & useEffect
- **Mục tiêu:** Hiển thị dữ liệu thực tế từ Database lên ReactJS.
- **Nội dung:** Thư viện Axios, vòng đời Component (useEffect) để gọi API.
- **Thực hành:** Gọi API bài viết/sản phẩm từ Backend và hiển thị lên trang chủ React.
- **Giải thích:** Đây là bước thực hiện mục tiêu "Sử dụng giao diện ReactJS gọi WebAPI" trong đề cương, hoàn thiện hệ thống E-commerce hiện đại.
