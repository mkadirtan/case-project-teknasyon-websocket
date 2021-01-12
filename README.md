## Start

Run `docker-compose up` to start project.

Once the initialization is complete, go to your browser:

- Navigate to `localhost:8080/index.html`
- Register by filling the fields.
- Responses from the server are logged in to console. Please leave your console open.
- Once you've successfully registered, you can go to Login page.
- After you have logged in, you are automatically connected to Socket/Gateway.

### Gateway Events

These are the events you can receive from the Gateway:

```markdown
- "user-register" : user: UserDetailsDto
- "user-login" : user: UserDetailDto
- "user-logout" : email: userEmail
```

### API Endpoints

```markdown
// user module

- /user/me : Return detailed information about user.
- /user/active-users : Return list of users that has active socket connection with server.

// auth module

- /auth/register : Registration
- /auth/login : Authentication

```

