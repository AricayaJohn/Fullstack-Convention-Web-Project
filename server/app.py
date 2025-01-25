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
            print('Error', e)
            return make_response({'errors': ['validation errors']}, 400)

api.add_resource(ConventionAreas, '/convention_areas')

class ConventionAreasById(Resource):
    def get(self, id):
        area = db.session.get(ConventionArea, id)
        if area:
            return area.to_dict(), 200
        return {'error': 'ConventionArea not found'}, 404
    
    def patch(self, id):
        area = ConventionArea.query.filter_by(id=id).first()
        if area:
            try:
                data=request.get_json()
                for attr, value in data.items():
                    setattr(area, attr, value)
                db.session.add(area)
                db.session.commit()
                return make_response(area.to_dict(), 202)
            except ValueError:
                return make_response({'error': ['validation errors']}, 400)
        else:
            return make_response(jsonify({'error': 'ConventionArea not found'}), 404)

    def delete(self, id):
        area = db.session.get(ConventionArea, id)
        if area:
            db.session.delete(area)
            db.session.commit()
            return '', 204
        return {'error': 'ConventionArea not found'}, 404

api.add_resource(ConventionAreasById, '/convention_areas/<int:id>')

class Hosts(Resource):
    def get(self):
        convention_id = request.args.get('convention_id', type=int)
        if convention_id:
            conventions = Convention.query.filter_by(id=convention_id).all()
            hosts = [convention.host_company for convention in conventions if convention.host_company is not None]
        else:
            hosts = HostCompany.query.all()
        return [host.to_dict(only=('id', 'name', 'industry')) for host in hosts]

    def post(self):
        data = request.get_json()
        try:
            new_host = HostCompany(
                name=data['name'],
                industry=data['industry']
            )
            db.session.add("new_host")
            db.session.commit()

            convention = convention.query.get(data['convention_id'])
            if convention:
                convention.host_company_id = new_host.id
                db.session.commit()

            return make_response(new_host.to_dict(), 201)
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)

api.add_resource(Hosts, '/hosts')

class HostCompaniesById(Resource):
    def get(self, id):
        host = db.session.get(HostCompany, id)
        if host:
            return host.to_dict(), 200
        return {'error': 'HostCompany not found'}, 404

    def patch(self, id):
        host = HostCompany.query.filter_by(id=id).first()
        if host:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(host, attr, data[attr])
                db.session.add(host)
                db.session.commit()
                return make_response(host.to_dict(), 202)
            except ValueError:
                return make_response({'errors': ['validation errors']}, 400)
        else:
            return make_response(jsonify({'error': 'HostCompany not found'}), 404)

    def delete(self, id):
        host = db.session.get(HostCompany, id)
        if host:
            db.session.delete(host)
            db.session.commit()
            return '', 204
        return {'error': 'HostCompany not found'}, 404

api.add_resource(HostCompaniesById, '/hosts/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

