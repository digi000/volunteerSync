from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .home.home import home
from .auth.auth import auth
from .models import db

app = Flask(__name__)

# to be changed in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/volunteersync'
app.config['SECRET_KEY'] = '06590f8280472984b11a15eb1241b7a2ff71be2f13c6ba72870d8c7ffc2517ae'

db.init_app(app)

app.register_blueprint(home)
app.register_blueprint(auth)
