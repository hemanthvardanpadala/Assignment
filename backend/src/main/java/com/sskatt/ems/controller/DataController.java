package com.sskatt.ems.controller;

import com.sskatt.ems.service.EmsDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    private final EmsDataService emsDataService;

    @Autowired
    public DataController(EmsDataService emsDataService) {
        this.emsDataService = emsDataService;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return emsDataService.getDashboard();
    }

    @GetMapping("/employees")
    public Map<String, Object> employees() {
        return Map.of("items", emsDataService.getEmployees());
    }

    @GetMapping("/departments")
    public Map<String, Object> departments() {
        return Map.of("items", emsDataService.getDepartments());
    }

    @GetMapping("/attendance")
    public Map<String, Object> attendance() {
        return Map.of("items", emsDataService.getAttendanceRecords());
    }

    @GetMapping("/leaves")
    public Map<String, Object> leaves() {
        return Map.of("items", emsDataService.getLeaveRequests());
    }

    @GetMapping("/payroll")
    public Map<String, Object> payroll() {
        return Map.of("items", emsDataService.getPayrollRecords());
    }

    @GetMapping("/reports")
    public Map<String, Object> reports() {
        return emsDataService.getReports();
    }

    @GetMapping("/users")
    public Map<String, Object> users() {
        return Map.of("items", emsDataService.getUsers());
    }
}
