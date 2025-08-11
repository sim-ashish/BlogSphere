import time
from django.core.management.base import BaseCommand
from django.db import connection
from blog.models import BlogPost


class Command(BaseCommand):
    help = 'Benchmark if a queryset is cached or hits the DB'

    def handle(self, *args, **kwargs):
        query = BlogPost.objects.filter(is_published=True)

        # First run (cache miss likely)
        connection.queries.clear()
        start = time.time()
        results = list(query)
        end = time.time()

        print("\n📊 First Query (cache miss expected):")
        print(f"Time: {(end - start):.5f} seconds")
        print(f"DB queries: {len(connection.queries)}")
        if connection.queries:
            print("✅ DB HIT")
        else:
            print("❌ NO DB HIT (CACHED)")

        # Second run (should be cached)
        connection.queries.clear()
        start = time.time()
        results = list(query)
        end = time.time()

        print("\n📊 Second Query (should be cache hit):")
        print(f"Time: {(end - start):.5f} seconds")
        print(f"DB queries: {len(connection.queries)}")
        if connection.queries:
            print("❌ DB HIT")
        else:
            print("✅ CACHED RESULT (No DB)")





# python manage.py benchmark_cache
