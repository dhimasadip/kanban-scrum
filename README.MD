# Kanban App
My Kanban App is an application to create a visual system for managing work or task as it moves through a process. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Register new account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<name>"
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (201 - Created)_
```
{
    "id": <user id>,
    "email": "<user email>",
    "name": "<user name>",
    "organization": "<user organization>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name can't be empty. Name must be 2-30 characters. Email can't be empty. Wrong email format. Password can't be empty. Password must be 8-20 characters"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### POST /login

> Login 

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (200 - OK)_
```
{
    "id": <user id>,
    "name": "<user name>",
    "email": "<user email>",
    "access_token": "<access token>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Incorrect password"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Email not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### POST /google-sign-in

> Login using google account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "id_token": "<id_token>"
}
```

_Response (200 - OK)_
```
{
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<access token>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### GET /tasks

> List task

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
[
    {
        "id": <task id>,
        "title": "<task title>",
        "category": "<task category>",
        "description": "<task description>",
        "due_date": "<task due date>",
        "createdAt": "<task created datetime>",
        "updatedAt": "<task updated datetime>",
        "UserId": <user id>,
        "User": {
            "id": <user id>,
            "name": "<name>",
            "email": "<email>",
            "organization": "<user organization>",
        }
    }
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### POST /tasks

> Add new task

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "title": "<task title>",
    "category": "<task category>",
    "description": "<task description>",
    "due_date": "<task due date>"
}
```

_Response (201 - Created)_
```
{
    "id": "<task id>",
    "title": "<task title>",
    "category": "<task category>",
    "description": "<task description>",
    "due_date": "<task due date>",
    "UserId": <user id>,
    "createdAt": "<task created datetime>",
    "updatedAt": "<task updated datetime>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Title can't be empty. Please input due date. Due date must be today or after"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### GET /tasks/:id

> Get task data by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": "<task id>",
    "title": "<task title>",
    "category": "<task category>",
    "description": "<task description>",
    "due_date": "<task due date>",
    "UserId": <user id>,
    "createdAt": "<task created datetime>",
    "updatedAt": "<task updated datetime>",
    "User": {
        "id": <user id>,
        "name": "<user name>",
        "email": "<user email>",
        "organization": "<user organization>",
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### PUT /tasks/:id

> Edit task data by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "category": "<task category>"
}
```

_Response (200 - OK)_
```
{
    "id": "<task id>",
    "title": "<task title>",
    "category": "<task category>",
    "description": "<task description>",
    "due_date": "<task due date>",
    "UserId": <user id>,
    "createdAt": "<task created datetime>",
    "updatedAt": "<task updated datetime>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal server error"
}
```


---
### DELETE /tasks/:id

> Delete task from database by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Successfully delete task"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```