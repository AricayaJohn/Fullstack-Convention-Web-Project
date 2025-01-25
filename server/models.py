
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!
class ConventionArea(db.Model, SerializerMixin):
    __tablename__ = 'convention_areas'

    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String, nullable=False)
    venue = db.Column(db.String, nullable=False)

    conventions = db.relationship('Convention', backref='convention_area', cascade='all,delete-orphan')
    host_companies = associationproxy('convention', 'host_company')

    serialize_rulse = ('-conventions.convention_area',)

class HostCompany(db.Model, SerializerMixin):
    __tablename__ = 'host_companies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    industry = db.Column(db.String, nullable=False)

    conventions = db.relationship('Convention', backref='host_company')
    convention_names = association_proxy('conventions', 'convention_name')

    serialize_rulse = ('-conventions.host_company',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('HostCompany name cannot be empty')
        return name

    @validates('industry')
    def validate_industry(self, key, industry):
        if not industry:
            raise ValueError('Industry cannot be empty')
        return industry
