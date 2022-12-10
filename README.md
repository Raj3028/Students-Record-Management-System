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
