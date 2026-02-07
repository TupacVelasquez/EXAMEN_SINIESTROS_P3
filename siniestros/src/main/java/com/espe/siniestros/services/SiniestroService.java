package com.espe.siniestros.services;

import com.espe.siniestros.models.entities.Siniestro;

import java.util.List;
import java.util.Optional;

public interface SiniestroService {
    List<Siniestro> findAll();

    Optional<Siniestro> findById(Long id);

    Optional<Siniestro> findByNumeroCaso(String numeroCaso);

    List<Siniestro> findByEstado(Siniestro.EstadoSiniestro estado);

    List<Siniestro> findByPolizaId(Long polizaId);

    List<Siniestro> findByProveedorId(Long proveedorId);

    Siniestro save(Siniestro siniestro);

    void deleteById(Long id);
}
