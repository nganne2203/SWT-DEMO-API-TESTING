const assert = require('assert'); // assert is a library used for making assertations in tests
const axios = require('axios'); // axios is a promise based HTTP client for the browser and node.js

Feature('employee'); // the high-level description of the feature --> this is the feature file

const timestamp = Date.now(); // get the current timestamp

// Define the employee data with a unique email using the timestamp
// This ensures that each test run has a unique email address
const employeeData = {
    name: 'john doe',
    address: '123 main street',
    email: `john.doe${timestamp}@example.com`
};

// the variable to store the created employee id during the test
let createdEmployeeId: number;

// hook to run before each test
Before( async ( { I } ) => {
    // wait for the server to start
    let retries = 5; // number of retries
    // we will try to connect to the server 5 times before giving up
    while (retries > 0){
        try {
            await axios.get('http://localhost:8080/api/employees') // replace with your server URL, e.g., 'http://localhost:3000/api/health'
            // click to the codeceptjs conf --> you can find the server URL in the endpoint property of the REST helper
            // why we need to have employees endpoint? because we want to make sure that the server is up and running before we start the tests
            break;
        } catch (error){
            retries --;
            if (retries === 0) throw new Error ('Server not ready start after 5 times');
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
        }
    }

    // we try to create an employee before each test
    // Create a Test Employee to test connection
    try {
        const response = await I.sendPostRequest('/api/employees', employeeData); // why have we used I.sendPostRequest?
        // because we want to send a POST request to the server to create an employee
        // the endpoint is defined in the REST helper in the codecept.conf.ts file
        // employee endpoint is '/employees' and we are sending the employeeData as the request body
        // in controller we have defined the endpoint to create an employee
        assert.equal(response.status, 201); // check if the response status is 201 (Created)
        // 201 is expected status code for a successful POST request
        // response.status is the HTTP status code of the response
        // assert.equal is used to check if the response status is equal to 201
        createdEmployeeId = response.data.id; // store the created employee id for later use
    } catch (error){
        console.log('Failed to create test employee: ', error.message);
        throw error;
    }
});

// Define the after hook to clean up the created employee after each test
After ( async ( { I } ) => {
    // clean up the created employee after each test
    if (createdEmployeeId) {
        try {
            const response = await I.sendDeleteRequest(`/api/employees/${createdEmployeeId}`); // send a DELETE request to the server to delete the employee
            assert.equal(response.status, 200); // check if the response status is 204 (No Content)
            // 204 is expected status code for a successful DELETE request
        } catch (error) {
            console.log('Failed to delete test employee: ', error.message);
            throw error;
        }
    }
});


// define the test scenarios
// first test scenario to create an employee
// the structure of the test is as follows:
// Scenario('Name of the test', async ({ I }) => {
// // Arrange: prepare data
// // Act: send request or perform action
// // Assert: check result
// });

// Scenario(...): Defines a test scenario. This is a "unit test" in CodeceptJS.
// Test name: A string describing the test, letting you know its purpose.
// first test case is create an employee
Scenario('Create Employee',  async ({ I }) => {
    const newEmployeeData = {
        name: 'Jane Doe',
        address: '456 Elm Street',
        email: `jane.doe.${timestamp}@example.com`
    };
    const response = await I.sendPostRequest('/api/employees', newEmployeeData); // send a POST request to create a new employee
    assert.equal(response.status, 201); // check if the response status is 201 (Created)
    assert.equal(response.data.name, newEmployeeData.name); // check if the name of the created employee is equal to the name we sent
    assert.equal(response.data.address, newEmployeeData.address); // check if the address of the created employee is equal to the address we sent
    assert.equal(response.data.email, newEmployeeData.email); // check if the email of the created employee is equal to the email we sent
});

// we done to create a test case to create an employee
// before running the test, make sure that the server is running and the endpoint is correct
// click to codecept.conf.ts file to add some configuration if needed


// second test case is to get an employee by id
Scenario ('Get Employee by ID', async ({ I }) => {
   const response = await I.sendGetRequest(`/api/employees/${createdEmployeeId}`); // send a GET request to get the employee by id
    assert.equal(response.status, 200); // check if the response status is 200 (OK)
    assert.equal(response.data.id, createdEmployeeId);
    assert.equal(response.data.name, employeeData.name); // check if the name of the employee is equal to the name we sent
    assert.equal(response.data.address, employeeData.address); // check if the address of the employee is equal to the address we sent
    assert.equal(response.data.email, employeeData.email); // check if the email of the employee is equal to the email we sent
});


