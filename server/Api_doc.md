Dokumentasi API

1. Register User
   Endpoint: /register
   Method: POST
   Deskripsi: Mendaftarkan pengguna baru.

Request Body:

````json

{
  "userName": "string",
  "email": "string",
  "password": "string"
}
Response:

Status 201 Created

```json

{
  "message": "success register"
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
2. Login User
Endpoint: /login
Method: POST
Deskripsi: Masuk sebagai pengguna dengan nama pengguna, email, dan kata sandi.

Request Body:

```json

{
  "userName": "string",
  "email": "string",
  "password": "string"
}
Response:

Status 200 OK
```json

{
  "message": "Success login",
  "access_token": "string"
}
Status 400 Bad Request
```json

{
  "message": "Invalid login credentials"
}
Status 404 Not Found
```json

{
  "message": "Login error"
}
3. Read Data Dogs
Endpoint: /dogs
Method: GET
Deskripsi: Mengambil daftar semua anjing.

Response:

Status 200 OK
```json

{
  "message": "success read data dogs",
  "dataDogs": [
    {

  "id": "integer",
      "name": "string",
      "breed": "string",
      "averangeAge": "string",
      "averangeWeight": "string",
      "description": "string",
      "Image": "string",
      "userId": "integer"
    }
  ]
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
4. Create Data Dog
Endpoint: /dogs
Method: POST
Deskripsi: Menambahkan data anjing baru.

Request Body:

```json

{
  "name": "string",
  "breed": "string",
  "averangeAge": "string",
  "
averangeWeight": "string",
  "description": "string",
  "Image": "string"
}
Response:

Status 201 Created
```json

{
  "message": "data dog created successfully",
  "data": {
    "id": "integer",

  "name": "string",
    "breed": "string",
    "averangeAge": "string",
    "averangeWeight": "string",
    "description": "string",
    "Image": "string",
    "userId": "integer"
  }
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
5. Edit Data Dog
Endpoint: /dogs/:id
Method: PUT
Deskripsi: Mengedit data anjing berdasarkan ID.

Request Body:

```json

{
  "name": "string"
}
Response:

Status 200 OK
```json

{
  "message": "successfully update data Dog",
  "data": {
    "id": "integer",

  "name": "string"
  }
}
Status 404 Not Found
```json

{
  "message": "Dog not found"
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
6. Delete Data Dog
Endpoint: /dogs/:id
Method: DELETE
Deskripsi: Menghapus data anjing berdasarkan ID.

Response:

Status 200 OK
```json

{
  "message": "delete success"
}
Status 404 Not Found
```json

{
  "message": "Dog not found"
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
7. Upload Image
Endpoint: /upload
Method: POST
Deskripsi: Mengupload gambar anjing dan mendapatkan deskripsi dari AI.

Request:

Form-data:
img: (File gambar)
Response:

Status 200 OK
```json

{
  "message": "Success upload",
  "imageUrl": "string",
  "aiResponse": {

  "name": "string",
    "breed": "string",
    "averangeAge": "string",
    "averangeWeight": "string",
    "description": "string"
  }
}
Status 400 Bad Request
```json

{
  "message": "No file uploaded"
}
Status 500 Internal Server Error
```json

{
  "message": "Internal server error"
}
````
