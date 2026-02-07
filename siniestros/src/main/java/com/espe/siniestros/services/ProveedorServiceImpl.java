package com.espe.siniestros.services;

import com.espe.siniestros.models.entities.Proveedor;
import com.espe.siniestros.repositories.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    @Autowired
    private ProveedorRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Proveedor> findAll() {
        return (List<Proveedor>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Proveedor> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Proveedor> findByTipo(Proveedor.TipoProveedor tipo) {
        return repository.findByTipo(tipo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Proveedor> findByCiudad(String ciudad) {
        return repository.findByCiudad(ciudad);
    }

    @Override
    @Transactional
    public Proveedor save(Proveedor proveedor) {
        return repository.save(proveedor);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
