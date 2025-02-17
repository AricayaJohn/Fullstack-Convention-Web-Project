#!/usr/bin/env python3

from app import app
from models import db, Convention, ConventionArea, HostCompany, convention_area_host
def clear_data():
    Convention.query.delete()
    ConventionArea.query.delete()
    HostCompany.query.delete()

    db.session.execute(convention_area_host.delete())
    db.session.commit()

def add_convention_areas():
    area1 = ConventionArea(location_name='Los Angeles Convention', venue='Staples Center')
    area2 = ConventionArea(location_name='San Francisco Convention', venue='Oracle Center')

    db.session.add_all([area1, area2])
    db.session.commit()

def add_host_companies():
    company1 = HostCompany(name='TechCorp', industry='Technology')
    company2 = HostCompany(name='Foodies Inc.', industry='Food & Beverage')

    db.session.add_all([company1, company2])
    db.session.commit()

def add_conventions():
    convention1 = Convention(convention_name='Tech Conference 2025', days=3, convention_area_id=2, host_company_id=1)
    convention2 = Convention(convention_name='Food Convention Festival', days=5, convention_area_id=1, host_company_id=2)

    db.session.add_all([convention1, convention2])
    db.session.commit()

def link_areas_hosts():
    area1 = ConventionArea.query.filter_by(location_name='Los Angeles Convention').first()
    area2 = ConventionArea.query.filter_by(location_name='San Francisco Convention').first()

    host1 = HostCompany.query.filter_by(name='TechCorp').first()
    host2 = HostCompany.query.filter_by(name='Foodies Inc.').first()

    if area1 and host1:
        area1.host_companies.append(host1)
    if area2 and host2:
        area2.host_companies.append(host2)

    db.session.commit()

def seed():
    print("Clearing data...")
    clear_data()

    print("Seeding convention areas...")
    add_convention_areas()

    print("Seeding host companies...")
    add_host_companies()

    print("Seeding Conventions...")
    add_conventions()

    print("Linking convention areas and hosts...")
    link_areas_hosts()

    print("seeding complete!")

if __name__ == '__main__':
    with app.app_context():
        seed()

