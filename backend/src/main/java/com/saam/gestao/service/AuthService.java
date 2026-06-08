package com.saam.gestao.service;

import com.saam.gestao.config.JwtUtil;
import com.saam.gestao.dto.LoginRequest;
import com.saam.gestao.dto.LoginResponse;
import com.saam.gestao.entity.Usuario;
import com.saam.gestao.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.saam.gestao.dto.RegisterRequest;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!passwordEncoder.matches(request.senha(), usuario.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getEmail());
        return new LoginResponse(token);
    }

    public LoginResponse Registrar(RegisterRequest request) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(request.email());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("usuário já existe");
        } else {
            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(request.nome());
            novoUsuario.setEmail(request.email());
            novoUsuario.setSenha(passwordEncoder.encode(request.senha()));
            usuarioRepository.save(novoUsuario);
            
            String token = jwtUtil.generateToken(novoUsuario.getEmail());
            return new LoginResponse(token);
        }

    }
}
