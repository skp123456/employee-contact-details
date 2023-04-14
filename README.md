## Employee Contact Details

Given two files app.js and a database file employeeContactDetails.db consisting table employee_contact_details.

Written APIs to perform operations on the table employee_contact_details containing the following columns,

## Employee Contact Details Table

Column | Type
emp_id| INTEGER
emp_full_name| VARCHAR(250)
job_title| TEXT
phone_number | INTEGER
email| TEXT
address| TEXT
primary_emergency_contact| VARCHAR(250)
primary_phone_number| INTEGER
relationship| TEXT
secondary_emergency_contact| VARCHAR(250)
secondary_phone_number| INTEGER
secondary_relationship| TEXT

### API 1

Path: /create-employee/
Method: POST
Description: Create employee contact details in the employee_contact_details table.

### Request

{
"empId":6,
"empFullName":"Rakesh Sharma",
"jobTitle":"Data Engineer",
"phoneNumber":9991245216,
"email":"rakesh@gmail.com",
"address":"Ghantaghar, Gonda, Uttar Pradesh",
"primaryEmergencyContact":"Anil Sharma",
"primaryPhoneNumber":9935245216,
"relationship":"Father",
"secondaryEmergencyContact":"Akash Yadav",
"secondaryPhoneNumber":9935245258,
"secondaryRelationship":"Friend"
}

## Response

Employee Contact Details Created Successfully!.

## API 2

Path: /employee/
Method: GET

## Response

Returns the list of employee with pagination.

## API 3

Path: /update-employee/:empId/
Method: PUT
Description: Updates the details of a specific employee based on the employee ID.

## Request

{
"empFullName":"Rakesh Singh",
"jobTitle":"Data Analyst",
"phoneNumber":9991245254,
"email":"rakesh@gmail.com",
"address":"12,Ghantaghar, Gonda, Uttar Pradesh",
"primaryEmergencyContact":"Anil Singh",
"primaryPhoneNumber":9935245254,
"relationship":"Father",
"secondaryEmergencyContact":"Ajay Yadav",
"secondaryPhoneNumber":9935245298,
"secondaryRelationship":"Friend"
}

## Response

Employee Contact Details Updated!.

## API 4

Path: /delete-employee/:empId/
Method: DELETE
Description: Deletes the details of a specific employee based on the employee ID.

## Response

Employee Details Removed!.

## API 5

Path: /employee/:empId/
Method: GET

## Response

Returns a specific employee details based on the employee Id.
