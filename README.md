# 💹 Crypto Insight

**Crypto Insight** is a modern cryptocurrency analytics web app built with React 19, Vite, TailwindCSS, and Material UI — powered by the **CoinGecko API**.  
It lets users explore live crypto market data, track individual coins in real time, view detailed analytics through interactive charts, and switch between ascending/descending order with smooth navigation.

---

## 🚀 Live Demo

🔗 **Deployed on Vercel:** [https://crypto-insight.vercel.app](https://crypto-insight.vercel.app)

---

## ⚙️ Tech Stack

| Category              | Technologies                                               |
| --------------------- | ---------------------------------------------------------- |
| **Frontend**          | React 19, Vite (Rolldown), TailwindCSS 4, MUI 7            |
| **Charts & Data**     | Chart.js 4, react-chartjs-2, date-fns                      |
| **Routing**           | React Router 7                                             |
| **State & Utilities** | React Hooks, Lucide Icons, Loader Spinner                  |
| **API**               | CoinGecko Public API (coins, search, and detail endpoints) |
| **Package Manager**   | pnpm                                                       |

---

## 🧩 Features

- ⚡ **Real-time Market Data** — fetches live crypto data from CoinGecko
- 🔍 **Smart Search System** — dynamically search any crypto coin
- 📊 **Dynamic Line Charts** — built using Chart.js with time-based scales
- 🔄 **Ascending/Descending Sorting** — toggle coin lists by market trends
- 📱 **Fully Responsive Design** — optimized for all devices
- 🧭 **Client-side Routing** — fast navigation via React Router 7
- 💥 **Error & Loading States** — clean handling of API failures and delays

---

## 🔌 API Integration

Crypto Insight integrates with **CoinGecko’s REST API**, using four endpoints:

1. **/coins/markets** – Fetches live market data for multiple coins
2. **/coins/{id}** – Retrieves detailed data for a selected coin
3. **/search** – Enables live search by name or symbol
4. **/coins/{id}/market_chart** – Provides historical data for chart visualization

Each API call includes error handling, loading states, and pagination control.

---

## 🧠 Project Architecture
