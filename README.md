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

## Architecture

The project consists of the core app written in NestJS, haproxy as load balancer, postgresql as database and redis as a transport mechanism for events.

Haproxy configuration forces a client to be connected to same Nestapp instance over a long duration to preserve socket connection.

### Example flow of the Events

- When a user login to system, Auth module fires a local event, 'LOCAL-user-login'.
- This event is then handled by Message module to propagate this event to Message Broker ( REDIS ), hence the other Nestapp instances.
- Message module then handles the event received from REDIS and fires another local event, 'GLOBAL-user-login'.
- 'LOCAL-* ' events are fired within the Nestapp instanced that actually performs the action ( the server user logged in ), whereas 'GLOBAL-* ' action is fired within all Nestapp instances. The flow of events ensure that the system acts as one instance for the client and horizontally scalable.
