from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import datetime  # for checking renewal date range.

from django import forms


class RenewBookForm(forms.Form):
    """Formulario para que un bibliotecario renueve libros."""
    renewal_date = forms.DateField(
            help_text="Enter a date between now and 4 weeks (default 3).")

    def clean_renewal_date(self):
        data = self.cleaned_data['renewal_date']

        # La fecha de verificación no está en el pasado.
        if data < datetime.date.today():
            raise ValidationError(_('Invalid date - renewal in past'))
       # La fecha de verificación está dentro del rango
       #  que el bibliotecario puede cambiar (+4 semanas)
        if data > datetime.date.today() + datetime.timedelta(weeks=4):
            raise ValidationError(
                _('Invalid date - renewal more than 4 weeks ahead'))

        # Remember to always return the cleaned data.
        return data
