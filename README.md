cat > README.md << 'EOF'
# 📊 Sales Analytics Dashboard

A modern, real-time sales analytics dashboard built with **Frappe Framework** as the backend and **React 18** as the frontend. Features live charts, CRUD operations, glassmorphism UI, and auto-refresh capabilities.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)
![Frappe](https://img.shields.io/badge/Frappe-15-0089FF)

---

## ✨ Features

- 🎯 Custom Frappe DocType — `Sales Analytics` with 7 fields
- 📡 REST API — 8 whitelisted endpoints
- 📊 4 Chart Types — Bar, Pie, Area, Region Bar
- ⚡ Real-time Updates — Auto-refresh every 30 seconds
- 🎨 Modern UI — Glassmorphism, gradients, animations
- 🔍 Dynamic Filters — Category / Region / Product / Customer
- 📝 Add / Delete — Modal form with validation
- 📱 Fully Responsive

---

## 🏗️ Tech Stack

### Backend
- Frappe Framework
- MariaDB
- Python 3.10+

### Frontend
- React 18
- Vite 6
- TanStack Query v5
- Recharts
- Tailwind CSS v4
- Lucide React icons

---

## 🚀 Quick Start

### Backend Setup

\`\`\`bash
# Install Frappe app
cd ~/frappe-bench
bench get-app https://github.com/veerapandian2004/Sales-Analytics.git
bench --site your-site.local install-app sales
bench restart
\`\`\`

### Frontend Setup

\`\`\`bash
cd sales-frontend
npm install
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

All prefixed with \`/api/method/sales.api.\`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`get_sales_summary\` | Aggregated by dimension |
| GET | \`get_sales_trend\` | Time-series data |
| GET | \`get_kpi_stats\` | KPI numbers |
| GET | \`get_category_breakdown\` | By category |
| GET | \`get_region_breakdown\` | By region |
| GET | \`get_recent_sales\` | Latest N entries |
| POST | \`create_sales_entry\` | Add new sale |
| POST | \`delete_sales_entry\` | Delete by name |

---

## 📂 DocType Fields

| Field | Type | Required |
|-------|------|----------|
| sales_date | Date | ✅ |
| product | Data | ✅ |
| category | Select | ✅ |
| region | Select | ❌ |
| quantity | Int | ❌ |
| amount | Currency | ✅ |
| customer | Data | ❌ |

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**veerapandian2004**

- GitHub: [@veerapandian2004](https://github.com/veerapandian2004)

---

⭐ Star this repo if you find it helpful!
EOF