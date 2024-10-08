# electronic_wallet_NodeJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

```

# API Documentation

## API Documentation: User Login

### Endpoint

- **URL:** `/api/swgauth/login`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "email": "<email>",
  "passWord": "<password>"
}
```

- `email`: The email address of the user trying to log in.

- `passWord`: The password of the user.

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Đăng nhập Thành Công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImxldmFudGhhbmdAZ21haWwuY29tIiwicGFzc3dvcmQiOiJ0aGFuZ2xlMTIzIiwiZ29vZ2xlX2lkIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0wOC0wN1QwODoyNzoxMS44MDlaIn0sImlhdCI6MTcyNDk5MTA0NCwiZXhwIjoxNzI0OTk0NjQ0fQ.yMbT84ZQWowKMoBFxvDhvumBANeBSIDZxBQTxyIxxAQ",
    "user": {
      "id": 1,
      "email": "levanthang@gmail.com",
      "password": "thangle123",
      "google_id": null,
      "created_at": "2024-08-07T08:27:11.809Z"
    }
  },
  "error_code": null
}
```

- `accesstoken`: JWT or other token used for authenticated requests.

- `payload`: Contains user information:

- `id`: Unique identifier of the user.

- `password`: pass word of the user

- `email`: Email address of the user.

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "success": true,
  "message": "Đăng nhập thất bại ",
  "data": {},
  "error_code": null
}
```

### Sample Call

#### With email PassWord

- **Request Body:**

```json
{
  "email": "levanthang@gmail.com",
  "password": "thangle123"
}
```

### Notes

- **Authentication:**
- Ensure that the provided authentication information is correct and matches an existing user in the system.
- The `Authorization` header must include the appropriate authentication information, but is generally not required for this endpoint unless used for special purposes.

- **Security:**
- Implement rate limiting and other security measures to protect against brute force attacks.

- **Error Handling:**
- Return `404 Not Found` if email is not registered or password is incorrect.

- Consider using more specific HTTP status codes (e.g. `401 Unauthorized`) for authentication errors for clearer API responses.

- **Token Handling:**
- The provided access token must be used for subsequent requests to protected endpoints.

- Ensure proper handling and storage of tokens to maintain security and user sessions.

## API Documentation: User Register

### Endpoint

- **URL:** `/api/swgauth/register`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "email": "<email>",
  "passWord": "<password>"
}
```

- `email`: The email address of the user trying to log in.

- `passWord`: The password of the user.

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Đăng kí Thành Công",
  "data": [
    {
      "id": 4,
      "email": "levanthang23@gmail.com",
      "password": "thangle123",
      "created_at": "2024-08-30T06:50:11.729Z"
    }
  ],
  "error_code": null
}
```

- `password`: pass word of the user, more than 6 characters

