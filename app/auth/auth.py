from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash
from ..models import Organizations
from ..forms import OrganizationRegistrationForm
from sqlalchemy.exc import IntegrityError

auth = Blueprint('auth', __name__)

@auth.route('/organization_login')
def organization_login():
    return render_template('auth/organization_login.html')

@auth.route('/volunteer_login')
def volunteer_login():
    return render_template('auth/volunteer_login.html')

@auth.route('/organization_register', methods=['GET', 'POST'])
def organization_register():
    from .. import db
    form = OrganizationRegistrationForm()
    
    print(f"Request method: {request.method}")
    print(f"Form submitted: {form.is_submitted()}")
    print(f"Form valid: {form.validate()}")
    print(f"Form errors: {form.errors}")
    
    if form.validate_on_submit():
        print("Form validation passed!")
        try:
            # Create new organization
            new_org = Organizations(
                name=form.name.data,
                email=form.email.data.lower().strip(),
                address=form.address.data,
                telephone=form.telephone.data,
                password=generate_password_hash(form.password.data)
            )
            
            db.session.add(new_org)
            db.session.commit()
            
            flash('Organization registered successfully! Please log in.', 'success')
            return redirect(url_for('auth.organization_login'))
            
        except IntegrityError:
            db.session.rollback()
            flash('Email already exists. Please use a different email.', 'error')
        except Exception as e:
            db.session.rollback()
            flash('An error occurred during registration. Please try again.', 'error')
            print(f"Exception: {e}")
    else:
        print("Form validation failed!")
    
    # Pass form errors to template
    for field, errors in form.errors.items():
        for error in errors:
            flash(f"{getattr(form, field).label.text}: {error}", 'error')
            print(f"Field error: {field} - {error}")
    
    return render_template('auth/organization_register.html', form=form)

@auth.route('/volunteer_register')
def volunteer_register():
    return render_template('auth/volunteer_register.html')
