package com.saam.gestao;

import com.saam.gestao.entity.Usuario;
import com.saam.gestao.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Complementa o Migration V2 (Flyway) inserindo o usuário admin com
 * hash BCrypt gerado em tempo de execução, garantindo compatibilidade
 * independente do ambiente.
 * Senha: admin123
 */
@Component
public class DataInitializer implements ApplicationRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (usuarioRepository.findByEmail("admin@saam.com.br").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail("admin@saam.com.br");
            admin.setSenha(passwordEncoder.encode("admin123"));
            usuarioRepository.save(admin);
        }
    }
}
