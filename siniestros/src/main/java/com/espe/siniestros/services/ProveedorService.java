package com.espe.siniestros.services;

import com.espe.siniestros.models.entities.Proveedor;

import java.util.List;
import java.util.Optional;

public interface ProveedorService {
    List<Proveedor> findAll();

    Optional<Proveedor> findById(Long id);

    List<Proveedor> findByTipo(Proveedor.TipoProveedor tipo);

    List<Proveedor> findByCiudad(String ciudad);

    Proveedor save(Proveedor proveedor);

    void deleteById(Long id);
}
