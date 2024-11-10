# COMP 584 Project Documentation

## 1. Server-side ([ASP.NET/C#](https://dotnet.microsoft.com/apps/aspnet))

- Use [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core with MVC architecture
- Set up two models in the Azure database with a one-to-many relationship using Entity Framework Core (ORM)
- Create controllers to manage requests for these models

## 2. Client-side (Angular)

- Build a Single Page Application (SPA) using Angular. Ensure navigation occurs without full-page reloads
- Use services to communicate with your [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) API

---

# Project Requirements for B or Above

## 1. Implement Single Page Application

- Tool: Angular (Frontend framework for building the SPA)
- Implement client-side routing using Angular Router
- Fetch data from your server API and display it without refreshing the page

## 2. Use Model-View-Controller

- Ensure your server follows the MVC pattern:
    - Model: Represents the Azure database schema
    - View: Serves front-end templates or SPA assets
    - Controller: Handles HTTP requests and interacts with models

## 3. Object-Relational Mapping (ORM)

- Tool: Entity Framework (For Azure database management and one-to-many relationships)
- Use Entity Framework Core to map your C# models to the Azure database
- Set up the Azure database context and ensure migrations are in place
- Create two tables with a one-to-many relationship

## 4. Authentication

- Tool: Google SSO (via Firebase Authentication) for Single Sign-On
- Tool: Duo for Multi-Factor Authentication (MFA)
- Allow users to register, log in, and manage their sessions securely

## 5. Deployment

- Frontend: Use Firebase Hosting (Free tier available for hosting Angular applications)
- Backend: Deploy to AWS (Using free tier for hosting the [ASP.NET/C#](https://dotnet.microsoft.com/apps/aspnet) application)
- Ensure both the front-end and back-end are deployed and communicate effectively

---

# Optional Requirements - A Grade

## 6. Authorization

- Tool: Implement role-based access control (RBAC) using [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Identity or Firebase

## 7. Complex Data Entry (Reactive Forms)

- Tool: Angular Reactive Forms (For form handling and validation)

## 8. Server-Initiated Communications (SignalR)

- Tool: SignalR (For real-time communication between frontend and backend)

## 9. Unit Testing

- Frontend: Jasmine (Testing framework for Angular)
- Backend: xUnit (Unit testing framework for [ASP.NET](https://dotnet.microsoft.com/apps/aspnet))

## 10. Third-Party Identity Providers

- Tool: Google (via Firebase Authentication) as your third-party identity provider