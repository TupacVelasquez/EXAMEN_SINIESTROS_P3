package com.espe.siniestros.controllers;

import com.espe.siniestros.models.entities.Poliza;
import com.espe.siniestros.services.PolizaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/polizas")
public class PolizaController {

    @Autowired
    private PolizaService service;

    @GetMapping
    public ResponseEntity<List<Poliza>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Poliza> poliza = service.findById(id);
        if (poliza.isPresent()) {
            return ResponseEntity.ok(poliza.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Poliza poliza) {
        if (service.existsByNumeroPoliza(poliza.getNumeroPoliza())) {
            return ResponseEntity.badRequest()
                    .body("Ya existe una póliza con el número: " + poliza.getNumeroPoliza());
        }
        Poliza saved = service.save(poliza);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Poliza poliza) {
        Optional<Poliza> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Poliza polizaDB = existing.get();
        polizaDB.setNumeroPoliza(poliza.getNumeroPoliza());
        polizaDB.setTipo(poliza.getTipo());
        polizaDB.setEstado(poliza.getEstado());

        return ResponseEntity.ok(service.save(polizaDB));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Poliza> existing = service.findById(id);
        if (existing.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
