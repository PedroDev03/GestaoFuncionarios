package com.saam.gestao.controller;

import com.saam.gestao.dto.LoginRequest;
import com.saam.gestao.dto.LoginResponse;
import com.saam.gestao.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.saam.gestao.dto.RegisterRequest;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.Registrar(request));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).build();
        }
    }

}
