# 🤖 DiemMyCMS - Nền tảng Thương mại Điện tử Mô hình Đồ chơi & Figure

Chào mừng bạn đến với **DiemMyCMS** - một hệ thống Thương mại điện tử (E-commerce) và Quản trị nội dung (CMS) toàn diện, được thiết kế chuyên biệt cho việc **kinh doanh mô hình đồ chơi sưu tầm**. 

Dự án là nơi giao lưu và mua sắm lý tưởng dành cho các tín đồ đam mê: **Mô hình Anime, Figure, Gundam, LEGO** và các bộ sưu tập giới hạn.

![Banner](https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=1200)

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
