#!/usr/bin/env python3
from models import db, Convention, ConventionArea, HostCompany
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}"
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    return '<h1>Convention Event Manager</h1>'

class ConventionAreas(Resource):
    def get(self):
        areas = ConventionArea.query.all()
        return [area.to_dict(only=('id', 'location_name', 'venue')) for area in areas]
    
    def post(self):
        data = request.get_json()
        try:
            new_area = ConventionArea(
                location_name = data['location_name'],
                venue = data['venue']
            )
            db.session.add(new_area)
            db.session.commit()
            return make_response(new_area.to_dict(), 200)
        except ValueError as e:
            return make_response({'errors': ['validation errors']}, 400)

api.add_resource(ConventionAreas, '/convention_areas')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

