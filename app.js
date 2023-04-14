const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "employeeContactDetails.db");

let db = null;

//Initializing database and server

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//Create employee API

app.post("/create-employee/", async (request, response) => {
  const employeeDetails = request.body;
  const {
    empId,
    empFullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    primaryEmergencyContact,
    primaryPhoneNumber,
    relationship,
    secondaryEmergencyContact,
    secondaryPhoneNumber,
    secondaryRelationship,
  } = employeeDetails;

  const createEmployeeQuery = `
  INSERT INTO employee_contact_details
  (emp_id,emp_full_name,job_title,phone_number,email,address,primary_emergency_contact,primary_phone_number,relationship,secondary_emergency_contact,secondary_phone_number,secondary_relationship)
  VALUES
  (
    ${empId},
    '${empFullName}',
    '${jobTitle}',
    ${phoneNumber},
    '${email}',
    '${address}',
    '${primaryEmergencyContact}',
    ${primaryPhoneNumber},
    '${relationship}',
    '${secondaryEmergencyContact}',
    ${secondaryPhoneNumber},
    '${secondaryRelationship}'
  );
 `;
  await db.run(createEmployeeQuery);
  response.send("Employee Contact Details Created Successfully!");
});

//Get list of employee with pagination

app.get("/employee/", async (request, response) => {
  const { limit, offset } = request.query;
  const getEmployeeListQuery = `
        SELECT *
        FROM employee_contact_details
        LIMIT ${limit}
        OFFSET ${offset};
    `;
  const employeeList = await db.all(getEmployeeListQuery);
  response.send(employeeList);
});

//Update employee API

app.put("/update-employee/:empId/", async (request, response) => {
  const { empId } = request.params;
  const employeeDetails = request.body;
  const {
    empFullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    primaryEmergencyContact,
    primaryPhoneNumber,
    relationship,
    secondaryEmergencyContact,
    secondaryPhoneNumber,
    secondaryRelationship,
  } = employeeDetails;

  const updateEmployeeDetailsQuery = `
        UPDATE employee_contact_details
        SET
        emp_full_name = '${empFullName}',
        job_title = '${jobTitle}',
        phone_number = ${phoneNumber},
        email = '${email}',
        address = '${address}',
        primary_emergency_contact = '${primaryEmergencyContact}',
        primary_phone_number = ${primaryPhoneNumber},
        relationship = '${relationship}',
        secondary_emergency_contact = '${secondaryEmergencyContact}',
        secondary_phone_number = '${secondaryPhoneNumber}',
        secondary_relationship = '${secondaryRelationship}'
        WHERE 
        emp_id = ${empId};
    `;
  await db.run(updateEmployeeDetailsQuery);
  response.send("Employee Contact Details Updated!");
});

//Delete employee API

app.delete("/delete-employee/:empId/", async (request, response) => {
  const { empId } = request.params;
  const deleteEmployeeQuery = `
        DELETE
        FROM employee_contact_details
        WHERE
        emp_id = ${empId};
    `;
  await db.run(deleteEmployeeQuery);
  response.send("Employee Details Removed!");
});

// Get employee API

app.get("/employee/:empId/", async (request, response) => {
  const { empId } = request.params;
  const getEmployeeQuery = `
        SELECT *
        FROM employee_contact_details
        WHERE
        emp_id = ${empId};
    `;
  const employee = await db.get(getEmployeeQuery);
  response.send(employee);
});
