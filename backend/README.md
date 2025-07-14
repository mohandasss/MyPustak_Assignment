# MyPustak Backend (Django REST API)

## Setup Instructions

1. **Navigate to backend directory:**
   ```sh
   cd backend
   ```
2. **Create and activate virtual environment (Windows):**
   ```sh
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. **Install dependencies:**
   ```sh
   pip install django djangorestframework django-cors-headers
   ```
4. **Run migrations:**
   ```sh
   python manage.py migrate
   ```
5. **Start the server:**
   ```sh
   python manage.py runserver 0.0.0.0:8000
   ```

## API Endpoints

### GET `/books`
- Returns a list of books (id, title, author).
- Example response:
  ```json
  [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
    {"id": 3, "title": "1984", "author": "George Orwell"}
  ]
  ```

### POST `/order`
- Accepts: `book_id` (int), `customer_name` (string)
- Example request body:
  ```json
  {"book_id": 1, "customer_name": "John Doe"}
  ```
- Example response:
  ```json
  {
    "message": "Order placed successfully!",
    "book": {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    "customer_name": "John Doe"
  }
  ```

## Notes
- No authentication required.
- CORS is enabled for all origins.
- Data is hardcoded for simplicity. 