- `email`: Email address of the user, email not registered before.

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "success": false,
  "message": "Lỗi Hệ Thống",
  "data": {},
  "error_code": {
    "length": 223,
    "name": "error",
    "severity": "ERROR",
    "code": "23505",
    "detail": "Key (email)=(levanthang23@gmail.com) already exists.",
    "schema": "public",
    "table": "accounts",
    "constraint": "accounts_email_key",
    "file": "nbtinsert.c",
    "line": "673",
    "routine": "_bt_check_unique"
  }
}
```

### Sample Call

#### With email PassWord

- **Request Body:**

```json
{
  "email": "levanthang123@gmail.com",
  "password": "thangle123"
}
```

### Notes

## API Documentation: User Login With Google

### Endpoint

- **URL:** `/api/auth/google`
- **Method:** `Get`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Parameters

- **Content:**

```bash
  # Login with google
  $ Select the google account you want to register and log in to the system.
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "profile": {
    "id": 3,
    "email": "levanthang230902@gmail.com",
    "password": null,
    "google_id": "106757470521801254442",
    "created_at": "2024-08-09T04:05:44.503Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6ImxldmFudGhhbmcyMzA5MDJAZ21haWwuY29tIiwicGFzc3dvcmQiOm51bGwsImdvb2dsZV9pZCI6IjEwNjc1NzQ3MDUyMTgwMTI1NDQ0MiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTA5VDA0OjA1OjQ0LjUwM1oifSwiaWF0IjoxNzI1NDE5MjI1LCJleHAiOjE3MjU0MjI4MjV9.1x18832JBFp1EU5iejG7SKnB5OEWhHsDdcQT20NIRc8"
}
```

### Error Response

- **Code:** 404 Not Found

## API Documentation: Upload CCCD

### Endpoint

- **URL:** `/api/swgupload/upload-cccd`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Parameters

- **Content:**

```bash
  $ Select 2 photos of the front and back of your ID card
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": {
    "id": 7,
    "user_id": 1,
    "front_image_filename": "images-1725435292938-792029475.jpg",
    "back_image_filename": "images-1725435292946-124279341.jpg",
    "front_image_path": "public\\img\\images-1725435292938-792029475.jpg",
    "back_image_path": "public\\img\\images-1725435292946-124279341.jpg",
    "type": "image/jpeg",
    "created_at": "2024-09-04T07:34:53.009Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
  "data": [],
  "error": null
}
```

## API Documentation: Update CCCD

### Endpoint

- **URL:** `/api/swgupload/update-cccd`
- **Method:** `PUT`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Parameters

- **Content:**

```bash
  $ Select 2 photos of the front and back of your ID card
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": {
    "id": 7,
    "user_id": 1,
    "front_image_filename": "images-1725435528780-783609575.jpg",
    "back_image_filename": "images-1725435528782-429952858.jpg",
    "front_image_path": "public\\img\\images-1725435528780-783609575.jpg",
    "back_image_path": "public\\img\\images-1725435528782-429952858.jpg",
    "type": "image/jpeg",
    "created_at": "2024-09-04T07:34:53.009Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
  "data": [],
  "error": null
}
```

## API Documentation: View CCCD

### Endpoint

- **URL:** `/api/swgupload/view-cccd`
- **Method:** `Get`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`


### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": {
    "user_id": 1,
    "front_image_url": "http://localhost:4000/public/img/images-1725435528780-783609575.jpg",
    "back_image_url": "http://localhost:4000/public/img/images-1725435528782-429952858.jpg",
    "type": "image/jpeg",
    "created_at": "2024-09-04T07:34:53.009Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Không Tồn Tại Hình Ảnh CCCD",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang123@gmail.com",
  "password": "thangle123"
}
```

## API Documentation: add info

### Endpoint

- **URL:** `/api/swguser/addinfo`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "name": "Thăng",
  "gender": "Male",
  "phone": "0966948914",
  "address": "Việt Nam",
  "born": "08/05/1993"
}
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Đã Thêm Thông tin thành công",
  "data": {
    "name": "Thăng",
    "gender": "Male",
    "phone": "0966948914",
    "address": "Việt Nam",
    "born": "1993-05-07T17:00:00.000Z"
  }
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Lỗi Hệ Thống",
  "error": "user đã tồn tại"
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ The account is not yet known.
  $ Gender has 3 options: Male, Female or Other.
  $ Phone has 10 or 11 digits and starts with 0.
  $ User must be over 18 years old.
```

## API Documentation: update info

### Endpoint

- **URL:** `/api/swguser/updateinfo`
- **Method:** `PUT`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "name": "Lê Văn Thắng",
  "gender": "Male",
  "phone": "0966948914",
  "address": "Việt Nam",
  "born": "08/05/2001"
}
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Đã update dữ liệu thành công",
  "data": {
    "name": "Lê Văn Thắng",
    "gender": "Male",
    "phone": "0966948914",
    "address": "Việt Nam",
    "born": "2001-05-07T17:00:00.000Z"
  }
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Lỗi Hệ Thống",
  "error": {
    "length": 98,
    "name": "error",
    "severity": "ERROR",
    "code": "22001",
    "file": "varchar.c",
    "line": "641",
    "routine": "varchar"
  }
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ The account is not yet known.
  $ Gender has 3 options: Male, Female or Other.
  $ Phone has 10 or 11 digits and starts with 0.
  $ User must be over 18 years old.
