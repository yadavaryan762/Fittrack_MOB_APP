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

### Day 2 – Completed Daily Fitness Tracking
- **Interactive Daily Activity Tracking Screen**:
  - **Steps Tracking Card**: Current vs. target counter, percentage progress bar, 1-tap quick add chips (`+500`, `+1,000`, `+2,500`), and manual set modal.
  - **Water Intake Card**: Dual display in milliliters (ml) and standard glasses (250ml/glass), quick add buttons (`+250ml`, `+500ml`, `-250ml`), and custom entry modal.
  - **Calorie Tracker Card**: Active burn counter, goal progress bar, quick increment chips (`+100`, `+250 kcal`), and manual logging.
- **Dynamic Goal Setting & State Management**:
  - Centralized `ActivityContext` linking Dashboard (`HomeScreen`) and Activity (`ActivityScreen`) with zero third-party state libraries.
  - `GoalSettingModal` allowing users to configure custom targets for steps, water, calories, and duration with immediate real-time synchronization.
  - Daily progress summary banner with 4-target status pills (`Steps`, `Water`, `Calories`, `Duration`).

### Day 3 – Completed Workout Management & Activity History
- **Workout Logging Modal (`WorkoutFormModal`)**:
  - Full workout logger with title, category selection chips, duration (minutes), estimated calories (kcal), date (YYYY-MM-DD), and optional notes.
  - Automatic calorie estimation helper based on workout duration and sport intensity.
- **Categorization Support (`workoutCategories.js`)**:
  - 6 supported categories: **Running**, **Walking**, **Cycling**, **Gym**, **Yoga**, and **Other** with distinct icons, themes, and calorie burn rates.
- **Edit and Delete Workouts (`WorkoutCard`)**:
  - Pre-filled modal to update previously recorded workouts.
  - Confirmation dialog with `Alert.alert` before deleting a record to prevent accidental data loss.
- **Chronological Activity History View (`WorkoutHistoryView`)**:
  - Segmented view switcher on Activity screen toggling between **Daily Tracker** and **Workout History**.
  - Category filter chips (`All`, `Running`, `Gym`, `Cycling`, etc.) for quick filtering.
  - High-level workout summary strip: **Total Workouts**, **Total Active Minutes**, and **Total Calories Burned**.
  - Empty state with quick record prompt.
- **Dashboard Integration**:
  - `HomeScreen` displays live recent workout entries and provides 1-tap workout logging directly from the dashboard.

### Day 4 – Completed Statistics, Local Persistence & Profile Settings
- **Weekly Analytics & Visual Charts (`StatisticsScreen`)**:
  - **7-Day Interactive Bar Chart (`WeeklyBarChart`)**: Compares daily workout duration and calories burned with an interactive metric toggle and highlighted current day.
  - **Category Breakdown (`CategoryBreakdown`)**: Proportional progress bars displaying distribution of workouts by category with session counts and percentages.
  - **2×2 Summary KPI Grid (`StatOverviewCard`)**: Total calories burned, total active duration, total sessions, and average workout duration.
  - **Target Completion Card**: Today's goal progress summary with step, water, and calorie indicators.
- **Offline Data Persistence (`AsyncStorage`)**:
  - Implemented `src/utils/storage.js` with structured keys (`@fittrack_goals`, `@fittrack_activity`, `@fittrack_workouts`, `@fittrack_profile`).
  - Seamless background loading on startup and automatic synchronization on updates.
  - Data remains intact across app closures and device reboots without any external backend.
- **User Profile & Fitness Preferences (`ProfileScreen`)**:
  - Profile card displaying user name, email, experience level, and preferred activity.
  - `EditProfileModal` allowing real-time edits to name, email, level, and primary focus.
  - Quick goal adjustments linking to `GoalSettingModal`.
  - Preference controls including daily reminders toggle and unit systems.
  - Safe data management options: "Reset Today's Activity" and "Clear All App Data" with native confirmation alerts.

### Upcoming Development Milestones
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
| **26 Nov 2026** | **Day 2:** Daily fitness tracking (steps, water, calories, goals) | ✅ Completed |
| **27 Nov 2026** | **Day 3:** Workout management (CRUD, categories, history) | ✅ Completed |
| **28 Nov 2026** | **Day 4:** Statistics, charts, profile settings, AsyncStorage | ✅ Completed |
| **29 Nov 2026** | **Day 5:** Testing, edge-case fixes, and final project submission | ⏳ Next |

---

## 📸 Screenshots

*(Screenshots will be added upon completion of the UI workflows)*

---

## 📄 License

This project is open-source and available under the [MIT License](file:///Users/aryanyadav/Mobile-App-AD/LICENSE).
