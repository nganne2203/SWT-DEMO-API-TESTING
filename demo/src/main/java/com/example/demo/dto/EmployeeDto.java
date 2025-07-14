package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Employee Data Transfer Object")
public class EmployeeDto {
    @Schema(description = "Unique identifier of the employee", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    
    @Schema(description = "Name of the employee", example = "John Doe", required = true)
    private String name;
    
    @Schema(description = "Address of the employee", example = "123 Main Street, City, State")
    private String address;
    
    @NotBlank(message = "Email is required")
    @Schema(description = "Email address of the employee", example = "john.doe@example.com", required = true)
    private String email;
}
