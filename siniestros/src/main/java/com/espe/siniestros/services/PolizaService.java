package com.espe.siniestros.services;

import com.espe.siniestros.models.entities.Poliza;

import java.util.List;
import java.util.Optional;

public interface PolizaService {
    List<Poliza> findAll();

    Optional<Poliza> findById(Long id);

    Optional<Poliza> findByNumeroPoliza(String numeroPoliza);

    Poliza save(Poliza poliza);

    void deleteById(Long id);

    boolean existsByNumeroPoliza(String numeroPoliza);
}
