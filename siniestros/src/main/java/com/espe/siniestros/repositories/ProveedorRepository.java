package com.espe.siniestros.repositories;

import com.espe.siniestros.models.entities.Proveedor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorRepository extends CrudRepository<Proveedor, Long> {
    List<Proveedor> findByTipo(Proveedor.TipoProveedor tipo);

    List<Proveedor> findByCiudad(String ciudad);
}
