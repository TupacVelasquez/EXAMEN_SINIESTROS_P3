package com.espe.siniestros.repositories;

import com.espe.siniestros.models.entities.Poliza;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PolizaRepository extends CrudRepository<Poliza, Long> {
    Optional<Poliza> findByNumeroPoliza(String numeroPoliza);

    boolean existsByNumeroPoliza(String numeroPoliza);
}
