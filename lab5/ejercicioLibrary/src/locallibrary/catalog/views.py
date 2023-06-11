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

from django.views import generic

class BookListView(generic.ListView):
    """Generic class-based view for a list of books."""
    model = Book
    paginate_by = 10

class BookDetailView(generic.DetailView):
    """Generic class-based detail view for a book."""
    model = Book

class AuthorListView(generic.ListView):
    """Generic class-based list view for a list of authors."""
    model = Author
    paginate_by = 10

class AuthorDetailView(generic.DetailView):
    """Generic class-based detail view for an author."""
    model = Author

from django.contrib.auth.mixins import LoginRequiredMixin

class LoanedBooksByUserListView(LoginRequiredMixin, generic.ListView):
    """Vista genérica basada en clases que enumera libros prestados al usuario actual."""
    model = BookInstance
    template_name = 'catalog/bookinstance_list_borrowed_user.html'
    paginate_by = 10

    def get_queryset(self):
        return (
            BookInstance.objects.filter(borrower=self.request.user)
            .filter(status__exact='o')
            .order_by('due_back')
        )
    
from django.contrib.auth.mixins import PermissionRequiredMixin

class LoanedBooksAllListView(PermissionRequiredMixin, generic.ListView):
    """Vista genérica basada en clases que enumera todos los libros en préstamo.
      Solo visible para usuarios con permiso can_mark_returned."""
    model = BookInstance
    permission_required = 'catalog.can_mark_returned'
    template_name = 'catalog/bookinstance_list_borrowed_all.html'
    paginate_by = 10

    def get_queryset(self):
        return BookInstance.objects.filter(status__exact='o').order_by('due_back')

from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import datetime
from django.contrib.auth.decorators import login_required, permission_required

# from .forms import RenewBookForm
from catalog.forms import RenewBookForm


@login_required
@permission_required('catalog.can_mark_returned', raise_exception=True)
def renew_book_librarian(request, pk):
    """Vista función para renovar una BookInstance específica por bibliotecario."""
    book_instance = get_object_or_404(BookInstance, pk=pk)

    # Si se trata de una solicitud POST, procese los datos del formulario
    if request.method == 'POST':

        #Cree una instancia de formulario y complétela con datos de la solicitud (enlace):
        form = RenewBookForm(request.POST)

        # Compruebe si el formulario es válido:
        if form.is_valid():
            # procese los datos en form.cleaned_data 
            # según sea necesario (aquí solo los escribimos en el campo due_back del modelo)
            book_instance.due_back = form.cleaned_data['renewal_date']
            book_instance.save()

            # redirect to a new URL:
            return HttpResponseRedirect(reverse('all-borrowed'))

    # Si se trata de un GET (o cualquier otro método), cree el formulario predeterminado
    else:
        proposed_renewal_date = datetime.date.today() + datetime.timedelta(weeks=3)
        form = RenewBookForm(initial={'renewal_date': proposed_renewal_date})

    context = {
        'form': form,
        'book_instance': book_instance,
    }

    return render(request, 'catalog/book_renew_librarian.html', context)