CREATE TABLE details (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    pincode VARCHAR(10),
    city VARCHAR(100),
    state VARCHAR(100)
);

CREATE TABLE credentials (
    id BIGINT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_credentials_details
        FOREIGN KEY (id) REFERENCES details(id)
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    gender VARCHAR(20),
    dob DATE,
    blood_group VARCHAR(5),
    CONSTRAINT fk_users_credentials
        FOREIGN KEY (id) REFERENCES credentials(id)
);

CREATE TABLE hospitals (
    id BIGINT PRIMARY KEY,
    license_no VARCHAR(100) UNIQUE NOT NULL,
    geo_address TEXT,
    total_icu_beds INTEGER,
    available_icu_beds INTEGER,
    facilities TEXT,
    CONSTRAINT fk_hospitals_credentials
        FOREIGN KEY (id) REFERENCES credentials(id),
    CONSTRAINT chk_icu_beds
        CHECK (
            total_icu_beds >= 0
            AND available_icu_beds >= 0
            AND available_icu_beds <= total_icu_beds
        )
);

CREATE TABLE pharmacies (
    id BIGINT PRIMARY KEY,
    license_no VARCHAR(100) UNIQUE NOT NULL,
    geo_address TEXT,
    status VARCHAR(30),
    hospital_id BIGINT,
    CONSTRAINT fk_pharmacies_credentials
        FOREIGN KEY (id) REFERENCES credentials(id),
    CONSTRAINT fk_pharmacies_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE delivery_partners (
    id BIGINT PRIMARY KEY,
    vehicle_number VARCHAR(20),
    status VARCHAR(30),
    license_no VARCHAR(100),
    rating NUMERIC(2,1),
    CONSTRAINT fk_delivery_credentials
        FOREIGN KEY (id) REFERENCES credentials(id),
    CONSTRAINT chk_delivery_rating
        CHECK (rating BETWEEN 0 AND 5)
);

CREATE TABLE doctors (
    id BIGINT PRIMARY KEY,
    license_no VARCHAR(100) UNIQUE NOT NULL,
    experience SMALLINT,
    specialization VARCHAR(100),
    CONSTRAINT fk_doctors_credentials
        FOREIGN KEY (id) REFERENCES credentials(id),
    CONSTRAINT chk_doctor_experience
        CHECK (experience >= 0)
);

CREATE TABLE doctor_schedules (
    schedule_id BIGSERIAL PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    hospital_id BIGINT NOT NULL,
    day_of_week SMALLINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_schedule_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    CONSTRAINT fk_schedule_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
    CONSTRAINT chk_day_of_week
        CHECK (day_of_week BETWEEN 1 AND 7),
    CONSTRAINT chk_schedule_time
        CHECK (start_time < end_time),
    CONSTRAINT uq_doctor_schedule
        UNIQUE (doctor_id, hospital_id, day_of_week, start_time, end_time)
);

CREATE TABLE appointments (
    appointment_id BIGSERIAL PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    hospital_id BIGINT NOT NULL,
    appointment_datetime TIMESTAMP NOT NULL,
    status VARCHAR(30),
    CONSTRAINT fk_appointment_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    CONSTRAINT fk_appointment_patient
        FOREIGN KEY (patient_id) REFERENCES users(id),
    CONSTRAINT fk_appointment_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE prescriptions (
    prescription_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    hospital_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    prescription_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prescription_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_prescription_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
    CONSTRAINT fk_prescription_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE medicines (
    medicine_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE prescription_medicines (
    prescription_id BIGINT,
    medicine_id BIGINT,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (prescription_id, medicine_id),
    CONSTRAINT fk_pm_prescription
        FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id),
    CONSTRAINT fk_pm_medicine
        FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id),
    CONSTRAINT chk_pm_quantity
        CHECK (quantity > 0)
);

CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    pharmacy_id BIGINT NOT NULL,
    delivery_partner_id BIGINT,
    user_id BIGINT NOT NULL,
    status VARCHAR(30),
    order_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10,2),
    CONSTRAINT fk_order_pharmacy
        FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id),
    CONSTRAINT fk_order_delivery_partner
        FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id),
    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT chk_order_amount
        CHECK (total_amount >= 0)
);

