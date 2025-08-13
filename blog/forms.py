from django import forms
from django.forms.widgets import ClearableFileInput
from django_ckeditor_5.widgets import CKEditor5Widget
from django.utils.translation import gettext_lazy as _
from .models import BlogPost

class BlogPostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(config_name='extends'))
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'thumbnail']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input',
                'id': 'blogTitle',
            }),
            'thumbnail': ClearableFileInput(attrs={
                'class' : '',
                'id': 'imageInput',
                'style' :'display:none;',
                'accept' : 'image/*',
                'onchange': 'handleImageUpload(event)'
            }),
        }
        labels = {
            "title": _("Blog Title"),
            "content" : _("Blog Content"),
            "thumbnail": _("Thumbnail Image")
        }


from .models import UploadedImage

class UploadImageForm(forms.ModelForm):
    class Meta:
        model = UploadedImage
        fields = ['image']