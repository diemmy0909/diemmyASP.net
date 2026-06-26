# DiemMyCMS - Dự án ASP.NET Core & ReactJS

Dự án này là hệ thống Quản trị nội dung và Cửa hàng trực tuyến (E-commerce) được phát triển theo lộ trình 8 buổi thực hành, sử dụng kiến trúc Backend ASP.NET Core MVC/WebAPI kết hợp với Frontend ReactJS.

### Buổi 2: EF Core & Migration (Trọng tâm Chương 2)\

**Mục tiêu:**
Buổi học tập trung vào việc thiết lập kết nối giữa ứng dụng ASP.NET Core và hệ quản trị cơ sở dữ liệu SQL Server thông qua Entity Framework Core. Người học hiểu được quy trình tạo cơ sở dữ liệu tự động theo mô hình Code First, giúp việc quản lý dữ liệu trở nên thuận tiện và nhất quán trong suốt quá trình phát triển dự án.

**Nội dung:**
Tìm hiểu cách cài đặt và cấu hình Entity Framework Core, tạo lớp **DbContext** để quản lý các Entity trong hệ thống, đồng thời cấu hình **Connection String** trong tệp `appsettings.json` để kết nối đến SQL Server. Bên cạnh đó, buổi học giới thiệu cơ chế **Migration**, cách Entity Framework Core theo dõi sự thay đổi của mô hình dữ liệu và tự động sinh ra các tập tin Migration để cập nhật cơ sở dữ liệu.

**Thực hành:**
Tiến hành cấu hình kết nối cơ sở dữ liệu cho dự án, khai báo các `DbSet` trong lớp `DbContext` và sử dụng các lệnh `Add-Migration` để tạo Migration đầu tiên. Sau đó thực hiện lệnh `Update-Database` nhằm tự động tạo cơ sở dữ liệu **CMS_DB** cùng với các bảng tương ứng dựa trên các Entity đã xây dựng ở buổi trước.

**Kiến thức đạt được:**
Sau buổi học, người học nắm được cách sử dụng Entity Framework Core để quản lý cơ sở dữ liệu theo phương pháp Code First, biết cách tạo và cập nhật cơ sở dữ liệu bằng Migration mà không cần viết các câu lệnh SQL thủ công. Đây là nền tảng quan trọng để phát triển các chức năng CRUD và quản lý dữ liệu trong những buổi học tiếp theo.
