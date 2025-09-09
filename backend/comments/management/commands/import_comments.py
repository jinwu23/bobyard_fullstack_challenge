import json
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from comments.models import Comment

# Allows importing comments from a JSON file into the Comment model's database table
# Defines custom management command named import_comments (derived from filename)
# Usage: python manage.py import_comments <json_file> [--clear]
class Command(BaseCommand):
    help = 'Import comments from JSON file'

    # Defines command line arguments json_file and optional flag --clear
    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to JSON file')
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing comments before importing',
        )

    # Entry point for command
    def handle(self, *args, **options):
        json_file = options['json_file']
        clear_existing = options['clear']

        # Open json file
        try:
            with open(json_file, 'r', encoding='utf-8') as file:
                data = json.load(file)
        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR(f'File not found: {json_file}')
            )
            return
        except json.JSONDecodeError as e:
            self.stdout.write(
                self.style.ERROR(f'Invalid JSON: {e}')
            )
            return

        # Check flag
        if clear_existing:
            # Delete previous comments
            existing_count = Comment.objects.count()
            Comment.objects.all().delete()
            self.stdout.write(
                self.style.WARNING(f'Cleared {existing_count} existing comments')
            )

        # Get comments from JSON
        comments_data = data.get('comments', [])
        
        created_count = 0
        for comment_data in comments_data:
            try:
                # Parse the date
                date_str = comment_data.get('date')
                parsed_date = None
                if date_str:
                    parsed_date = parse_datetime(date_str)

                # Create comment
                comment = Comment.objects.create(
                    text=comment_data.get('text', ''),
                    author=comment_data.get('author', 'Admin'),
                    date=parsed_date if parsed_date else None,
                    likes=comment_data.get('likes', 0),
                    image_url=comment_data.get('image', '') or None
                )
                created_count += 1
                
            except Exception as e:
                self.stdout.write(
                    self.style.WARNING(f'Error importing comment {comment_data.get("id", "unknown")}: {e}')
                )
                continue

        self.stdout.write(
            self.style.SUCCESS(f'Successfully imported {created_count} comments')
        )