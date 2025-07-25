from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/organization_login')
def organization_login():
    return render_template('auth/organization_login.html')

@auth.route('/volunteer_login')
def volunteer_login():
    return render_template('auth/volunteer_login.html')

@auth.route('/organization_register')
def organization_register():
    return render_template('auth/organization_register.html')

@auth.route('/volunteer_register')
def volunteer_register():
    return render_template('auth/volunteer_register.html')
