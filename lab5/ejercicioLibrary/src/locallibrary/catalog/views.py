from django.shortcuts import render

# Create your views here.
from .models import Book,Author,BookInstance,Genre
def index(request):
    """Vista Funcion para pagina de inicio"""

    # Numero de libros e instancias de libro
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()

    # Libros disponibles (status = 'a')
    num_instances_available = BookInstance.objects.filter(status__exact='a').count()

    # EL 'all()' esta implicito por defecto.
    #Author.objects.all().count()

    num_authors = Author.objects.count()

    context = {
        'num_books': num_books,
        'num_instances': num_instances,
        'num_instances_available': num_instances_available,
        'num_authors': num_authors,
    }

    # Renderizar la platilla HTML index.html con los datos de la variable context
    return render(request, 'index.html', context=context)