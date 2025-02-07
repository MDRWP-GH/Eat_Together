## Eat Together หาเพื่อนกินข้าว - คู่มือการติดตั้งและใช้งาน

## 1. การเตรียมฐานข้อมูลก่อนการสร้างโปรเจกต์

โปรเจกต์นี้ต้องใช้ฐานข้อมูล MySQL หรือ PostgreSQL ในการจัดเก็บข้อมูลร้านอาหารและผู้ใช้ ก่อนเริ่มต้นให้เตรียมฐานข้อมูลดังนี้:

1.1 ติดตั้งฐานข้อมูล

MySQL (แนะนำ): ดาวน์โหลดและติดตั้งจาก MySQL Official, PostgreSQL (ทางเลือก): ดาวน์โหลดและติดตั้งจาก PostgreSQL Official

1.2 สร้างฐานข้อมูล

หลังจากติดตั้ง MySQL แล้ว ให้เปิด MySQL CLI หรือ MySQL Workbench แล้วรันคำสั่ง:

```bash
CREATE DATABASE eat_together;
```

จากนั้นสร้างผู้ใช้และให้สิทธิ์การเข้าถึง:

```bash
CREATE USER 'eattogether'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON eat_together.* TO 'eattogether'@'localhost';
FLUSH PRIVILEGES;
```

## 2. การตั้งค่าฐานข้อมูล

หลังจากสร้างฐานข้อมูลแล้ว ต้องกำหนดค่าในไฟล์ `` ในโฟลเดอร์ Server/

2.1 สร้างไฟล์

เปิดโฟลเดอร์ Server/ และสร้างไฟล์ .env พร้อมเพิ่มค่าต่อไปนี้:

```bash
DB_HOST=localhost
DB_USER=eattogether
DB_PASSWORD=password
DB_NAME=eat_together
DB_DIALECT=mysql   # ใช้ 'postgres' หากใช้ PostgreSQL
PORT=5000
```

2.2 ติดตั้ง Sequelize CLI

Sequelize เป็น ORM ที่ใช้จัดการฐานข้อมูล:

```bash
npm install -g sequelize-cli
```

2.3 ตั้งค่าการเชื่อมต่อ Sequelize

ตรวจสอบว่าไฟล์ Server/config/config.js มีค่าถูกต้อง:

```bash
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
```

2.4 รัน Migration เพื่อสร้างตาราง

หลังจากตั้งค่าถูกต้องแล้ว ให้สร้างตารางในฐานข้อมูลโดยรัน:

```bash
npx sequelize db:migrate
```

## 3. คำสั่ง Build และ Run Project

3.1 ติดตั้ง Dependencies

ก่อนเริ่มต้นให้ติดตั้ง dependencies ทั้งใน Backend และ Frontend:

```bash
cd Backend && npm install
cd ../Frontend && npm install
```

3.2 Run Backend (Express.js)

```bash
cd Server
node server.js
```

หรือหากใช้ nodemon:

```bash
npx nodemon server.js
```

3.3 Run Frontend (HTML+JS)

```bash
npx live-server
```

## ผู้จัดทำ

- นายภูริภัทร วงศ์ไชย 66021971
- นายธรรมาวุธ วุฑฒะกุล 66025896