# 📝 InkVerse – Blogging Platform with Handlebars

**InkVerse** is a full-featured blog website built with **Express**, **MongoDB**, and **Handlebars**, offering user-friendly blog publishing, secure authentication, and a rich writing experience with **Froala Editor**.

> Tailwind CSS is used for styling and Froala WYSIWYG editor is integrated for creating and editing blog content.

---

## ✨ Features

* 🔐 **User Authentication**

  * Register/Login with JWT and cookies
  * Secure password hashing with Bcrypt
  * Session management with Cookie-parser

* ✉️ **Password Recovery**

  * Forgot password feature via Nodemailer (yet to be added)

* 📝 **Blog Management**

  * Rich text blog editor using Froala
  * Create, edit, delete personal blogs
  * Public view of published blogs

* 🖋️ **Templating**

  * Dynamic pages using Express Handlebars (`express-handlebars` & `hbs`)

* 💡 **Styling**

  * Fully responsive and styled with **Tailwind CSS v4**

---

## 🧩 Tech Stack

### Core

* `express`, `mongoose`, `dotenv`, `cors`

### Authentication & Security

* `bcrypt` – Hashing passwords
* `jsonwebtoken` – JWT-based auth
* `cookie-parser` – Session cookies

### Templating & Styling

* `express-handlebars`, `hbs`
* `tailwindcss` – Utility-first CSS

### Blogging Tools

* **Froala Editor** – Rich WYSIWYG content creation

### Utilities

* `body-parser`, `nodemon`, `nodemailer`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/inkverse.git
cd inkverse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4. Run the Server

```bash
node index.js
```

### 5. Run Tailwind CSS Watcher

To compile Tailwind CSS using the CLI in watch mode:

```bash
npx @tailwindcss/cli -i ./static/css/input.css -o ./static/css/output.css --watch
```

---

## 👀 Folder Structure

```plaintext
inkverse/
├── config/               # Database and environment config
├── controllers/          # Route logic and handlers
├── middleware/           # Authentication and validation middleware
├── models/               # Mongoose schemas (User, Blog, etc.)
├── static/css/           # Tailwind CSS input/output files
├── utils/                # Utility functions (email, JWT, etc.)
├── views/                # Handlebars templates
│   ├── layout/           # Main layout templates
│   ├── pages/            # Individual page views
│   └── partials/         # Header, footer, and reusable components
├── .gitignore
├── index.js              # Main Express entry point
├── package.json
├── package-lock.json
├── tailwind.config.js
└── readme.md
```

---

## 🌐 Blog Editor (Froala)

Froala WYSIWYG Editor is used to enhance the blogging experience with rich formatting options, image uploads, links, code blocks, and more.

> Froala supports drag-and-drop editing and beautiful mobile-friendly output.

---

## 📧 Contact

Developed with passion by **Yamin Haqani**.
GitHub: [@Yaminhaqani](https://github.com/Yaminhaqani)
Email: [yaminhaqani@gmail.com](mailto:yaminhaqani@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
