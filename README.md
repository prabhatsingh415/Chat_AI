# Chat AI — Voice-to-Chat AI Mobile Application

A voice-first conversational AI mobile application built with **Expo SDK 55**, **React Native 0.83**, **Hermes V1**, and **React Compiler**. 

The application captures user speech via the microphone, converts it into text for review, sends contextual prompts to Google's **Gemini REST API**, and renders the response in a modern **NativeWind** chat interface with automatic **Text-to-Speech (TTS)** playback.

---

## 📥 Download Release APK (Live Preview)

- **Download APK (Google Drive):** [Click Here to Download Release APK](https://drive.google.com/file/d/1a_JPkVZcjHM5eoyUs8cxw9JfJzZu7KWD/view?usp=sharing)

---

> **Assessment Submission:** Developed for **Kriscent Techno Hub Pvt Ltd**.  
> **Recommended Evaluation:** For the best and fastest live preview of the application, **installing the provided Standalone Release APK is strongly recommended**. Because `hermesV1Enabled=true` compiles React Native and the Hermes V1 C++ engine from source, fresh native builds are highly resource-intensive and sensitive to local machine configurations.

---

## Key Features

- **Voice-to-Text (`expo-speech-recognition`):** Non-continuous speech capture with runtime permission handling, a live duration timer, and an automatic **60-second recording cap**.
- **Transcript Review Flow:** Users can inspect, cancel, or confirm recognized speech before sending it to the AI, preventing accidental or incomplete prompts.
- **Contextual Gemini AI Chat:** Uses HTTPS REST calls with conversation history managed via **Zustand**, complete with HTTP `429` (Rate Limit) and `503` multi-model fallback handling.
- **Text-to-Speech Playback (`expo-speech`):** Automatically speaks incoming AI responses (`en-IN` voice profile) with per-message speaker controls to toggle or stop playback.
- **Offline & Permission Resilience (`NetInfo`):** Actively monitors connectivity, stops active recordings if connection drops, and displays custom popups for offline states or denied microphone permissions.
- **Strict TypeScript (Zero `any`):** Complete end-to-end type safety across API payloads, Zustand stores, custom hooks, and component props.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Expo SDK 55, React Native 0.83, React 19, Expo Router |
| **JS Engine & Optimization** | **Hermes V1** (`useHermesV1: true`), **React Compiler** (`reactCompiler: true`) |
| **Language** | TypeScript (Strict Mode, zero `any`) |
| **Styling & UI** | NativeWind (Tailwind CSS), Lottie Animations, Lucide Icons |
| **State Management** | Zustand |
| **Voice & AI** | Google Gemini REST API, `expo-speech-recognition`, `expo-speech` |
| **Network Monitoring** | `@react-native-community/netinfo` |

---

## Architecture & Data Flow

```text
                 ┌─────────────────┐
                 │      User       │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Microphone    │  (Max 60s Timer + Permission Check)
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Speech-to-Text  │  (expo-speech-recognition)
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Transcript    │  (Review / Cancel / Send)
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Gemini API    │  (HTTPS REST + Fallback Models)
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  Zustand Store  │  (Typed Conversation History)
                 └───────┬─┬───────┘
                         │ │
                ┌────────┘ └────────┐
                ▼                   ▼
        ┌──────────────┐    ┌──────────────┐
        │   Chat UI    │    │ Text-to-Speech│
        └──────────────┘    └──────────────┘
```

> **Why REST instead of WebSockets?**  
> Because the interaction follows a discrete *Record → Review Transcript → Send Prompt → Receive Response* lifecycle, HTTPS REST is cleaner, more predictable, and avoids unnecessary persistent socket overhead on mobile networks.

---

## Project Structure

```text
AI-App/
├── assets/                  # Fonts, icons, and Lottie animations
├── components/              # Reusable UI components
│   ├── AppText.tsx
│   ├── ChatScreen.tsx
│   ├── Input.tsx
│   ├── MessageBubble.tsx
│   ├── OfflinePopup.tsx
│   ├── RequestPopUp.tsx
│   └── StartConvoScreen.tsx
├── hook/                    # Custom business-logic hooks
│   ├── useAudio.ts
│   ├── useGeminiChat.ts
│   ├── useNetworkStatus.ts
│   ├── useTimer.ts
│   └── useTTS.ts
├── store/
│   └── messagesStore.ts     # Zustand state store for chat history
├── src/
│   └── app/                 # Expo Router screens (_layout.tsx, index.tsx)
├── app.json                 # Expo & React Compiler configuration
├── tailwind.config.ts       # NativeWind configuration
├── tsconfig.json            # Strict TypeScript configuration
└── package.json
```

---

## Getting Started (Local Development)

### 1. Prerequisites
- **Node.js** (LTS) & **npm**
- **Android Studio / Android SDK** (with an Android Emulator or physical device connected via USB debugging)

### 2. Installation

```bash
git clone [https://github.com/prabhatsingh415/Chat_AI.git](https://github.com/prabhatsingh415/Chat_AI.git)
cd Chat_AI
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Security Note:** `.env` is excluded via `.gitignore`. The `EXPO_PUBLIC_` prefix embeds the key at build time for assessment testing; in a commercial production environment, requests should be proxied through a backend service.

### 4. Running the Application

```bash
# Run native Android Debug build (Recommended for local code testing)
npx expo run:android

# Start Metro bundler with clean cache
npx expo start --clear
```

---

## Compiler & Engine Configuration

### Hermes V1 & Build Recommendation
This project is configured with **Hermes V1** (`useHermesV1: true` / `hermesV1Enabled=true`) and `buildReactNativeFromSource: true`. 

- **Note on Local Native Builds:** Compiling React Native and the Hermes V1 C++ engine from source is computationally heavy and can vary across different machines depending on local JDK, NDK, CMake, and JVM memory configurations.
- **Recommended Live Preview:** The production **Release APK** has already been carefully compiled, verified, and tested with Hermes V1 and React Compiler enabled. We strongly recommend using the provided Release APK for an immediate and hassle-free live evaluation of the app.

### React Compiler & Code Quality Checks

```bash
# Verify React Compiler compatibility
npx react-compiler-healthcheck@latest

# Run ESLint check
npx expo lint
```

---

## Assessment Requirements Checklist

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Expo SDK 55 & React Native** | ✅ | Expo `55.x` with React Native `0.83` (New Architecture) |
| **Hermes V1 Enabled** | ✅ | `hermesV1Enabled=true` compiled from source |
| **React Compiler Enabled** | ✅ | `experiments.reactCompiler: true` in `app.json` |
| **Strict TypeScript (Zero `any`)** | ✅ | Typed interfaces for Gemini payloads, hooks, props, and state |
| **NativeWind Styling** | ✅ | Utility-first Tailwind styling across all screens and popups |
| **Speech-to-Text Input** | ✅ | `expo-speech-recognition` with transcript review before sending |
| **60-Second Recording Limit** | ✅ | Custom `useTimer` hook with auto-stop at 60s |
| **Gemini API Integration** | ✅ | Contextual REST chat with rate-limit/model fallback handling |
| **Text-to-Speech (TTS)** | ✅ | Auto-playback via `expo-speech` + manual start/stop controls |
| **Network & Permission Handling** | ✅ | Real-time `NetInfo` offline modal & permission recovery prompt |

---

## Author

**Prabhat Singh**  
GitHub: [https://github.com/prabhatsingh415/Chat_AI](https://github.com/prabhatsingh415/Chat_AI)
