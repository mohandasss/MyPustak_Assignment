# MyPustak Book Listing App (Frontend)

This is the React Native (Expo) frontend for the MyPustak Book Listing assignment. It connects to a Django REST backend to display a list of books and allows users to place orders.

---

## 🚀 Features
- **Book List:** Fetches and displays books from the backend API.
- **Order Placement:** Tap a book to open a form, enter your name, and place an order.
- **Success Feedback:** Shows a confirmation message after placing an order.
- **Minimal, centered UI:** Clean and simple design.

---

## 🛠️ Setup Instructions

### 1. Install dependencies
```sh
cd frontend
npm install
```

### 2. Configure Backend URL
- Open `app/(tabs)/index.tsx`.
- Set the `BACKEND_URL` to your backend server address:
  - For web or Android emulator: `http://localhost:8000`
  - For real device (Expo Go): Use your computer's IP, e.g. `http://192.168.0.101:8000`

### 3. Start the Expo app
```sh
npx expo start
```
- A QR code will appear in your terminal or browser.
- Scan it with the **Expo Go** app (Android/iOS) or run on an emulator/web.

---

## 📱 Running on Your Phone (Expo Go)
1. Make sure your phone and computer are on the **same WiFi network**.
2. Download the **Expo Go** app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).
3. Scan the QR code shown in your terminal or browser after running `npx expo start`.
4. The app will load on your phone.

---

## 🐞 Troubleshooting
- **App stuck on loading in Expo Go:**
  - Make sure `BACKEND_URL` is set to your computer's IP address.
  - Ensure your Django backend is running and accessible from your phone.
  - Test in your phone's browser: `http://YOUR_COMPUTER_IP:8000/books` should show a JSON list.
  - Allow Python through your firewall if needed.
- **Web version works but not mobile:**
  - This is almost always a network or URL issue. Double-check the above.

---

## 📂 Project Structure
- `app/(tabs)/index.tsx` — Main Book List and Order screen
- `components/` — Shared UI components

---

## 📝 Notes
- This app is for demo/testing purposes. No authentication or persistent storage.
- For any issues, check the backend README and ensure both servers are running.

---

**Happy coding!**
