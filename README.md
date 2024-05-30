<br />
<div align="center">
  <h3 align="center">OpenXSS Manager</h3>
  <p align="center">
    Một dự án nhận diện học sinh đi học, và quản lý học sinh.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Feature</a>
  </p>
</div>

## #Dự án


Dự án vẫn đang trong quá trình phát triển, chúng tôi sẽ luôn cập nhật tình hình trong thời gian tới.

### #Xây dựng

Dự án trong quá trình phát triển, nên các công cụ có thể thay đổi, chúng tôi sẽ luôn cập nhật.

-   React và các thư viện hỗ trợ - Client.
- Koajs và các thư viện hỗ trợ - Server.

## #Bắt đầu

<h4>Đây là một dự án đang còn phát triển nên sẽ còn một số lỗi. Có thể thông báo cho tôi qua ISSUE của github.</h4>

### Yêu cầu

-   Đảm bảo rằng bạn đã cài đặt NodeJS. Nếu chưa bạn có thể tải nó <a href="https://nodejs.org/en">ở đây</a>.
-   Sau khi cài xong bạn có thể coi nó có trong máy chưa bằng câu lệnh `node -v`. Nếu không có bất kì lỗi nào thì thì kiểm tra xem đảm bảo máy bạn đã có npm HÃY DÙNG `npm -v`.

### Cài đặt

_Để cài đặt và sử dụng dự án vui lòng làm theo các bước bên dưới._

1. Truy cập vào
2. Tải dự án về với câu lệnh git.
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
3. Tải các thư viện cần thiết.
    ```sh
    npm install
    ```
    hoặc
    ```sh
     yarn
    ```
4. Tạo một file với tên `.env` sau đó điền các giá trị như sau
    ```
    JWT_SECRET =
    PORT =
    clientId =
    clientSECRET =
    uri_callback_discord =
    mongoose_url =
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## #Sử dụng

* Try cập vào http://localhost:3000 và tận hưởng.
* Lưu ý cổng 3000 có thể là giá trị là bạn vào ở tệp `.env` ở trên.

## Roadmap

-   [x] Đăng nhập với Discord
-   [x] Lưu trữ thông tin lên mongoDB
-   [ ] Đăng nhập với QR Code (nó đang được phát triển).