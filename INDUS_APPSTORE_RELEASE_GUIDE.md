# 🚀 Indus Appstore (PhonePe) Signed APK & Release Guide for ParikshaAI

This guide provides step-by-step instructions to generate and publish a **Signed Release APK (`.apk`)** or **Android App Bundle (`.aab`)** for **ParikshaAI** to the **Indus Appstore Developer Console**.

---

## 1. Application Package Details
- **App Name**: `ParikshaAI - Exam Prep & Mock Test AI`
- **Package ID / App ID**: `com.parikshaai.app`
- **Version Code**: `1`
- **Version Name**: `1.0.0`
- **Target Category**: `Education / Exam Preparation`
- **Supported Languages**: Hindi, English, and regional Indian languages

---

## 2. Option A: Fast Build with Capacitor (Recommended)

### Step 1: Install Capacitor CLI & Android Platform
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "ParikshaAI" "com.parikshaai.app" --web-dir "dist"
```

### Step 2: Build Web Production Assets
```bash
npm run build
```

### Step 3: Add & Sync Android Project
```bash
npx cap add android
npx cap sync
```

### Step 4: Open in Android Studio & Generate Signed APK
```bash
npx cap open android
```
1. In Android Studio, go to **Build** > **Generate Signed Bundle / APK...**
2. Choose **APK** (or **Android App Bundle** for Indus Appstore).
3. Select your Keystore (`parikshaai-release-key.jks`) or create a new one.
4. Select `release` build variant and check **V1 (Jar Signature)** and **V2 (Full APK Signature)**.
5. Click **Finish**. Your signed APK will be saved at:
   `android/app/release/app-release.apk`

---

## 3. Option B: Generate Keystore & Sign from Command Line

### 1. Generate Keystore using `keytool`
```bash
keytool -genkey -v -keystore parikshaai-release-key.jks -alias parikshaai -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Align the APK
```bash
zipalign -v -p 4 app-unsigned.apk parikshaai-aligned.apk
```

### 3. Sign the APK using `apksigner`
```bash
apksigner sign --ks parikshaai-release-key.jks --ks-key-alias parikshaai --out parikshaai-signed-release.apk parikshaai-aligned.apk
```

### 4. Verify the Signature
```bash
apksigner verify --verbose parikshaai-signed-release.apk
```

---

## 4. Option C: Trusted Web Activity (TWA) with Bubblewrap
If you are hosting ParikshaAI online on your domain:
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest="https://your-domain.com/manifest.json"
bubblewrap build
```
This automatically produces a signed APK ready for Indus Appstore upload.

---

## 5. Uploading to Indus Appstore Developer Console

1. Log in to [Indus Appstore Developer Console](https://www.indusappstore.com/developer).
2. Click **Create New App** -> Select **App / Game** -> **Education**.
3. Upload your signed APK: `parikshaai-signed-release.apk`.
4. Fill in App Details:
   - **Title**: `ParikshaAI - Govt Exam Prep & CBT Mock Tests`
   - **Short Description**: `AI-powered CBT mock tests, instant doubt solver & typing practice for SSC, Banking, Railways & State exams.`
   - **Icon**: `512x512 PNG`
   - **Feature Banner**: `1024x500 PNG`
   - **Screenshots**: Min 3 phone screenshots (Portrait 16:9 or 18:9).
5. Submit for Indus Appstore Review (typically approved within 24–48 hours).
