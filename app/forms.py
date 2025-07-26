from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo, ValidationError
from .models import Organizations

class OrganizationRegistrationForm(FlaskForm):
    name = StringField('Organization Name', 
                      validators=[DataRequired(), Length(max=45)])
    email = StringField('Email', 
                       validators=[DataRequired(), Email(), Length(max=255)])
    address = StringField('Address', 
                         validators=[DataRequired(), Length(max=45)])
    telephone = StringField('Phone Number', 
                           validators=[DataRequired(), Length(min=10, max=10)])
    password = PasswordField('Password', 
                            validators=[DataRequired(), Length(min=8)])
    confirm_password = PasswordField('Confirm Password', 
                                   validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register Organization')

    def validate_email(self, field):
        if Organizations.query.filter_by(email=field.data.lower().strip()).first():
            raise ValidationError('Email already registered')