package com.sskatt.ems.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/internal")
public class EmployeeController {

    @GetMapping("/employees")
    public List<Map<String, Object>> getEmployees() {
        return List.of(
                Map.of("id", "E001", "name", "Arjun Mehta", "department", "Engineering", "designation", "Senior Developer", "status", "Active"),
                Map.of("id", "E002", "name", "Pooja Iyer", "department", "Engineering", "designation", "Frontend Developer", "status", "Active"),
                Map.of("id", "E003", "name", "Ravi Shankar", "department", "HR", "designation", "HR Manager", "status", "Active")
        );
    }
}
