INSERT INTO department (department)
VALUES 
    ('Sales'), 
    ('Engineering'), 
    ('Legal'),
    ('Finance'),
    ('Marketing');


INSERT INTO role (title, salary, department_id)
VALUES 
  
    ('Sales Team Lead', 90000, 1),
    ('Salesperson', 43000, 1),
    ('Systems Engineer', 130000, 2), 
    ('Software Engineer', 110000, 2), 
    ('Legal Team Lead', 300000, 3),
    ('Lawyer', 200000, 3);
    ('CFO', 420000, 4),
    ('Accountant', 75000, 4), 
    ('Strategy Specialist', 150000, 5),
    ('Designer', 57000, 5),

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Thomas", "Walker", 4, null),
        ('Jan', 'Charleston', 1, null), 
        ('Rufus', 'Richards', 9, null), 
        ('Sam', 'Wu', 2, 5),
        ('Ikenna', 'Igbo', 7, null),
        ('Hadia', 'Akunsada', 10, 3)
