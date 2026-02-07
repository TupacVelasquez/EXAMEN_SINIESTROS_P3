package com.espe.siniestros.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "polizas")
public class Poliza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El número de póliza es obligatorio")
    @Column(unique = true, nullable = false)
    private String numeroPoliza;

    @NotBlank(message = "El tipo de póliza es obligatorio")
    private String tipo;

    @NotBlank(message = "El estado es obligatorio")
    private String estado;

    // Constructors
    public Poliza() {
    }

    public Poliza(String numeroPoliza, String tipo, String estado) {
        this.numeroPoliza = numeroPoliza;
        this.tipo = tipo;
        this.estado = estado;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroPoliza() {
        return numeroPoliza;
    }

    public void setNumeroPoliza(String numeroPoliza) {
        this.numeroPoliza = numeroPoliza;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
