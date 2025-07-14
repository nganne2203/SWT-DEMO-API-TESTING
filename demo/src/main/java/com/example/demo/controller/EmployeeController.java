package com.example.demo.controller;
import com.example.demo.dto.EmployeeDto;
import com.example.demo.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee Management", description = "Operations related to employee management")
public class EmployeeController {
    private EmployeeService employeeService;

    // Build Add Employee REST API
    @Operation(summary = "Create a new employee", description = "Create a new employee with the provided information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Employee created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json"))
    })
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(
            @Parameter(description = "Employee data to be created", required = true)
            @RequestBody @Valid EmployeeDto employeeDto){
        EmployeeDto saveEmployeeDto = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(saveEmployeeDto, HttpStatus.CREATED);
    }

    //Build Get Employee REST API
    @Operation(summary = "Get employee by ID", description = "Retrieve an employee by their unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDto.class))),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(
            @Parameter(description = "ID of the employee to retrieve", required = true)
            @PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Get All Employees REST API
    @Operation(summary = "Get all employees", description = "Retrieve a list of all employees")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of employees retrieved successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDto.class)))
    })
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Build Update Employee REST API
    @Operation(summary = "Update employee", description = "Update an existing employee's information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDto.class))),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json"))
    })
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @Parameter(description = "ID of the employee to update", required = true)
            @PathVariable("id") Long employeeId,
            @Parameter(description = "Updated employee data", required = true)
            @RequestBody EmployeeDto updatedemployee){
        EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedemployee);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Delete Employee REST API
    @Operation(summary = "Delete employee", description = "Delete an employee by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee deleted successfully",
                    content = @Content(mediaType = "text/plain")),
            @ApiResponse(responseCode = "404", description = "Employee not found",
                    content = @Content(mediaType = "application/json"))
    })
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(
            @Parameter(description = "ID of the employee to delete", required = true)
            @PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!");
    }
}
