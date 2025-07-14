from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Hardcoded list of books
BOOKS = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
    {"id": 3, "title": "1984", "author": "George Orwell"},
]

@api_view(['GET'])
def books_list(request):
    return Response(BOOKS)

@api_view(['POST'])
def place_order(request):
    book_id = request.data.get('book_id')
    customer_name = request.data.get('customer_name')
    book = next((b for b in BOOKS if b['id'] == book_id), None)
    if not book:
        return Response({'error': 'Book not found.'}, status=status.HTTP_400_BAD_REQUEST)
    if not customer_name:
        return Response({'error': 'Customer name is required.'}, status=status.HTTP_400_BAD_REQUEST)
    order_details = {
        'message': 'Order placed successfully!',
        'book': book,
        'customer_name': customer_name
    }
    return Response(order_details, status=status.HTTP_201_CREATED)
