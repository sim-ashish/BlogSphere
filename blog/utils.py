from django.utils.text import slugify

def generate_unique_slug(model_instance, slug_field_name, slug_source, queryset=None, slug_separator='-'):
    """
    Generates a unique slug for a Django model instance.

    Args:
        model_instance: The instance of the model for which to generate the slug.
        slug_field_name: The name of the slug field as a string.
        slug_source: The string source to generate the slug from (usually title).
        queryset: Optional queryset to check for existing slugs. Defaults to all objects of the model.
        slug_separator: String to separate slug and counter (default: '-').

    Returns:
        A unique slug string.
    """
    slug = slugify(slug_source)
    model_class = model_instance.__class__
    
    if queryset is None:
        queryset = model_class.objects.all()

    # Prepare initial slug and counter
    unique_slug = slug
    counter = 1

    # Exclude current instance from queryset if it has a PK (for updates)
    if model_instance.pk:
        queryset = queryset.exclude(pk=model_instance.pk)

    # Loop until slug is unique
    while queryset.filter(**{slug_field_name: unique_slug}).exists():
        unique_slug = f"{slug}{slug_separator}{counter}"
        counter += 1

    return unique_slug
