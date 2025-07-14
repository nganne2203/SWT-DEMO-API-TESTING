# Employee Management API - Swagger Documentation

## Overview
This Spring Boot application provides REST APIs for managing employees with Swagger/OpenAPI documentation.

## Swagger Documentation URLs

After starting the application, you can access the Swagger documentation at:

### Swagger UI (Interactive Documentation)
```
http://localhost:8080/swagger-ui.html
```

### OpenAPI JSON Documentation
```
http://localhost:8080/api-docs
```

## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## How to Run

1. Make sure MySQL is running on localhost:3306
2. Create a database named `demo`
3. Update database credentials in `application.properties` if needed
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```cmd
   .\mvnw.cmd spring-boot:run
   ```

## Swagger Features

- **Interactive API Testing**: Test all endpoints directly from the Swagger UI
- **Request/Response Examples**: See example data for all API calls
- **Schema Validation**: Automatic validation of request/response schemas
- **Authentication**: Ready for API key or OAuth integration
- **Export Options**: Download OpenAPI specification in JSON/YAML format

## Employee Data Model

```json
{
  "id": 1,
  "name": "John Doe",
  "address": "123 Main Street, City, State",
  "email": "john.doe@example.com"
}
```

## Configuration

Swagger configuration can be customized in:
- `src/main/java/com/example/demo/config/SwaggerConfig.java`
- `src/main/resources/application.properties`

## Dependencies Added

- `springdoc-openapi-starter-webmvc-ui` v2.2.0
