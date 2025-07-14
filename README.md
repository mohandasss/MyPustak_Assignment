clone it (Best option)
### 🖥️ **Backend (Django + DRF) Setup**

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create and activate virtual environment** (Windows PowerShell)

   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install required dependencies**

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. **Run database migrations**

   ```bash
   python manage.py migrate
   ```

5. **Start the development server**

   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

---

### 🌐 **Frontend (React Native + Expo) Setup**

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Configure backend URL**

   Open:

   ```
   app/(tabs)/index.tsx
   ```

   Set `BACKEND_URL` based on your environment:

   * For web or Android emulator:

     ```ts
     const BACKEND_URL = "http://localhost:8000";
     ```
   * For a real mobile device using Expo Go:
     Replace `192.168.0.101` with your actual local IP:

     ```ts
     const BACKEND_URL = "http://192.168.0.101:8000";
     ```

---

### 📱 **Start the Expo app**

```bash
npx expo start
```

* A QR code will appear in the terminal or browser.
* Scan the QR code using the **Expo Go** app (available on Android/iOS).
* Alternatively, choose to run on **web** or **Android/iOS emulator** from the browser.

