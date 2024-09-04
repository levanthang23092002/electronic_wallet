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

### Data Parameters

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

### Data Parameters

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

