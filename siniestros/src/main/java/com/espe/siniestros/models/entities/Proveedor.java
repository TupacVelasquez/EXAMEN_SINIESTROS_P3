package com.espe.siniestros.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "proveedores")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del proveedor es obligatorio")
    private String nombre;

    @NotNull(message = "El tipo de proveedor es obligatorio")
    @Enumerated(EnumType.STRING)
    private TipoProveedor tipo;

    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;

    // Enum for tipo
    public enum TipoProveedor {
        TALLER, CLINICA, GRUA
    }

    // Constructors
    public Proveedor() {
    }

    public Proveedor(String nombre, TipoProveedor tipo, String ciudad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ciudad = ciudad;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoProveedor getTipo() {
        return tipo;
    }

    public void setTipo(TipoProveedor tipo) {
        this.tipo = tipo;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
}
