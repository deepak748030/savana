# 🚀 Savana Ecommerce Backend

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes" />
</div>

<div align="center">
  <h3>🛒 Full Production-Ready Backend with Kubernetes Support and Swagger</h3>
  <p><strong>Live Swagger API:</strong> <a href="http://your-domain.com/api-docs">http://your-domain.com/api-docs</a></p>
</div>

---

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Kubernetes Setup](#%EF%B8%8F-kubernetes-setup)
- [📁 Project Structure](#-project-structure)
- [🌐 Deployment](#-deployment)
- [🧪 API Testing](#-api-testing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🌟 Features

- ⚙️ Modular Express Backend (routes, controllers, services)
- 🧩 Category & Product CRUD APIs
- 📤 Image Upload via Multer
- 🔍 Product Search and Filter by Category
- 🌍 MongoDB Integration (external URI)
- 📚 Swagger API Docs (`/api-docs`)
- 📦 Prometheus Metrics Ready (for Grafana)
- 🧱 Dockerized with Node 22 Alpine
- ☸️ Kubernetes with Ingress & NGINX
- 📂 Public static file support via `/uploads`
---

## 🛠️ Technology Stack

- **Node.js & Express.js** – Backend framework
- **MongoDB** – No internal DB pod, external URI-based
- **Multer** – File handling
- **Swagger** – Auto API documentation
- **Docker** – Containerization
- **Kubernetes** – Orchestration & scaling
- **NGINX + Ingress** – Domain + SSL route config

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js >= 16
- Docker & Kubernetes (Minikube or cluster)
- MongoDB Atlas URI

### 🔧 Setup Locally

```bash
git clone https://github.com/deepak748030/savana.git
cd savana

npm install
cp .env.exports.js .env     # Rename and fill your Mongo URI

npm run dev
````

Visit Swagger: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## ⚙️ Kubernetes Setup

### ✅ Files

* `k8s/deployment.yaml`
* `k8s/service.yaml`
* `k8s/ingress.yaml`
* `k8s/nginx-ingress.yaml`

### 🧠 Commands

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/nginx-ingress.yaml
kubectl apply -f k8s/ingress.yaml
```

> Ensure `Ingress` is enabled in Minikube:

```bash
minikube addons enable ingress
```

---

## 📁 Project Structure

```
.
├── src/
│   ├── config/             # DB and env setup
│   ├── controllers/        # Logic for API endpoints
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Image uploads
│   ├── utils/              # Helpers
│   ├── swagger/            # Swagger config
│   └── app.js              # Express app config
├── server.js               # Server entry point
├── k8s/                    # Kubernetes manifests
├── Dockerfile              # Docker container config
├── .env.exports.js         # Sample env file
├── package.json
└── README.md
```

---

## 🌐 Deployment

### 🐳 Docker Build & Push

```bash
docker build -t yourdockerhub/savana-backend .
docker push yourdockerhub/savana-backend
```

### ☸️ Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

Access via: `http://<your-minikube-ip>/api-docs` after setting ingress.

---

## 🧪 API Testing

* **Docs:** `GET /api-docs`
* **File Uploads:** `POST /api/upload`
* **Protected Routes:** Use `Authorization: Bearer <token>`
* **Metrics (for Prometheus):** `GET /metrics`

---

## 📄 License

MIT License

```
© 2025 Deepak Kushwah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**Deepak Kushwah**
Full Stack Developer (MERN + DevOps)

* 📧 [deepak748930@gmail.com](mailto:deepak748930@gmail.com)
* 🔗 [LinkedIn](https://linkedin.com/in/deepak-kushwah)
* 💻 [GitHub](https://github.com/deepak748030)

> ⭐ Star this repo if you found it useful!
> 🔗 [https://github.com/deepak748030/savana](https://github.com/deepak748030/savana)
