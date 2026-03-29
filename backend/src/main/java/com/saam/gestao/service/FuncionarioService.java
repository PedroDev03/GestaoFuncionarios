package com.saam.gestao.service;

import com.saam.gestao.dto.FuncionarioRequest;
import com.saam.gestao.dto.FuncionarioResponse;
import com.saam.gestao.entity.Funcionario;
import com.saam.gestao.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<FuncionarioResponse> listar() {
        return funcionarioRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public FuncionarioResponse criar(FuncionarioRequest request) {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(request.nome());
        funcionario.setDataAdmissao(request.dataAdmissao());
        funcionario.setSalario(request.salario());
        funcionario.setStatus(request.status() != null ? request.status() : "ATIVO");
        return toResponse(funcionarioRepository.save(funcionario));
    }

    private FuncionarioResponse toResponse(Funcionario f) {
        return new FuncionarioResponse(f.getId(), f.getNome(), f.getDataAdmissao(), f.getSalario(), f.getStatus());
    }
}