```

## API Documentation: View info

### Endpoint

- **URL:** `/api/swguser/info`
- **Method:** `GET`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thông tin ",
  "data": {
    "name": "Lê Văn Thắng",
    "gender": "Male",
    "phone": "0966948914",
    "address": "Việt Nam",
    "born": "2001-05-07T17:00:00.000Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "bạn chưa thêm Thông tin ",
  "data": null,
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ that account has been informed and logged in
```

## API Documentation: View wallet

### Endpoint

- **URL:** `/api/swgwallet/view`
- **Method:** `GET`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`


### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành công",
  "data": {
    "accountname": "Thăng",
    "accountnumber": "123456789104",
    "balance": "$0.00",
    "created_at": "2024-09-04T08:50:05.202Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ Sign up for an account and add your information to create your own wallet.
```

## API Documentation: Recharge into wallet

### Endpoint

- **URL:** `/api/swgwallet/recharge`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "amount": 100000,
  "description": "Nộp tiện"
}
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành công",
  "data": {
    "id": 30,
    "user_id": 6,
    "type": "deposit",
    "amount": "$100,000.00",
    "from_wallet_id": null,
    "to_wallet_id": "123456789105",
    "description": "Nộp tiện ăn",
    "created_at": "2024-09-04T09:19:31.129Z"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ Sign up for an account and add your information to create your own wallet.
```


## API Documentation: Trasaction

### Endpoint

- **URL:** `/api/swgwallet/trasaction`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Body

- **Content:**

```json
{
  "soTaiKhoan": "123456789102",
  "transfer": 5000,
  "description": "Chuyển Tiền xe"
}
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": {
    "từ tài khoản": "123456789105",
    "người gửi ": "Thăng",
    "đến tài khoản": "123456789102",
    "số tiền": 5000,
    "nội dung": "Chuyển Tiền xe"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
  "data": [],
  "error": null
}
```

- **Code:** 403 Forbidden
- **Message:**

```json
{
  "message": "Số Dư Không Đủ",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```

### note

```bash
  $ Sign up for an account and add your information to create your own wallet.
  $ The transfer amount must be less than the current amount in the account.
```


## API Documentation:view transaction history

### Endpoint

- **URL:** `/api/swgwallet/transaction-history`
- **Method:** `GET`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`


### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": [
    {
      "date": "04-09-2024",
      "type": "deposit",
      "mount": "+100,000 VND",
      "description": "Nộp tiện ăn"
    },
    {
      "date": "04-09-2024",
      "type": "transfer",
      "mount": "-5,000 VND",
      "description": "Chuyển Tiền xe"
    },
    {
      "date": "04-09-2024",
      "type": "deposit",
      "mount": "+100,000 VND",
      "description": "Nộp tiện ăn"
    }
  ],
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```



## API Documentation:view transaction history detail

### Endpoint

- **URL:** `/api/swgwallet/transaction-history-detail/{idtransaction}`
- **Method:** `GET`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Parameters

- **Content:**

```bash
  idtransaction = 29
```

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
  "message": "Thành Công",
  "data": {
    "Reference_number": 29,
    "Source_account": "123456789105 Thăng",
    "Amount": "-5,000 VND",
    "Beneficiary_account": "123456789102 Lê Văn Thắng 3",
    "Description": "Chuyển Tiền xe",
    "Date": "04-09-2024"
  },
  "error": null
}
```

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "message": "Không có mã giao dịch này",
  "data": [],
  "error": null
}
```

#### With Acount user

- **Request Body:**

```json
{
  "email": "levanthang23@gmail.com",
  "password": "thangle123"
}
```
