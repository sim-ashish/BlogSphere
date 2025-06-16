from functools import wraps
from django.shortcuts import get_object_or_404
from django.http import Http404
from blog.models import BlogPost

def approved_blog_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        slug = kwargs.get('blog_slug')
        author = kwargs.get('author')
        blog = get_object_or_404(BlogPost, author__username=author, slug=slug)

        if not blog.admin_approved:
            raise Http404("Blog not found")  # or customize message

        # Pass blog object to the view if needed
        # kwargs['blog'] = blog  
        return view_func(request, *args, **kwargs)
    return _wrapped_view
