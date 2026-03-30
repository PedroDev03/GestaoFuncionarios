package com.saam.gestao.controller;

import com.saam.gestao.dto.FuncionarioRequest;
import com.saam.gestao.dto.FuncionarioResponse;
import com.saam.gestao.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioResponse>> listar() {
        return ResponseEntity.ok(funcionarioService.listar());
    }

    @PostMapping
    public ResponseEntity<FuncionarioResponse> criar(@RequestBody FuncionarioRequest request) {
        return ResponseEntity.ok(funcionarioService.criar(request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<FuncionarioResponse> alterarStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        String novoStatus = body.get("status");
        return ResponseEntity.ok(funcionarioService.alterarStatus(id, novoStatus));
    }
}
