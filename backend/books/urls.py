from django.urls import path
from . import views

urlpatterns = [
    path('books', views.books_list, name='books-list'),
    path('order', views.place_order, name='place-order'),
] 