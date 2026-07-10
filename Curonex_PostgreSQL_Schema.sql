-- CURONEX PostgreSQL Schema
-- Integrated Healthcare Database

CREATE TABLE roles (
 role_id SERIAL PRIMARY KEY,
 role_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE users (
 user_id BIGSERIAL PRIMARY KEY,
 role_id INT REFERENCES roles(role_id),
 first_name VARCHAR(100) NOT NULL,
 last_name VARCHAR(100),
 gender VARCHAR(20),
 dob DATE,
 phone VARCHAR(20) UNIQUE,
 email VARCHAR(150) UNIQUE NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 address TEXT,
 city VARCHAR(100),
 state VARCHAR(100),
 pincode VARCHAR(10),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospitals(
 hospital_id BIGSERIAL PRIMARY KEY,
 hospital_name VARCHAR(150) NOT NULL,
 address TEXT,
 city VARCHAR(100),
 state VARCHAR(100),
 pincode VARCHAR(10),
 phone VARCHAR(20),
 email VARCHAR(150),
 latitude DECIMAL(10,8),
 longitude DECIMAL(11,8)
);

CREATE TABLE departments(
 department_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 department_name VARCHAR(100)
);

CREATE TABLE doctors(
 doctor_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT UNIQUE REFERENCES users(user_id),
 department_id BIGINT REFERENCES departments(department_id),
 specialization VARCHAR(100),
 qualification VARCHAR(150),
 experience_years INT,
 consultation_fee NUMERIC(10,2)
);

CREATE TABLE doctor_hospital(
 doctor_hospital_id BIGSERIAL PRIMARY KEY,
 doctor_id BIGINT REFERENCES doctors(doctor_id),
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 UNIQUE(doctor_id,hospital_id)
);

CREATE TABLE doctor_availability(
 availability_id BIGSERIAL PRIMARY KEY,
 doctor_hospital_id BIGINT REFERENCES doctor_hospital(doctor_hospital_id),
 available_date DATE,
 start_time TIME,
 end_time TIME,
 status VARCHAR(20)
);

CREATE TABLE hospital_admin(
 hospital_admin_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT UNIQUE REFERENCES users(user_id),
 hospital_id BIGINT REFERENCES hospitals(hospital_id)
);

CREATE TABLE appointments(
 appointment_id BIGSERIAL PRIMARY KEY,
 patient_id BIGINT REFERENCES users(user_id),
 doctor_hospital_id BIGINT REFERENCES doctor_hospital(doctor_hospital_id),
 appointment_date DATE,
 slot_time TIME,
 status VARCHAR(30),
 reason TEXT,
 booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointment_cancellation(
 cancellation_id BIGSERIAL PRIMARY KEY,
 appointment_id BIGINT UNIQUE REFERENCES appointments(appointment_id),
 cancelled_by BIGINT REFERENCES users(user_id),
 reason TEXT,
 cancelled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE icu_beds(
 icu_bed_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 total_beds INT,
 available_beds INT,
 last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ambulance(
 ambulance_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 vehicle_number VARCHAR(30),
 status VARCHAR(20)
);

CREATE TABLE ambulance_operator(
 operator_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT UNIQUE REFERENCES users(user_id),
 ambulance_id BIGINT REFERENCES ambulance(ambulance_id)
);

CREATE TABLE emergency_request(
 emergency_request_id BIGSERIAL PRIMARY KEY,
 patient_id BIGINT REFERENCES users(user_id),
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 ambulance_id BIGINT REFERENCES ambulance(ambulance_id),
 request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 emergency_type VARCHAR(100),
 status VARCHAR(30)
);

CREATE TABLE hospital_notification(
 notification_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 operator_id BIGINT REFERENCES ambulance_operator(operator_id),
 message TEXT,
 status VARCHAR(20),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pharmacy(
 pharmacy_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 pharmacy_name VARCHAR(150),
 pharmacy_type VARCHAR(20),
 address TEXT,
 latitude DECIMAL(10,8),
 longitude DECIMAL(11,8)
);

CREATE TABLE pharmacy_admin(
 pharmacy_admin_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT UNIQUE REFERENCES users(user_id),
 pharmacy_id BIGINT REFERENCES pharmacy(pharmacy_id)
);

CREATE TABLE medicine(
 medicine_id BIGSERIAL PRIMARY KEY,
 medicine_name VARCHAR(150),
 generic_name VARCHAR(150),
 requires_prescription BOOLEAN
);

CREATE TABLE prescription(
 prescription_id BIGSERIAL PRIMARY KEY,
 appointment_id BIGINT UNIQUE REFERENCES appointments(appointment_id),
 prescription_date DATE
);

CREATE TABLE prescription_item(
 prescription_item_id BIGSERIAL PRIMARY KEY,
 prescription_id BIGINT REFERENCES prescription(prescription_id),
 medicine_id BIGINT REFERENCES medicine(medicine_id),
 quantity INT,
 dosage VARCHAR(50)
);

CREATE TABLE medicine_order(
 order_id BIGSERIAL PRIMARY KEY,
 prescription_id BIGINT REFERENCES prescription(prescription_id),
 patient_id BIGINT REFERENCES users(user_id),
 pharmacy_id BIGINT REFERENCES pharmacy(pharmacy_id),
 total_amount NUMERIC(10,2),
 order_status VARCHAR(30),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item(
 order_item_id BIGSERIAL PRIMARY KEY,
 order_id BIGINT REFERENCES medicine_order(order_id),
 medicine_id BIGINT REFERENCES medicine(medicine_id),
 quantity INT,
 price NUMERIC(10,2)
);

CREATE TABLE delivery_partner(
 delivery_partner_id BIGSERIAL PRIMARY KEY,
 partner_name VARCHAR(150),
 phone VARCHAR(20)
);

CREATE TABLE delivery(
 delivery_id BIGSERIAL PRIMARY KEY,
 order_id BIGINT UNIQUE REFERENCES medicine_order(order_id),
 delivery_partner_id BIGINT REFERENCES delivery_partner(delivery_partner_id),
 delivery_status VARCHAR(30),
 delivered_at TIMESTAMP
);

CREATE TABLE feedback(
 feedback_id BIGSERIAL PRIMARY KEY,
 order_id BIGINT REFERENCES medicine_order(order_id),
 patient_id BIGINT REFERENCES users(user_id),
 rating INT CHECK (rating BETWEEN 1 AND 5),
 review TEXT
);

CREATE TABLE medical_camp(
 camp_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 camp_name VARCHAR(150),
 camp_type VARCHAR(100),
 city VARCHAR(100),
 address TEXT,
 camp_date DATE,
 start_time TIME,
 end_time TIME,
 total_slots INT,
 description TEXT
);

CREATE TABLE camp_registration(
 registration_id BIGSERIAL PRIMARY KEY,
 camp_id BIGINT REFERENCES medical_camp(camp_id),
 patient_id BIGINT REFERENCES users(user_id),
 registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 status VARCHAR(30)
);

CREATE TABLE camp_report(
 report_id BIGSERIAL PRIMARY KEY,
 camp_id BIGINT UNIQUE REFERENCES medical_camp(camp_id),
 total_registrations INT,
 total_consultations INT,
 followup_cases INT
);

CREATE TABLE resource(
 resource_id BIGSERIAL PRIMARY KEY,
 resource_name VARCHAR(150),
 category VARCHAR(100),
 unit VARCHAR(50),
 supplier VARCHAR(150),
 batch_number VARCHAR(100),
 manufacture_date DATE,
 expiry_date DATE
);

CREATE TABLE hospital_inventory(
 inventory_id BIGSERIAL PRIMARY KEY,
 hospital_id BIGINT REFERENCES hospitals(hospital_id),
 resource_id BIGINT REFERENCES resource(resource_id),
 quantity INT,
 availability_status VARCHAR(30)
);

CREATE TABLE resource_transfer(
 transfer_id BIGSERIAL PRIMARY KEY,
 resource_id BIGINT REFERENCES resource(resource_id),
 source_hospital_id BIGINT REFERENCES hospitals(hospital_id),
 destination_hospital_id BIGINT REFERENCES hospitals(hospital_id),
 quantity INT,
 transfer_date TIMESTAMP,
 transfer_status VARCHAR(30)
);

CREATE TABLE notifications(
 notification_id BIGSERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(user_id),
 title VARCHAR(150),
 message TEXT,
 is_read BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
