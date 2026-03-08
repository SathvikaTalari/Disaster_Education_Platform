-- Seed sample data for disaster management system

-- Insert sample users
INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES
('admin@university.edu', '$2b$10$example_hash', 'admin', 'System', 'Administrator'),
('faculty1@university.edu', '$2b$10$example_hash', 'faculty', 'Dr. Sarah', 'Johnson'),
('faculty2@university.edu', '$2b$10$example_hash', 'faculty', 'Prof. Michael', 'Chen'),
('student1@university.edu', '$2b$10$example_hash', 'student', 'Alice', 'Smith'),
('student2@university.edu', '$2b$10$example_hash', 'student', 'Bob', 'Wilson'),
('student3@university.edu', '$2b$10$example_hash', 'student', 'Carol', 'Davis')
ON CONFLICT (email) DO NOTHING;

-- Insert sample learning modules
INSERT INTO learning_modules (title, description, content_type, difficulty_level, estimated_duration, created_by, is_published) VALUES
('Fire Safety Fundamentals', 'Learn basic fire safety protocols and evacuation procedures', 'Interactive', 'Beginner', 30, 2, TRUE),
('Advanced Earthquake Response', 'Comprehensive earthquake preparedness and response strategies', 'Video + Quiz', 'Advanced', 60, 2, TRUE),
('First Aid Certification', 'Complete first aid training with hands-on practice', 'Simulation', 'Intermediate', 90, 3, TRUE),
('Flood Emergency Planning', 'Understanding flood risks and evacuation procedures', 'Interactive', 'Intermediate', 45, 2, TRUE),
('Emergency Communication Systems', 'Learn to use emergency communication tools effectively', 'Interactive', 'Beginner', 25, 3, FALSE);

-- Insert sample student progress
INSERT INTO student_progress (student_id, module_id, status, score, started_at, completed_at) VALUES
(4, 1, 'completed', 92, NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days'),
(4, 2, 'in_progress', NULL, NOW() - INTERVAL '2 days', NULL),
(4, 3, 'completed', 96, NOW() - INTERVAL '10 days', NOW() - INTERVAL '7 days'),
(5, 1, 'completed', 85, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days'),
(5, 2, 'completed', 78, NOW() - INTERVAL '8 days', NOW() - INTERVAL '5 days'),
(6, 1, 'in_progress', NULL, NOW() - INTERVAL '1 day', NULL);

-- Insert sample quizzes
INSERT INTO quizzes (module_id, title, description, time_limit, total_questions, passing_score, created_by) VALUES
(1, 'Fire Safety Assessment', 'Test your knowledge of fire safety protocols', 30, 20, 70, 2),
(2, 'Earthquake Preparedness Quiz', 'Assess your earthquake response knowledge', 25, 15, 75, 2),
(3, 'First Aid Certification Exam', 'Comprehensive first aid knowledge test', 45, 30, 80, 3),
(4, 'Flood Response Quiz', 'Test flood emergency procedures knowledge', 20, 12, 70, 2);

-- Insert sample quiz attempts
INSERT INTO quiz_attempts (quiz_id, student_id, score, started_at, completed_at, is_completed) VALUES
(1, 4, 92, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', TRUE),
(1, 5, 85, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', TRUE),
(2, 4, 88, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', TRUE),
(3, 4, 96, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', TRUE);

-- Insert sample virtual drills
INSERT INTO virtual_drills (title, description, drill_type, estimated_duration, created_by, is_active) VALUES
('Building Evacuation Simulation', 'Practice safe evacuation procedures in a virtual environment', 'VR Simulation', 20, 2, TRUE),
('Fire Extinguisher Training', 'Learn proper fire extinguisher usage techniques', 'Interactive', 15, 2, TRUE),
('Earthquake Drop-Cover-Hold Drill', 'Practice earthquake safety positions and procedures', 'AR Simulation', 10, 3, TRUE),
('CPR Training Session', 'Virtual CPR practice with real-time feedback', 'Simulation', 25, 3, TRUE);

-- Insert sample drill participation
INSERT INTO drill_participation (drill_id, student_id, score, completed_at, feedback) VALUES
(1, 4, 88, NOW() - INTERVAL '2 days', 'Good evacuation time, remember to check doors for heat'),
(2, 4, 94, NOW() - INTERVAL '5 days', 'Excellent technique with fire extinguisher'),
(1, 5, 82, NOW() - INTERVAL '1 day', 'Solid performance, could improve on route selection');

-- Insert sample regional alerts
INSERT INTO regional_alerts (title, message, alert_type, severity, region, is_active, created_by, expires_at) VALUES
('Severe Thunderstorm Warning', 'Severe thunderstorm expected in campus area. Seek indoor shelter immediately.', 'Weather', 'High', 'Campus Area', TRUE, 1, NOW() + INTERVAL '6 hours'),
('Fire Alarm System Test', 'Scheduled fire alarm testing in Building C from 2-4 PM today.', 'Maintenance', 'Low', 'Building C', TRUE, 1, NOW() + INTERVAL '2 hours'),
('Emergency Drill Notification', 'Campus-wide emergency drill scheduled for next Tuesday at 10 AM.', 'Training', 'Medium', 'All Buildings', TRUE, 1, NOW() + INTERVAL '5 days');

-- Insert sample emergency contacts
INSERT INTO emergency_contacts (name, phone_number, contact_type, description, is_active) VALUES
('Campus Security', '112', 'Emergency', 'For all emergency situations requiring immediate response', TRUE),
('Campus Health Center', '(555) 123-4567', 'Medical', 'Medical emergencies and health services', TRUE),
('Facilities Management', '(555) 123-4568', 'Maintenance', 'Building maintenance and facility issues', TRUE),
('Student Services', '(555) 123-4569', 'Support', 'Student support and counseling services', TRUE),
('Campus Safety Hotline', '(555) 123-4570', 'Safety', '24/7 safety concerns and non-emergency reporting', TRUE);

-- Insert sample system metrics
INSERT INTO system_metrics (metric_name, metric_value, metric_date) VALUES
('total_students_registered', 350, CURRENT_DATE),
('modules_completed_today', 23, CURRENT_DATE),
('average_quiz_score', 87.5, CURRENT_DATE),
('active_alerts', 3, CURRENT_DATE),
('drill_participation_rate', 78.5, CURRENT_DATE);
