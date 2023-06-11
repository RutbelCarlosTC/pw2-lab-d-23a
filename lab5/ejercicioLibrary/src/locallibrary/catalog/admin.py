from django.contrib import admin

# Register your models here.
from .models import Author, Genre, Book, BookInstance, Language
"""
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(BookInstance)
"""
admin.site.register(Genre)
admin.site.register(Language)


class BooksInline(admin.TabularInline):
    """Define el formato de inserción de libros en línea (utilizado en AuthorAdmin)"""
    model = Book


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    """Objeto de administración para modelos Author.
     Define:
      - campos que se mostrarán en la vista de lista (list_display)
      - campos de pedidos en vista detallada (campos),
        agrupar los campos de fecha horizontalmente
      - agrega la adición en línea de libros en la vista de autor (en línea)
    """
    list_display = ('last_name',
                    'first_name', 'date_of_birth', 'date_of_death')
    fields = ['first_name', 'last_name', ('date_of_birth', 'date_of_death')]
    inlines = [BooksInline]