// third test case is get all employees

Scenario('Get All Employees', async ({ I }) => {
    // because we get all employees, so we need an array to store the employees
    const response = await I.sendGetRequest('/api/employees'); // send a GET request to get all employees
    assert.equal(response.status, 200); // check if the response status is 200 (OK)
    assert(Array.isArray(response.data));
    assert(response.data.length > 0); // check if the response data is an array and it has at least one employee
});

// fourth test case is to update an employee
Scenario ('Update Employee', async ({ I }) => {
   const updateEmployeeDate = {
         name: 'John Smith',
         address: '789 Oak Street',
         email: `johnsmith.updated.${timestamp}@example.com`
   };

   const response = await I.sendPutRequest(`/api/employees/${createdEmployeeId}`, updateEmployeeDate); // send a PUT request to update the employee
    assert.equal(response.status, 200); // check if the response status is 200 (OK)
    assert.equal(response.data.name, updateEmployeeDate.name);
    assert.equal(response.data.address, updateEmployeeDate.address);
    assert.equal(response.data.email, updateEmployeeDate.email);
});

// fifth test case is to delete an employee
Scenario ('Delete employee', async ({ I })=> {

    const createEmployee = await I.sendPostRequest('/api/employees', {
        name: 'Delete Test Employee',
        address: '123 Delete Street',
        email: `delete.${timestamp}@gmail.com`
    });

    const createEmployeeId = createEmployee.data.id; // store the created employee id for later use

    // first to delete an employee, we need to verify that the employee exists
    const response = await I.sendGetRequest(`/api/employees/${createEmployeeId}`); // send a DELETE request to delete the employee
    assert.equal(response.status, 200);

    const deleteResponse = await I.sendDeleteRequest(`/api/employees/${createEmployeeId}`); // send a GET request to get the employee by id
    assert.equal(deleteResponse.status, 200);
    assert.equal(deleteResponse.data, 'Employee deleted successfully!'); // check if the response data is equal to 'Employee deleted successfully')


    // now we try to get the employee by id to verify that the employee is deleted
    const getResponse = await I.sendGetRequest(`/api/employees/${createEmployeeId}`);
    assert.equal(getResponse.status, 404); // check if the response status is 404 (Not Found)
    assert.equal(getResponse.data.error, 'Not Found'); // check if the response data is equal to 'Not found'
    assert.equal(getResponse.data.path, `/api/employees/${createEmployeeId}`); // check if the path is equal to the employee id we tried to delete

    // fail test case sometime the issue is the message in expected value
    // is not equal to the actual value (the message in the response)
    // so we need to make sure that the message in the response is equal to the expected value
    // this test case is to test the delete employee functionality
    // fail hook because we try to get the employee by id after deleting it
    // to solve this issue, we need to create an employee before running the test
    //hook is a function that runs before and after a test to test connection to the server
});


// the next test case is to test get employee by id with invalid id
Scenario ('Get Employee by ID with Invalid ID', async ({ I }) => {
   const invalidId = 99999; // assuming this ID does not exist
    const response = await I.sendGetRequest(`/api/employees/${invalidId}`);
    assert.equal(response.status, 404); // check if the response status is 404 (Not Found)
    assert.equal(response.data.error, 'Not Found'); // check if the response data is equal to 'Not found'
});

// the last test case is to test create employee with missing fields
// (email - because it is required field, is unique)
Scenario('Create Employee with Missing Fields', async ({ I }) => {
   const invalidEmployeeData = {
        name: 'Invalid Employee',
        address: '123 Invalid Street'
        // email is missing
    };

    const response = await I.sendPostRequest('/api/employees', invalidEmployeeData);
    assert.equal(response.status, 400); // check if the response status is 400 (Bad Request)
    assert(response.data.error);
});


// fail test case it mean code do not handle the error properly
// to fix the issue, we need to make sure that the code is handling the error properly
// for example, using validation dependency like express-validator to validate the request body
// 500 is the status code for internal server error
// because the code try to access a property of undefined or null
// let handle the error properly in the code
// and test again

// restart application, test again

// so all test cases are passed
// this is the end of the test file
// you can run the test using the command: npx codeceptjs run --steps
// this will run the test and show the steps in the console
// thank you for watching the video demo for API testing with CodeceptJS
// you can find the code in the GitHub repository:
// hope you enjoyed the video and learned something new
