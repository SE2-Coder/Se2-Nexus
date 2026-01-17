# Se2-Nexus Ecosystem

> **The Central Nervous System for the Se2Code Microservices Suite.**

**Se2-Nexus** is a scalable, modular ecosystem designed to power next-generation applications with privacy, security, and user experience at the forefront. Built on a Dockerized microservices architecture, it serves as the foundation for a suite of interconnected tools starting with **Se2-Auth**.

## 🏗 Architecture

The ecosystem is divided into discrete, containerized services managed via **Dokploy**:

### 🧠 `se2-brain` (Backend Core)
The single source of truth for identity and data persistence.
-   **Tech**: Payload CMS 3.0 (Next.js Native), MongoDB.
-   **Role**: Handles Users, Encrypted Data Blobs (Zero-Knowledge Architecture), and System Notifications.
-   **Security**: Stores 2FA secrets as encrypted strings; keys remain client-side.

### 🔐 `se2-auth` (Frontend Application)
*In Development* - A cross-platform 2FA Authenticator.
-   **Tech**: Next.js 14, TailwindCSS, CapacitorJS.
-   **Features**:
    -   Smart Folders (Organize tokens by Client, Personal, Finance).
    -   Offline-First PWA.
    -   Biometric Unlock.

## 🚀 Deployment

This project is tailored for deployment on **Ubuntu VPS** using **Dokploy**.

```bash
# Structure
.
├── se2-brain/        # Backend Service
└── se2-auth/         # Frontend Service (Coming Soon)
```

## 🛡 Privacy Pivot
Unlike SaaS alternatives (Firebase, Auth0), **Se2-Nexus** guarantees 100% data ownership. No third-party tracking, no data mining.

---
*Built with ❤️ by Se2Code Team.*
