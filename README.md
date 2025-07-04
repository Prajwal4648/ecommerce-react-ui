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
📂 assets/                # Images, logos, etc.
📂 components/            # Reusable components like Button, Navbar
📂 pages/
📂📂 Auth/              # Login, Register, Profile
📂📂 Home/              # Home Page, Header, Footer
📂📂 Products/          # Product Grid, Filters, Search
📂📂 Cart/              # Cart, Checkout, Order Summary
📂📂 Admin/             # Admin Dashboard, Manage Users/Products
📄 App.jsx                # Main app with routes
📄 main.jsx               # ReactDOM entry point
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

### → Branch Naming Convention

| Feature                        | Branch Name               |
| ------------------------------ | ------------------------- |
| Login, Register, Profile       | `feature/auth`            |
| Home Page, Navigation, Footer  | `feature/home-ui`         |
| Products Grid, Filters, Search | `feature/products-ui`     |
| Cart, Checkout, Order Summary  | `feature/cart-ui`         |
| Admin Dashboard, Management    | `feature/admin-dashboard` |

---

## 🔁 Git Workflow

> All changes must go through a pull request. Direct pushes to `main` are **not allowed**.

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

4. **Create a Pull Request (PR)**:

   * Go to GitHub
   * Click on "Compare & pull request"
   * Add a title and description
   * Assign a reviewer (any team member)

5. **Get your PR reviewed and approved**

   * 1 approval is required (can be from any team member)
   * All code review comments must be resolved

6. **Squash merge** your PR to `main`

---

## 🛡️ Main Branch Protection Rules (Enforced)

* Pull Requests are required to merge into `main`
* Direct pushes to `main` are blocked
* At least **1 approval** is required
* All review conversations must be resolved
* Squash merge only

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

* Each contributor works on a **feature branch**
* Open a Pull Request for review
* Get 1 approval and resolve all comments before merging
* Follow folder and component structure guidelines

### 🔍 Pull Request Review Checklist:

* [ ] Is the code working without errors?
* [ ] Is the file/folder naming consistent?
* [ ] Are components reusable if needed?
* [ ] Are there any unnecessary console logs?
* [ ] Is the code easy to understand?

> ✅ Note: Any teammate can review a PR. Please review each other’s code before merging.

---

## 🔗 API Reference

This project uses the [Fake Store API](https://github.com/keikaavousi/fake-store-api) for all product and user data simulation.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
