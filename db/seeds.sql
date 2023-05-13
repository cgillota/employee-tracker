INSERT INTO department(department_name) 
VALUES ('Sales'), 
       ('Engineering'),
       ('Finance'),
       ('Legal'); 

INSERT INTO role(title, salary, department)
VALUES ('Sales Lead', 100000, 1),
       ('Sales Person', 80000, 1), 
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2), 
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3), 
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4); 

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Princess', 'Carolyn', 1, null),
       ('BoJack', 'Horseman', 2, 1),
       ('Todd', 'Chavez', 3, null),
       ('Sarah', 'Lynn', 4, 3),
       ('Diane', 'Nguyen', 5, null),
       ('Mr.', 'Peanutbutter', 6, 5),
       ('Pinky', 'Penguin', 7, null),
       ('Herb', 'Kazzaz', 8, 7);       
