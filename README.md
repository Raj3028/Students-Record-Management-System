## Project - Students Record Management System 

### Key points
- In this project Teacher Manages the  Students details means Teacher can add/update/get/delete the  Students details :
  1) We create it's model.
  2) We build it's APIs.
  3) We test these APIs.
  4) We deploy these APIs.
  5) We integrate these APIs with frontend.
  6) We will repeat steps from Step 1 to Step 5 until the Project is Completed

### Models
- Teacher Model
```yaml
{

    name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    }

}
```
- Students Model
```yaml
{

    teacherID: {
        type: ObjectId,
        ref: "Teacher",
        require: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: Number,
        required: true,
        trim: true
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }

}
```
## Teacher APIs 
### POST /teacherRegistration
- Create a Teacher 
- Create a Teacher document from request body.
- Return HTTP status 201 on a succesful user creation. Also return the user document.
- Return HTTP status 400 if no params or invalid params received in request body.

### POST /teacherIdLogin
- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, exp, iat.
- If the credentials are incorrect return a suitable error message with a valid HTTP status code.

## Student APIs
### POST /addStudentDetails/:userId
- Create a Student document from request body. use teacherId in params.
- Make sure the teacherId is a valid teacherId by checking the user exist in the teacher collection.
- Return HTTP status 201 on a succesful book creation. Also return the book document.
- Return HTTP status 400 for an invalid request

### PUT /updateMarks/:userId
- Update a Student by updating its marks
- The student and subject combination that
already exists in the database then include the marks in existing marks.
- otherwise, Return response  message This Student is not exist with this Subject. You have to create first.create a new student record.
- For example, You have a current record in the database
```yaml
{
 Name :  "Jhon" 
 Subject : "Maths"
 Marks : 75
 }
 ``` 
 - If we add the same data again
 ```yaml
 {
 Name :  "Jhon" 
 Subject : "Maths"
 Marks : 50
 }
 ```
 - Then the total should be 125

### GET /getDetails
- Returns all students in the collection that aren't deleted.
- Return the HTTP status 200 if any documents are found.
- If no documents are found then return an HTTP status 404 with a response.
- Filter students list by applying filters. Query param can have any combination of below filters.
  - By subject
  - By studentName



 