CREATE TABLE order_items (
    item_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    medicine_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_order_item_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_item_medicine
        FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id),
    CONSTRAINT chk_order_item_quantity
        CHECK (quantity > 0),
    CONSTRAINT chk_order_item_price
        CHECK (price >= 0),
    CONSTRAINT uq_order_medicine
        UNIQUE (order_id, medicine_id)
);

CREATE TABLE ambulances (
    ambulance_id BIGSERIAL PRIMARY KEY,
    vehicle_number VARCHAR(20) UNIQUE NOT NULL,
    license_no VARCHAR(100),
    status VARCHAR(30),
    hospital_id BIGINT,
    CONSTRAINT fk_ambulance_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE camps (
    camp_id BIGSERIAL PRIMARY KEY,
    camp_name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    specialization VARCHAR(100),
    camp_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    available_slots INTEGER,
    hospital_id BIGINT NOT NULL,
    address TEXT,
    camp_description TEXT,
    camp_banner VARCHAR(500),
    CONSTRAINT fk_camp_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
    CONSTRAINT chk_camp_time
        CHECK (start_time < end_time),
    CONSTRAINT chk_available_slots
        CHECK (available_slots >= 0)
);

CREATE TABLE camp_doctors (
    camp_id BIGINT,
    doctor_id BIGINT,
    PRIMARY KEY (camp_id, doctor_id),
    CONSTRAINT fk_camp_doctors_camp
        FOREIGN KEY (camp_id) REFERENCES camps(camp_id),
    CONSTRAINT fk_camp_doctors_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE camp_patient_forms (
    patient_form_id BIGSERIAL PRIMARY KEY,
    camp_id BIGINT NOT NULL,
    name VARCHAR(150),
    phone VARCHAR(20),
    age SMALLINT,
    gender VARCHAR(20),
    city VARCHAR(100),
    address TEXT,
    reason_for_camp TEXT,
    preferred_time TIME,
    alternate_contact VARCHAR(20),
    existing_conditions TEXT,
    chief_complaint TEXT,
    description TEXT,
    diagnosis TEXT,
    medical_reports TEXT,
    follow_up BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_patient_form_camp
        FOREIGN KEY (camp_id) REFERENCES camps(camp_id),
    CONSTRAINT chk_patient_age
        CHECK (age >= 0)
);

CREATE TABLE resources (
    resource_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    units VARCHAR(50),
    manufacturing_date DATE,
    expiry_date DATE,
    quantity INTEGER,
    availability_status VARCHAR(30),
    hospital_id BIGINT NOT NULL,
    CONSTRAINT fk_resource_hospital
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
    CONSTRAINT chk_resource_quantity
        CHECK (quantity >= 0),
    CONSTRAINT chk_resource_dates
        CHECK (
            expiry_date IS NULL
            OR manufacturing_date IS NULL
            OR expiry_date >= manufacturing_date
        )
);

CREATE TABLE resource_transfers (
    transfer_id BIGSERIAL PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    source_hospital_id BIGINT NOT NULL,
    destination_hospital_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transfer_status VARCHAR(30),
    CONSTRAINT fk_transfer_resource
        FOREIGN KEY (resource_id) REFERENCES resources(resource_id),
    CONSTRAINT fk_transfer_source_hospital
        FOREIGN KEY (source_hospital_id) REFERENCES hospitals(id),
    CONSTRAINT fk_transfer_destination_hospital
        FOREIGN KEY (destination_hospital_id) REFERENCES hospitals(id),
    CONSTRAINT chk_transfer_quantity
        CHECK (quantity > 0),
    CONSTRAINT chk_different_hospitals
        CHECK (source_hospital_id <> destination_hospital_id)
);
