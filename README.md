# 🛒 Ecommerce React UI

This is a modular ecommerce frontend project built with **React + Vite**. It uses a component-based architecture and connects to a REST API to display products, manage cart, user login, and admin features.

---

## 🚀 Tech Stack

* React (with Vite)
* React Router DOM
* REST API: [Fake Store API](https://github.com/keikaavousi/fake-store-api)
* Git & GitHub for version control

---

## 📁 Folder Structure

```
src/
🔼📀 assets/                # Images, logos, etc.
🔼📀 components/            # Reusable components like Button, Navbar
🔼📀 pages/
🔼🔼📀 Auth/              # Login, Register, Profile
🔼🔼📀 Home/              # Home Page, Header, Footer
🔼🔼📀 Products/          # Product Grid, Filters, Search
🔼🔼📀 Cart/              # Cart, Checkout, Order Summary
🔼🔼📀 Admin/             # Admin Dashboard, Manage Users/Products
🔼 App.jsx                # Main app with routes
🔼 main.jsx               # ReactDOM entry point
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/ecommerce-react-ui.git
cd ecommerce-react-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

---

## 👥 Team Collaboration Guidelines

### ➔ Branch Naming Convention

| Feature                        | Branch Name               |
| ------------------------------ | ------------------------- |
| Login, Register, Profile       | `feature/auth`            |
| Home Page, Navigation, Footer  | `feature/home-ui`         |
| Products Grid, Filters, Search | `feature/products-ui`     |
| Cart, Checkout, Order Summary  | `feature/cart-ui`         |
| Admin Dashboard, Management    | `feature/admin-dashboard` |

---

## 🔀 Git Workflow

> Every member works on a separate feature branch and pushes to GitHub.

### ✅ Step-by-Step

1. **Create a new branch** for your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Stage & commit your changes**:

   ```bash
   git add .
   git commit -m "Meaningful commit message"
   ```

3. **Push to GitHub**:

   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **After testing, merge your branch into `main`**:

   ```bash
   git checkout main
   git pull origin main
   git merge feature/your-feature-name
   git push origin main
   ```

---

## ✅ Useful Git Commands

| Task                     | Command                                |
| ------------------------ | -------------------------------------- |
| List all branches        | `git branch -a`                        |
| Switch branch            | `git checkout branch-name`             |
| Pull latest main changes | `git checkout main && git pull`        |
| Delete local branch      | `git branch -d branch-name`            |
| Delete remote branch     | `git push origin --delete branch-name` |

---

## 🤝 Contributing

* Each contributor should work on **separate branches**
* Avoid working directly on `main`
* Follow the structure and naming conventions
* Use `pull requests` for collaboration (optional but recommended)

---

## 🔗 API Reference

This project uses the [Fake Store API](https://github.com/keikaavousi/fake-store-api) for all product and user data simulation.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
