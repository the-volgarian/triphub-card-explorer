<p align="center">
  <img src="public/banner.png" alt="Trip Card Explorer banner" width="100%" />
</p>

**Trip Hub Card Explorer** is an interactive web application that helps users discover and explore trip ideas in a visually engaging way. Built with **React + Vite**, it combines modern design, smooth animations, and fast performance to deliver an intuitive browsing experience.

---

## ✅ Features

- **Trip grid** rendering from `/public/data.json`, with proper loading & error states.
- **Image loader**: subtle 3-dot overlay until the image fully loads (even when it’s not a 404).
- **Search**: keep all cards visible; matches are auto-prioritized to the front, non-matches are **dimmed** instead of hidden.
- **Sort by Rating** toggle (on/off), descending.
- **Details modal** with full description and rating.  
  **Spec:** “Add a ‘More Info’ button that opens a modal …” →  
  **My build:** the **entire card is the button** (click/Enter opens the modal).
- **A11y**: keyboard navigation on cards (`role="button"`, `tabIndex=0`, Enter/Space), ESC to close modal, focus management.
- **Prod-ready** Vite build (dev, build, preview scripts).
---

## 🧱 Tech Stack

- **React 18** + **Vite**
- **SCSS/CSS modules** for component styling

---

## 🚀 Quick Start

```bash
# 1) Install
npm install

# 2) Start dev server
npm run dev
# Vite usually runs at http://localhost:5173

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview

