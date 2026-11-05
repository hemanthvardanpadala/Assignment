package com.sskatt.ems.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmsDataService {

    private Map<String, Object> mapOf(Object... entries) {
        Map<String, Object> map = new HashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            map.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return map;
    }

    public List<Map<String, Object>> getDepartments() {
        return List.of(
                mapOf("id", "D001", "name", "Engineering", "head", "Rajesh Kumar", "employeeCount", 24, "description", "Software development and technical operations"),
                mapOf("id", "D002", "name", "Human Resources", "head", "Priya Sharma", "employeeCount", 8, "description", "HR operations, recruitment, and employee welfare"),
                mapOf("id", "D003", "name", "Finance", "head", "Anil Gupta", "employeeCount", 10, "description", "Financial planning, accounting, and reporting"),
                mapOf("id", "D004", "name", "Sales", "head", "Meena Nair", "employeeCount", 18, "description", "Sales operations, client management, and revenue generation"),
                mapOf("id", "D005", "name", "Marketing", "head", "Vijay Patel", "employeeCount", 12, "description", "Marketing campaigns, branding, and market research"),
                mapOf("id", "D006", "name", "Operations", "head", "Sunita Rao", "employeeCount", 15, "description", "Day-to-day operations and process management")
        );
    }

    public List<Map<String, Object>> getEmployees() {
        return List.of(
                mapOf("id", "E001", "name", "Arjun Mehta", "email", "arjun.mehta@gmail.com", "phone", "+91 9876543210", "department", "Engineering", "designation", "Senior Developer", "status", "Active", "joinDate", "2021-03-15", "salary", 95000, "technology", "React", "laptop", mapOf("issued", true, "model", "Dell XPS 15"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E002", "name", "Pooja Iyer", "email", "pooja.iyer@gmail.com", "phone", "+91 9876543211", "department", "Engineering", "designation", "Frontend Developer", "status", "Active", "joinDate", "2022-06-01", "salary", 72000, "technology", "Vue.js", "laptop", mapOf("issued", true, "model", "MacBook Pro"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E003", "name", "Ravi Shankar", "email", "ravi.shankar@gmail.com", "phone", "+91 9876543212", "department", "Human Resources", "designation", "HR Manager", "status", "Active", "joinDate", "2020-01-10", "salary", 68000, "technology", "Excel", "laptop", mapOf("issued", false), "desktop", mapOf("issued", true, "model", "HP EliteDesk"), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E004", "name", "Deepika Singh", "email", "deepika.singh@gmail.com", "phone", "+91 9876543213", "department", "Finance", "designation", "Accountant", "status", "Active", "joinDate", "2021-08-20", "salary", 58000, "technology", "Excel", "laptop", mapOf("issued", false), "desktop", mapOf("issued", true, "model", "Lenovo ThinkCentre"), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E005", "name", "Karan Verma", "email", "karan.verma@gmail.com", "phone", "+91 9876543214", "department", "Sales", "designation", "Sales Executive", "status", "Inactive", "joinDate", "2019-05-12", "salary", 55000, "technology", "Salesforce", "laptop", mapOf("issued", true, "model", "Lenovo IdeaPad"), "desktop", mapOf("issued", false), "id_card_issued", false, "o365_account_created", false),
                mapOf("id", "E006", "name", "Nisha Reddy", "email", "nisha.reddy@gmail.com", "phone", "+91 9876543215", "department", "Marketing", "designation", "Marketing Manager", "status", "Active", "joinDate", "2020-11-03", "salary", 75000, "technology", "HubSpot", "laptop", mapOf("issued", true, "model", "MacBook Air"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E007", "name", "Suresh Babu", "email", "suresh.babu@gmail.com", "phone", "+91 9876543216", "department", "Engineering", "designation", "Backend Developer", "status", "On Leave", "joinDate", "2021-07-14", "salary", 88000, "technology", "Node.js", "laptop", mapOf("issued", true, "model", "Dell Inspiron"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E008", "name", "Ananya Krishnan", "email", "ananya.krishnan@gmail.com", "phone", "+91 9876543217", "department", "Operations", "designation", "Operations Lead", "status", "Active", "joinDate", "2022-02-28", "salary", 65000, "technology", "SAP", "laptop", mapOf("issued", false), "desktop", mapOf("issued", true, "model", "HP ProDesk"), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E009", "name", "Prakash Nair", "email", "prakash.nair@gmail.com", "phone", "+91 9876543218", "department", "Finance", "designation", "Financial Analyst", "status", "Active", "joinDate", "2021-09-15", "salary", 70000, "technology", "Python", "laptop", mapOf("issued", true, "model", "Dell Latitude"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E010", "name", "Shalini Dubey", "email", "shalini.dubey@gmail.com", "phone", "+91 9876543219", "department", "Sales", "designation", "Sales Manager", "status", "Active", "joinDate", "2019-12-01", "salary", 82000, "technology", "Salesforce", "laptop", mapOf("issued", true, "model", "Asus ZenBook"), "desktop", mapOf("issued", false), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E011", "name", "Vikram Joshi", "email", "vikram.joshi@gmail.com", "phone", "+91 9876543220", "department", "Engineering", "designation", "DevOps Engineer", "status", "Active", "joinDate", "2022-04-05", "salary", 90000, "technology", "Docker", "laptop", mapOf("issued", true, "model", "MacBook Pro"), "desktop", mapOf("issued", true, "model", "Mac Mini"), "id_card_issued", true, "o365_account_created", true),
                mapOf("id", "E012", "name", "Kavya Menon", "email", "kavya.menon@gmail.com", "phone", "+91 9876543221", "department", "Human Resources", "designation", "HR Executive", "status", "Active", "joinDate", "2023-01-20", "salary", 45000, "technology", "Excel", "laptop", mapOf("issued", false), "desktop", mapOf("issued", true, "model", "HP EliteDesk"), "id_card_issued", false, "o365_account_created", true)
        );
    }

    public List<Map<String, Object>> getAttendanceRecords() {
        return List.of(
                mapOf("id", "A001", "employeeId", "E001", "employeeName", "Arjun Mehta", "date", "2026-03-25", "checkIn", "09:05", "checkOut", "18:10", "status", "Present", "hoursWorked", "9h 5m"),
                mapOf("id", "A002", "employeeId", "E002", "employeeName", "Pooja Iyer", "date", "2026-03-25", "checkIn", "09:30", "checkOut", "18:00", "status", "Late", "hoursWorked", "8h 30m"),
                mapOf("id", "A003", "employeeId", "E003", "employeeName", "Ravi Shankar", "date", "2026-03-25", "checkIn", "08:55", "checkOut", "18:00", "status", "Present", "hoursWorked", "9h 5m"),
                mapOf("id", "A004", "employeeId", "E004", "employeeName", "Deepika Singh", "date", "2026-03-25", "checkIn", "", "checkOut", "", "status", "Absent", "hoursWorked", "0h"),
                mapOf("id", "A005", "employeeId", "E005", "employeeName", "Karan Verma", "date", "2026-03-25", "checkIn", "09:00", "checkOut", "13:00", "status", "Half Day", "hoursWorked", "4h"),
                mapOf("id", "A006", "employeeId", "E006", "employeeName", "Nisha Reddy", "date", "2026-03-25", "checkIn", "09:02", "checkOut", "18:05", "status", "Present", "hoursWorked", "9h 3m"),
                mapOf("id", "A007", "employeeId", "E007", "employeeName", "Suresh Babu", "date", "2026-03-25", "checkIn", "", "checkOut", "", "status", "Absent", "hoursWorked", "0h")
        );
    }

    public List<Map<String, Object>> getLeaveRequests() {
        return List.of(
                mapOf("id", "L001", "employeeId", "E001", "employeeName", "Arjun Mehta", "department", "Engineering", "leaveType", "Annual", "startDate", "2026-04-01", "endDate", "2026-04-05", "days", 5, "reason", "Family vacation", "status", "Pending", "appliedOn", "2026-03-20"),
                mapOf("id", "L002", "employeeId", "E002", "employeeName", "Pooja Iyer", "department", "Engineering", "leaveType", "Sick", "startDate", "2026-03-22", "endDate", "2026-03-24", "days", 3, "reason", "Medical treatment", "status", "Approved", "appliedOn", "2026-03-21"),
                mapOf("id", "L003", "employeeId", "E007", "employeeName", "Suresh Babu", "department", "Engineering", "leaveType", "Casual", "startDate", "2026-03-23", "endDate", "2026-03-28", "days", 6, "reason", "Personal work", "status", "Approved", "appliedOn", "2026-03-19"),
                mapOf("id", "L004", "employeeId", "E004", "employeeName", "Deepika Singh", "department", "Finance", "leaveType", "Annual", "startDate", "2026-03-25", "endDate", "2026-03-26", "days", 2, "reason", "Personal reasons", "status", "Rejected", "appliedOn", "2026-03-22"),
                mapOf("id", "L005", "employeeId", "E010", "employeeName", "Shalini Dubey", "department", "Sales", "leaveType", "Maternity", "startDate", "2026-04-10", "endDate", "2026-07-10", "days", 90, "reason", "Maternity leave", "status", "Pending", "appliedOn", "2026-03-15")
        );
    }

    public List<Map<String, Object>> getPayrollRecords() {
        return List.of(
                mapOf("id", "P001", "employeeId", "E001", "employeeName", "Arjun Mehta", "department", "Engineering", "month", "March 2026", "basicSalary", 95000, "allowances", 15000, "deductions", 12000, "netSalary", 98000, "status", "Pending"),
                mapOf("id", "P002", "employeeId", "E002", "employeeName", "Pooja Iyer", "department", "Engineering", "month", "March 2026", "basicSalary", 72000, "allowances", 10000, "deductions", 9000, "netSalary", 73000, "status", "Pending"),
                mapOf("id", "P003", "employeeId", "E003", "employeeName", "Ravi Shankar", "department", "Human Resources", "month", "March 2026", "basicSalary", 68000, "allowances", 8000, "deductions", 8500, "netSalary", 67500, "status", "Processed"),
                mapOf("id", "P004", "employeeId", "E004", "employeeName", "Deepika Singh", "department", "Finance", "month", "March 2026", "basicSalary", 58000, "allowances", 7000, "deductions", 7500, "netSalary", 57500, "status", "Processed"),
                mapOf("id", "P005", "employeeId", "E006", "employeeName", "Nisha Reddy", "department", "Marketing", "month", "March 2026", "basicSalary", 75000, "allowances", 12000, "deductions", 9500, "netSalary", 77500, "status", "Processed"),
                mapOf("id", "P006", "employeeId", "E007", "employeeName", "Suresh Babu", "department", "Engineering", "month", "March 2026", "basicSalary", 88000, "allowances", 14000, "deductions", 11000, "netSalary", 91000, "status", "On Hold"),
                mapOf("id", "P007", "employeeId", "E009", "employeeName", "Prakash Nair", "department", "Finance", "month", "March 2026", "basicSalary", 70000, "allowances", 9000, "deductions", 9000, "netSalary", 70000, "status", "Pending"),
                mapOf("id", "P008", "employeeId", "E011", "employeeName", "Vikram Joshi", "department", "Engineering", "month", "March 2026", "basicSalary", 90000, "allowances", 13000, "deductions", 11500, "netSalary", 91500, "status", "Processed")
        );
    }

    public List<Map<String, Object>> getUsers() {
        return List.of(
                mapOf("id", "U001", "name", "Hemanth Vardan Padala", "email", "hemanth@gmail.com", "role", "Admin", "createdAt", "17/03/2026"),
                mapOf("id", "U002", "name", "testUser1", "email", "testUser1@gmail.com", "role", "Admin", "createdAt", "19/03/2026", "isYou", true),
                mapOf("id", "U003", "name", "testUser2", "email", "testUser2@gmail.com", "role", "Admin", "createdAt", "20/03/2026"),
                mapOf("id", "U004", "name", "testUser3", "email", "testUser3@gmail.com", "role", "Admin", "createdAt", "23/03/2026"),
                mapOf("id", "U005", "name", "testUser4", "email", "testUser4@gmail.com", "role", "HR", "createdAt", "24/03/2026"),
                mapOf("id", "U006", "name", "testUser5", "email", "testUser5@gmail.com", "role", "HR", "createdAt", "24/03/2026")
        );
    }

    public Map<String, Object> getDashboard() {
        return mapOf(
                "employees", getEmployees(),
                "departments", getDepartments(),
                "attendanceRecords", getAttendanceRecords(),
                "leaveRequests", getLeaveRequests(),
                "payrollRecords", getPayrollRecords()
        );
    }

    public Map<String, Object> getReports() {
        List<Map<String, Object>> employees = getEmployees();
        List<Map<String, Object>> departments = getDepartments();
        List<Map<String, Object>> attendance = getAttendanceRecords();
        List<Map<String, Object>> leaves = getLeaveRequests();
        List<Map<String, Object>> payroll = getPayrollRecords();

        int totalPayroll = payroll.stream().mapToInt(r -> (int) r.get("netSalary")).sum();
        int avgSalary = (int) employees.stream().mapToInt(e -> (int) e.get("salary")).average().orElse(0);
        int approvedLeaves = (int) leaves.stream().filter(l -> "Approved".equals(l.get("status"))).count();
        int attendanceRate = attendance.isEmpty() ? 0 : (int) Math.round(attendance.stream().filter(a -> "Present".equals(a.get("status"))).count() * 100.0 / attendance.size());
        int leaveApprovalRate = leaves.isEmpty() ? 0 : (int) Math.round(approvedLeaves * 100.0 / leaves.size());

        return mapOf(
                "employees", employees,
                "departments", departments,
                "attendanceRecords", attendance,
                "leaveRequests", leaves,
                "payrollRecords", payroll,
                "totalPayroll", totalPayroll,
                "avgSalary", avgSalary,
                "attendanceRate", attendanceRate,
                "leaveApprovalRate", leaveApprovalRate
        );
    }
}
