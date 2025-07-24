from . import db

class Organizations(db.model):
    __tablename__ = 'organizations'
    id = db.column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    address = db.Column(db.String(45), nullable=False)
    telephone = db.Column(db.String(10))
    password = db.Column(db.String(70), nullable=False)
    adminsters = db.relationship('Adminsters', backref='organization', cascade='all, delete', lazy=True)
    volunteers = db.relationship('Volunteers', backref='organization', cascade='all, delete', lazy=True)

class Adminsters(db.model):
    __tablename__ = 'adminsters'
    id = db.Column(db.Integer, primary_key=True)
    frist_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    telephone = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(45), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id', ondelete='CASCADE'), nullable=False)
    password = db.Column(db.String(70), nullable=False)
    skills = db.Column(db.JSON)
    emergency_contact = db.Column(db.String(10))
    volunteers = db.relationship('Volunteers', backref='adminster', cascade='all, delete', lazy=True)
    events = db.relationship('Events', backref='adminster', cascade='all, delete', lazy=True)

class Volunteers(db.model):
    __tablename__ = 'volunteers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=True)
    last_name = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(255), nullable=False)
    telephone = db.Column(db.String(10), nullable=False)
    skills = db.Column(db.JSON, nullable=False)
    emergency_contact = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(45), nullable=False)
    password = db.Column(db.String(70), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id', ondelete='CASCADE'))
    adminster_id = db.Column(db.Integer, db.ForeignKey('adminsters.id', ondelete='CASCADE'))
    hour_logs = db.relationship('Hour_logs', backref="volunteer", cascade='all, delete', lazy=True)

class Events(db.model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(string(70), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    timezone = db.Column(db.String(5), nullable=False)
    location = db.Column(db.String(45), nullable = False)
    min_volunteers = db.Column(db.Integer, nullable=False)
    max_volunteers = db.Column(db.Integer, nullable=False)
    required_skills = db.Column(db.JSON, nullable=False)
    status = db.Column(db.Enum('Draft', 'Active', 'Cancelled', 'Completed', name='status_enum'), nullable=False, deflaut='Draft')
    tasks = db.Column(db.JSON, nullable=False)
    adminsters_id = db.Column(db.Integer, db.ForeignKey('adminsters.id', ondelete='CASCADE'), nullable=False)
    hour_logs = db.relationship('Hour_logs', backref="event", cascade='all, delete', lazy=True)

class Hour_ogs(db.model):
    __tablename__ = 'hour_logs'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    total_hours = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('Pending','Approved','Rejected'), nullable=False, default='Pending')
    verified_by = db.Column(db.String(45), nullable=False)
    verified_at = db.Column(db.Time, nullable=False)
    volunteer_id = db.Column(db.Integer, db.Foreignkey('volunteers.id', ondelete='CASCADE'), nullable=False)
    event_id = db.Column(db.Integer, db.Foreignkey('events.id', ondelete='CASCADE'), nullable=False)
