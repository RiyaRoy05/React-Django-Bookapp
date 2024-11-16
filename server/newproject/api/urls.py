from django.urls import path
from .views import get_books, create_book, book_detail

urlpatterns = [
    path('book/', get_books, name='get_books'),
    path('book/create/', create_book, name='create_book'),
    path('book/<int:pk>/', book_detail, name='book_detail'),
]