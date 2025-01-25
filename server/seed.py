#!/usr/bin/env python3

from app import app
from models import db, Convention, ConventionArea, HostCompany

def cleardata():
    Convention.query.delete()
    ConventionArea.query.delete()
    HostCompany.query.delete()
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
