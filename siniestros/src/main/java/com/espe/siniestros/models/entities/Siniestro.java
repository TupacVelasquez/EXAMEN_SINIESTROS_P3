package com.espe.siniestros.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "siniestros")
public class Siniestro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El número de caso es obligatorio")
    @Column(unique = true, nullable = false)
    private String numeroCaso;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @Size(max = 500, message = "La descripción no debe exceder 500 caracteres")
    private String descripcion;

    @NotNull(message = "El monto estimado es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El monto debe ser mayor a 0")
    private BigDecimal montoEstimado;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    private EstadoSiniestro estado;

    // Relación con Póliza (MySQL - misma BD)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "poliza_id", nullable = false)
    private Poliza poliza;

    // Referencia a Proveedor (PostgreSQL - solo ID)
    @NotNull(message = "El proveedor es obligatorio")
    private Long proveedorId;

    // Enum para estado
    public enum EstadoSiniestro {
        ABIERTO, EN_PROCESO, CERRADO
    }

    // Constructors
    public Siniestro() {
    }

    public Siniestro(String numeroCaso, LocalDate fecha, String descripcion,
            BigDecimal montoEstimado, EstadoSiniestro estado,
            Poliza poliza, Long proveedorId) {
        this.numeroCaso = numeroCaso;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.montoEstimado = montoEstimado;
        this.estado = estado;
        this.poliza = poliza;
        this.proveedorId = proveedorId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCaso() {
        return numeroCaso;
    }

    public void setNumeroCaso(String numeroCaso) {
        this.numeroCaso = numeroCaso;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getMontoEstimado() {
        return montoEstimado;
    }

    public void setMontoEstimado(BigDecimal montoEstimado) {
        this.montoEstimado = montoEstimado;
    }

    public EstadoSiniestro getEstado() {
        return estado;
    }

    public void setEstado(EstadoSiniestro estado) {
        this.estado = estado;
    }

    public Poliza getPoliza() {
        return poliza;
    }

    public void setPoliza(Poliza poliza) {
        this.poliza = poliza;
    }

    public Long getProveedorId() {
        return proveedorId;
    }

    public void setProveedorId(Long proveedorId) {
        this.proveedorId = proveedorId;
    }
}
