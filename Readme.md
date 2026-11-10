# 21H Work Tracker ⏱️

A lightweight, mobile-first Progressive Web App (PWA) designed to track shift durations across a 3-day work cycle and predict the exact required exit time on Day 3 to hit a total target of **21 hours**.

Built with React, Vite, and Tailwind CSS, and hosted seamlessly on Vercel for instant offline iOS and desktop access.

---

## ✨ Features

- **3-Day Shift Target Engine:** Calculates Day 1 and Day 2 shift durations and automatically computes the target exit time for Day 3.
- **Error-Proof Time Input:** Built using native `<select>` dropdowns for Hours (HH) and Minutes (MM) to eliminate typing bugs, backspacing issues, and formatting errors.
- **100% Free & Infinite Uptime:** Hosted on Vercel's hobby tier with zero operational cost.
- **Offline iOS PWA Support:** Add to iPhone Home Screen for full-screen, offline-capable mobile usage.
- **Overnight Shift Handling:** Automatically adjusts calculations for shifts crossing midnight.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS / Inline UI utilities
- **Icons:** Lucide React
- **Hosting:** Vercel

---

## 🚀 Quick Start (Local Development)

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (LTS version) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/21h-work-tracker.git](https://github.com/your-username/21h-work-tracker.git)
   cd 21h-work-tracker