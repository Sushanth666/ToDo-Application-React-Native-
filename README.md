# 📱 Beginner React Native To-Do Application

A clean, modern, beginner-friendly mobile task management app built with **React Native**, **Expo (SDK 58)**, and **TypeScript**.

---

## ✨ Features

- **Add Tasks**: Set title, category tag (*Work*, *Personal*, *Study*, *Health*, *Other*), and priority (*High*, *Medium*, *Low*).
- **Interactive Checkbox**: Toggle tasks between active and completed with instant visual feedback.
- **Search & Filter**: Filter by *All*, *Active*, or *Completed*, or search by keywords in real time.
- **Progress Tracking**: Dynamic progress bar displaying completion percentage.
- **Persistent Storage**: Saves tasks locally using `@react-native-async-storage/async-storage` so tasks remain saved across app restarts.
- **Batch Actions**: One-click "Clear Done" action to remove completed items.

---

## 🚀 How to Run the App

### Option 1: On Your Physical Phone (Easiest & Recommended for Beginners)
1. Install the free **Expo Go** app on your phone:
   - [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Apple App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
2. In your terminal, run:
   ```bash
   npx expo start
   ```
3. Scan the QR code displayed in the terminal:
   - **Android**: Scan with the Expo Go app.
   - **iOS**: Scan with your camera app and tap the Expo banner.

### Option 2: In a Web Browser
Run:
```bash
npx expo start --web
```
Press `w` in the terminal to view in your browser.

### Option 3: On an Android Emulator / iOS Simulator
- For Android: Press `a` in the terminal after starting `npx expo start`.
- For iOS (macOS required): Press `i`.

---

## 📁 Project Structure

```
├── App.tsx                     # Main application entry point & state orchestration
├── src/
│   ├── types/
│   │   └── todo.ts             # TypeScript types (TodoItem, Priority, Category, FilterType)
│   ├── utils/
│   │   └── storage.ts          # AsyncStorage helper functions (loadTodos, saveTodos)
│   └── components/
│       ├── Header.tsx          # Date, title, progress bar, and "Clear Done" button
│       ├── TaskInput.tsx       # Input bar with category chips & priority selector
│       ├── FilterBar.tsx       # Search bar and All / Active / Completed filters
│       └── TaskItem.tsx        # Individual task item card with checkbox and delete button
├── package.json
└── tsconfig.json
```

---

## 🧠 Beginner Concepts Explained

| Concept | React Native Equivalent | How It's Used Here |
|---|---|---|
| **Container / Div** | `<View>` | The fundamental building block for styling layouts with Flexbox. |
| **Typography** | `<Text>` | All text in React Native must be wrapped inside a `<Text>` tag. |
| **User Input** | `<TextInput>` | Captures task names and search queries. |
| **Buttons / Taps** | `<TouchableOpacity>` | Provides native touch feedback (dimming effect on press). |
| **Scrollable Lists** | `<FlatList>` | Highly optimized list renderer that only mounts visible items. |
| **Styling** | `StyleSheet.create({})` | CSS-like styling using JavaScript objects with camelCase properties. |
| **State** | `useState` | Tracks list of tasks, current filter, search queries, and selected category. |
| **Side Effects** | `useEffect` | Loads saved tasks from storage when the app opens and saves updates automatically. |

---

## 🛠️ Handy Commands

- **Start Dev Server**: `npx expo start`
- **Typecheck**: `npm run typecheck`
- **Check Project Health**: `npx expo-doctor`

