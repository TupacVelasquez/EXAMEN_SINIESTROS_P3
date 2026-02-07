package com.espe.siniestros.repositories;

import com.espe.siniestros.models.entities.Siniestro;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SiniestroRepository extends CrudRepository<Siniestro, Long> {
    Optional<Siniestro> findByNumeroCaso(String numeroCaso);

    List<Siniestro> findByEstado(Siniestro.EstadoSiniestro estado);

    List<Siniestro> findByPoliza_Id(Long polizaId);

    List<Siniestro> findByProveedorId(Long proveedorId);
}
