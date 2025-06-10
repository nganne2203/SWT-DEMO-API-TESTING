package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee")
@Entity // this class represents the Employee entity in the database
public class Employee {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY) // using IDENTITY strategy for auto-incrementing primary key
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "email", nullable = false, unique = true) // email cannot be null and must be unique
    private String email;

    // before running this project again, make sure you create the database have the name 'demo' in your MySQL server
    // when we add dependency for Lombok, we can use annotations like @Getter, @Setter, @NoArgsConstructor, and @AllArgsConstructor
    // these annotations help to reduce boilerplate code for getters, setters, and constructors
    // model package is used to define the data structure of an Employee
    // it contains fields like id, name, address, and email
    // these fields represent the attributes of an employee in the system, all fields are mapped to the database table

    // because this is the demo project using codeceptjs to automate the testing, we don't need to add any business logic here
    // so, to simplify the process, i will add the link to github repopsitory to help you download the project to follow the step testing easily

}
