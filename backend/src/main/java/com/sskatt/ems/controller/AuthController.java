package com.sskatt.ems.controller;

import com.sskatt.ems.dto.LoginRequest;
import com.sskatt.ems.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String email = request.email() != null ? request.email().trim().toLowerCase() : "";
        String password = request.password();

        if (("hemanth@gmail.com".equals(email) || "admin@gmail.com".equals(email))
                && "Director@2026".equals(password)) {
            return ResponseEntity.ok(new LoginResponse(
                    email,
                    "Admin",
                    "Administrator"
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }
}
