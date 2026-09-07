# 📊 User & Product Management Dashboard

A simple and responsive admin panel for managing users and products using **vanilla JavaScript** and **Firebase Realtime Database**. This project provides real-time CRUD operations for users and products.

## ✨ Features

- 📱 **Fully Responsive** – Compatible with mobile, tablet, and desktop
- 👥 **User Management** – View, add, edit, and delete users
- 📦 **Product Management** – View, add, edit, and delete products
- 📄 **Pagination** – Display 4 items per page
- 🔔 **Toast Notifications** – Success/error messages with progress bar
- 🎨 **Dark Theme** – Modern dark design
- ♿ **Accessibility** – ARIA labels and roles for better accessibility
- 📊 **Dashboard Overview** – Display total users and products count on homepage

## 🛠️ Technologies

- **HTML5** – Page structure
- **CSS3** – Styling with CSS Variables, Flexbox, and Grid
- **JavaScript (ES6+)** – Application logic, API communication, and DOM manipulation
- **Firebase Realtime Database** – Data storage and management
- **Font Awesome 6** – Icons

## 📂 Project Structure

```
project/
├── css/
│   ├── normalize.css       # Cross-browser normalization
│   ├── variables.css       # CSS variables (colors, fonts, shadows)
│   ├── fonts.css           # Custom fonts (Vazirmatn)
│   ├── base.css            # Base styles
│   ├── main.css            # Main styles
│   ├── modal.css           # Modal styles
│   ├── mobile.css          # Mobile card styles
│   └── media.css           # Responsive styles
├── js/
│   ├── home.js             # Dashboard logic
│   ├── users.js            # User management logic
│   └── products.js         # Product management logic
├── fonts/
│   └── Vazirmatn-*.woff2   # Project fonts
├── home.html               # Dashboard page
├── users.html              # User management page
└── products.html           # Product management page
```

## 🚀 Installation & Setup

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, Safari)
- Internet connection for Firebase communication

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

2. **Run the project**
   - Open `home.html` in your browser
   - Or use **Live Server** in VS Code

3. **Configure Firebase (Optional)**
   - To use your own database, update the API URLs in JS files:
   ```javascript
   // In home.js, users.js, products.js
   const API_URL = "https://your-project.firebaseio.com/";
   ```

## ▶️ Usage Guide

### Homepage (Dashboard)
- Display total users and products count
- Show last 4 users and products in table and card views

### User Management (`users.html`)
- **View** user list in table (desktop) and cards (mobile)
- **Add** user by clicking "ایجاد کاربر" (Create User) button
- **Edit** user by clicking the edit (✏️) button
- **Delete** user by clicking the trash (🗑️) button
- **Pagination** – 4 users per page

### Product Management (`products.html`)
- **View** product list with price and short name
- **Add** product by clicking "ایجاد محصول" (Create Product) button
- **Edit** product by clicking the edit (✏️) button
- **Delete** product by clicking the trash (🗑️) button
- **Pagination** – 4 products per page

## 🔧 Customization

### Change Items Per Page
In `users.js` and `products.js`, modify the variables:
```javascript
let userPerPage = 6; // Show 6 users per page
```

### Change Theme Colors
In `variables.css`, customize the CSS variables:
```css
:root {
  --color-bg-body: #0f172a;   /* Background color */
  --button-info: #3b82f6;     /* Button color */
  /* ... */
}
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## 🤝 Contributing

1. **Fork** the repository
2. Create a **feature branch**:
   ```bash
   git checkout -b feature/feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. **Push** your branch:
   ```bash
   git push origin feature/feature-name
   ```
5. Open a **Pull Request**

## 📄 License

This project is licensed under the **MIT License**.


---

**Note:** This project uses Firebase Realtime Database as the backend. For offline testing, you can use `json-server` or local data.
**⚠️ Important:** If you are located in Iran, please use a VPN or proxy to ensure proper connectivity to Firebase services.
