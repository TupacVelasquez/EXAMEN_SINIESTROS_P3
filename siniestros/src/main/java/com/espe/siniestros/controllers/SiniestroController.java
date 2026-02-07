package com.espe.siniestros.controllers;

import com.espe.siniestros.models.entities.Siniestro;
import com.espe.siniestros.models.entities.Poliza;
import com.espe.siniestros.services.SiniestroService;
import com.espe.siniestros.services.PolizaService;
import com.espe.siniestros.services.ProveedorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/siniestros")
public class SiniestroController {

    @Autowired
    private SiniestroService service;

    @Autowired
    private PolizaService polizaService;

    @Autowired
    private ProveedorService proveedorService;

    @GetMapping
    public ResponseEntity<List<Siniestro>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Siniestro> siniestro = service.findById(id);
        if (siniestro.isPresent()) {
            return ResponseEntity.ok(siniestro.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Siniestro>> findByEstado(@PathVariable Siniestro.EstadoSiniestro estado) {
        return ResponseEntity.ok(service.findByEstado(estado));
    }

    @GetMapping("/poliza/{polizaId}")
    public ResponseEntity<List<Siniestro>> findByPolizaId(@PathVariable Long polizaId) {
        return ResponseEntity.ok(service.findByPolizaId(polizaId));
    }

    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Siniestro>> findByProveedorId(@PathVariable Long proveedorId) {
        return ResponseEntity.ok(service.findByProveedorId(proveedorId));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody SiniestroRequest request) {
        // Validar que la póliza existe
        Optional<Poliza> poliza = polizaService.findById(request.getPolizaId());
        if (poliza.isEmpty()) {
            return ResponseEntity.badRequest().body("La póliza con ID " + request.getPolizaId() + " no existe");
        }

        // Validar que el proveedor existe
        if (proveedorService.findById(request.getProveedorId()).isEmpty()) {
            return ResponseEntity.badRequest().body("El proveedor con ID " + request.getProveedorId() + " no existe");
        }

        Siniestro siniestro = new Siniestro();
        siniestro.setNumeroCaso(request.getNumeroCaso());
        siniestro.setFecha(request.getFecha());
        siniestro.setDescripcion(request.getDescripcion());
        siniestro.setMontoEstimado(request.getMontoEstimado());
        siniestro.setEstado(request.getEstado());
        siniestro.setPoliza(poliza.get());
        siniestro.setProveedorId(request.getProveedorId());

        Siniestro saved = service.save(siniestro);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody SiniestroRequest request) {
        Optional<Siniestro> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Validar que la póliza existe
        Optional<Poliza> poliza = polizaService.findById(request.getPolizaId());
        if (poliza.isEmpty()) {
            return ResponseEntity.badRequest().body("La póliza con ID " + request.getPolizaId() + " no existe");
        }

        // Validar que el proveedor existe
        if (proveedorService.findById(request.getProveedorId()).isEmpty()) {
            return ResponseEntity.badRequest().body("El proveedor con ID " + request.getProveedorId() + " no existe");
        }

        Siniestro siniestroDb = existing.get();
        siniestroDb.setNumeroCaso(request.getNumeroCaso());
        siniestroDb.setFecha(request.getFecha());
        siniestroDb.setDescripcion(request.getDescripcion());
        siniestroDb.setMontoEstimado(request.getMontoEstimado());
        siniestroDb.setEstado(request.getEstado());
        siniestroDb.setPoliza(poliza.get());
        siniestroDb.setProveedorId(request.getProveedorId());

        return ResponseEntity.ok(service.save(siniestroDb));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Siniestro> existing = service.findById(id);
        if (existing.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO para recibir requests con IDs
    public static class SiniestroRequest {
        private String numeroCaso;
        private java.time.LocalDate fecha;
        private String descripcion;
        private java.math.BigDecimal montoEstimado;
        private Siniestro.EstadoSiniestro estado;
        private Long polizaId;
        private Long proveedorId;

        // Getters and Setters
        public String getNumeroCaso() {
            return numeroCaso;
        }

        public void setNumeroCaso(String numeroCaso) {
            this.numeroCaso = numeroCaso;
        }

        public java.time.LocalDate getFecha() {
            return fecha;
        }

        public void setFecha(java.time.LocalDate fecha) {
            this.fecha = fecha;
        }

        public String getDescripcion() {
            return descripcion;
        }

        public void setDescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

        public java.math.BigDecimal getMontoEstimado() {
            return montoEstimado;
        }

        public void setMontoEstimado(java.math.BigDecimal montoEstimado) {
            this.montoEstimado = montoEstimado;
        }

        public Siniestro.EstadoSiniestro getEstado() {
            return estado;
        }

        public void setEstado(Siniestro.EstadoSiniestro estado) {
            this.estado = estado;
        }

        public Long getPolizaId() {
            return polizaId;
        }

        public void setPolizaId(Long polizaId) {
            this.polizaId = polizaId;
        }

        public Long getProveedorId() {
            return proveedorId;
        }

        public void setProveedorId(Long proveedorId) {
            this.proveedorId = proveedorId;
        }
    }
}
