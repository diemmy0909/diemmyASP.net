# DiemMyCMS - Dự án ASP.NET Core & ReactJS

Dự án này là hệ thống Quản trị nội dung và Cửa hàng trực tuyến (E-commerce) được phát triển theo lộ trình 8 buổi thực hành, sử dụng kiến trúc Backend ASP.NET Core MVC/WebAPI kết hợp với Frontend ReactJS.

### Buổi 5: Validation & Identity (Bảo mật)

**Mục tiêu:**
Buổi học giúp người học hiểu cách kiểm tra tính hợp lệ của dữ liệu đầu vào và xây dựng cơ chế xác thực, phân quyền người dùng trong ứng dụng ASP.NET Core. Đây là bước quan trọng nhằm đảm bảo tính bảo mật, hạn chế dữ liệu không hợp lệ và chỉ cho phép người dùng có quyền thực hiện các chức năng quản trị.

**Nội dung:**
Tìm hiểu về **Data Annotations** để thiết lập các quy tắc kiểm tra dữ liệu như bắt buộc nhập, giới hạn độ dài, định dạng email và các ràng buộc khác trên Model. Đồng thời nghiên cứu **ASP.NET Core Identity**, cơ chế quản lý tài khoản, đăng nhập, đăng xuất, phân quyền (Role) và xác thực người dùng. Ngoài ra, người học còn được giới thiệu cách sử dụng thuộc tính **Authorize** để bảo vệ các Controller và Action khỏi việc truy cập trái phép.

**Thực hành:**
Tiến hành cấu hình ASP.NET Core Identity cho dự án, tạo tài khoản quản trị viên (Admin), xây dựng chức năng đăng nhập và đăng xuất. Bên cạnh đó, áp dụng Data Annotations vào các Model để kiểm tra dữ liệu nhập trên biểu mẫu tạo và chỉnh sửa bài viết, đảm bảo dữ liệu lưu vào cơ sở dữ liệu luôn hợp lệ.

**Kiến thức đạt được:**
Sau buổi học, người học biết cách xây dựng hệ thống xác thực và phân quyền người dùng, áp dụng Validation để kiểm soát dữ liệu đầu vào và bảo vệ các chức năng quản trị của website, góp phần nâng cao tính ổn định và an toàn cho hệ thống.


### Buổi 6: WebAPI RESTful Service (Trọng tâm Chương 4)

**Mục tiêu:**
Buổi học tập trung xây dựng các dịch vụ Web API theo chuẩn RESTful, giúp Backend cung cấp dữ liệu cho Frontend ReactJS thông qua giao thức HTTP. Đây là thành phần quan trọng kết nối giữa giao diện người dùng và cơ sở dữ liệu.

**Nội dung:**
Tìm hiểu kiến trúc **RESTful API**, cách định nghĩa **Route**, sử dụng các phương thức HTTP như **GET**, **POST**, **PUT** và **DELETE** để thực hiện các thao tác với dữ liệu. Đồng thời nghiên cứu cách trao đổi dữ liệu dưới định dạng **JSON**, quy trình nhận yêu cầu từ Client, xử lý nghiệp vụ trên Server và trả kết quả về cho Frontend.

**Thực hành:**
Tiến hành xây dựng các API phục vụ hệ thống quản lý nội dung như API lấy danh sách bài viết, lấy bài viết theo danh mục, xem chi tiết bài viết, thêm mới, cập nhật và xóa dữ liệu. Các API được kiểm thử bằng Postman trước khi tích hợp với giao diện ReactJS nhằm đảm bảo dữ liệu được truyền nhận chính xác.

**Kiến thức đạt được:**
Sau buổi học, người học hiểu được nguyên lý hoạt động của WebAPI RESTful, biết cách thiết kế và xây dựng các API theo chuẩn REST, xử lý dữ liệu JSON và tạo cầu nối giữa Backend ASP.NET Core với Frontend ReactJS để phát triển các ứng dụng web hiện đại.
