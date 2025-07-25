from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .home.home import home
from .auth.auth import auth

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/volunteersync'

db = SQLAlchemy(app)

app.register_blueprint(home)
app.register_blueprint(auth)
