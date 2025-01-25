
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
