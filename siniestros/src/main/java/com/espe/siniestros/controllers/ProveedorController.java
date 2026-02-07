package com.espe.siniestros.controllers;

import com.espe.siniestros.models.entities.Proveedor;
import com.espe.siniestros.services.ProveedorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorService service;

    @GetMapping
    public ResponseEntity<List<Proveedor>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Proveedor> proveedor = service.findById(id);
        if (proveedor.isPresent()) {
            return ResponseEntity.ok(proveedor.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Proveedor>> findByTipo(@PathVariable Proveedor.TipoProveedor tipo) {
        return ResponseEntity.ok(service.findByTipo(tipo));
    }

    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<List<Proveedor>> findByCiudad(@PathVariable String ciudad) {
        return ResponseEntity.ok(service.findByCiudad(ciudad));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Proveedor proveedor) {
        Proveedor saved = service.save(proveedor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Proveedor proveedor) {
        Optional<Proveedor> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Proveedor proveedorDB = existing.get();
        proveedorDB.setNombre(proveedor.getNombre());
        proveedorDB.setTipo(proveedor.getTipo());
        proveedorDB.setCiudad(proveedor.getCiudad());

        return ResponseEntity.ok(service.save(proveedorDB));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Proveedor> existing = service.findById(id);
        if (existing.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
