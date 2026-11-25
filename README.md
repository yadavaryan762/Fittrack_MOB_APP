# FitTrack – Fitness and Activity Tracker Mobile Application

FitTrack is a modern, cross-platform mobile fitness and activity tracking application built with **React Native** and **Expo**. Designed with a clean, minimal interface and an emerald health theme, FitTrack helps users monitor daily physical activity, track water consumption, log workouts, and visualize fitness trends.

---

## 📱 Features

### Day 1 – Completed Foundation
- **Modern Fitness Dashboard**:
  - Personalized greeting with user name and formatted date.
  - Hero **Daily Fitness Goal** completion card with progress calculation.
  - Quick action shortcuts for logging workouts, water, and steps.
  - 2×2 metric grid displaying **Steps**, **Calories**, **Water**, and **Workout Duration** with individual progress indicators.
  - **Recent Workouts** activity preview list.
- **Robust Tab Navigation**:
  - Smooth bottom navigation linking 4 core screens: **Home**, **Activity**, **Statistics**, and **Profile**.
  - Styled active tinting, custom icons (`@expo/vector-icons`), and safe-area compatibility.
- **Reusable Component Architecture**:
  - Modular cards (`Card`), adaptive progress bars (`ProgressBar`), dynamic headers (`Header`), buttons (`Button`), and stat cards (`StatCard`).

### Upcoming Development Milestones
- **Day 2 (26 Nov)**: Daily fitness tracking (manual step entry, water intake tracking, active calories, dynamic progress updates).
- **Day 3 (27 Nov)**: Workout management (workout logger, categories, edit/delete workout operations, activity history).
- **Day 4 (28 Nov)**: Statistics & local data persistence (`AsyncStorage`, weekly summary charts, profile & target settings).
- **Day 5 (29 Nov)**: Testing, edge case validation, and final presentation preparation.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React Native** (0.88+) | Cross-platform mobile application framework |
| **Expo** (SDK 58) | Development toolchain and runtime |
| **JavaScript (ES6+)** | Core language for readable, beginner-friendly implementation |
| **React Navigation 7** | Tab and screen routing (`@react-navigation/bottom-tabs`) |
| **AsyncStorage** | Local offline data persistence (no backend/database needed) |
| **Expo Vector Icons** | Ionicons for mobile UI design |
| **Git & GitHub** | Incremental version control |

---

## 📂 Project Structure

```text
FitTrack/
├── assets/                       # App icons, splash screens, and adaptive assets
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI elements
│   │   │   ├── Button.js        # Action buttons (primary, secondary, outline)
│   │   │   ├── Card.js          # Styled rounded card wrapper
│   │   │   ├── Header.js        # Dashboard header with greeting & date
│   │   │   └── ProgressBar.js   # Dynamic percentage progress bar
│   │   └── dashboard/           # Dashboard-specific widgets
│   │       ├── GoalProgressCard.js   # Hero daily goal overview
│   │       ├── QuickActions.js       # 1-tap logging shortcuts
│   │       ├── RecentActivityItem.js # Workout activity row item
│   │       └── StatCard.js           # Metric card (steps, water, calories, duration)
│   ├── constants/
│   │   └── theme.js             # Emerald color palette, spacing, and radius
│   ├── navigation/
│   │   └── AppNavigator.js      # Bottom tab navigation configuration
│   └── screens/
│       ├── HomeScreen.js        # Main dashboard screen
│       ├── ActivityScreen.js    # Activity tracking & logging screen
│       ├── StatisticsScreen.js  # Weekly stats and performance screen
│       └── ProfileScreen.js     # User profile and goal settings screen
├── App.js                       # Root component with providers & navigation
├── app.json                     # Expo configuration and metadata
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your physical iOS or Android device (or an emulator/simulator)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yadavaryan762/Fittrack_MOB_APP.git
   cd Fittrack_MOB_APP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - **Android:** Scan the QR code displayed in the terminal using the **Expo Go** app.
   - **iOS:** Scan the QR code using your device's **Camera** app to open it in Expo Go.
   - **Android Emulator / iOS Simulator:** Press `a` or `i` in the terminal.

---

## 🎨 Design System & Palette

- **Primary Brand:** `#059669` / `#10B981` (Emerald Green)
- **Background:** `#F8FAFC` (Clean slate neutral)
- **Cards:** `#FFFFFF` with subtle shadows and `#E2E8F0` border
- **Typography:** Deep Slate (`#0F172A`) & Muted Slate (`#64748B`)
- **Metric Accents:**
  - Steps: `#10B981` (Green)
  - Calories: `#F97316` (Warm Orange)
  - Water: `#0EA5E9` (Sky Blue)
  - Duration: `#8B5CF6` (Purple)

---

## 📅 Development Schedule

| Date | Milestone | Status |
|---|---|:---:|
| **25 Nov 2026** | **Day 1:** Project initialization, navigation, and dashboard UI | ✅ Completed |
| **26 Nov 2026** | **Day 2:** Daily fitness tracking (steps, water, calories, goals) | ⏳ Next |
| **27 Nov 2026** | **Day 3:** Workout management (CRUD, categories, history) | 📋 Pending |
| **28 Nov 2026** | **Day 4:** Statistics, charts, profile settings, AsyncStorage | 📋 Pending |
| **29 Nov 2026** | **Day 5:** Testing, edge-case fixes, and final project submission | 📋 Pending |

---

## 📸 Screenshots

*(Screenshots will be added upon completion of the UI workflows)*

---

## 📄 License

This project is open-source and available under the [MIT License](file:///Users/aryanyadav/Mobile-App-AD/LICENSE).
