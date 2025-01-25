#!/usr/bin/env python3

from app import app
from models import db, Convention, ConventionArea, HostCompany

def cleardata():
    Convention.query.delete()
    ConventionArea.query.delete()
    HostCompany.query.delete()
    db.session.commit()

def add_convention_areas():
    area1 = ConventionArea(location_name='Los Angeles Convention', venue='Staples Center')
    area2 = ConventionArea(location_name='San Francisco Convention', venue='Oracle Center')

    db.session.add_all([area1, area2])
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
