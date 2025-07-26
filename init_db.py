#!/usr/bin/env python3
"""
Database initialization script for VolunteerSync
Run this script to create all database tables
"""

from app import app
from app.models import db
from sqlalchemy import inspect

def init_db():
    """Initialize the database with all tables"""
    with app.app_context():
        inspector = inspect(db.engine)
        existing_tables = inspector.get_table_names()
        
        if existing_tables:
            print(f"📊 Existing tables found: {', '.join(existing_tables)}")
            choice = input("Tables already exist. Recreate them? (y/N): ")
            if choice.lower() == 'y':
                print("🗑️  Dropping all tables...")
                db.drop_all()
                print("🏗️  Creating all tables...")
                db.create_all()
                print("✅ Database tables recreated successfully!")
            else:
                print("⏭️  Skipping table creation.")
        else:
            print("🏗️  Creating all tables...")
            db.create_all()
            print("✅ Database tables created successfully!")
        
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        print(f"📊 Current tables: {', '.join(tables) if tables else 'None'}")

if __name__ == '__main__':
    init_db()
