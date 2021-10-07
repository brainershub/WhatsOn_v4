from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# def connections(app):
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/postgres'
#
#     return db