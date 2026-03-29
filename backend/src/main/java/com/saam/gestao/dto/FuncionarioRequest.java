package com.saam.gestao.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FuncionarioRequest(String nome, LocalDate dataAdmissao, BigDecimal salario, String status) {
}
