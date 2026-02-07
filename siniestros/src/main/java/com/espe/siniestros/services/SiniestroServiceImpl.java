package com.espe.siniestros.services;

import com.espe.siniestros.models.entities.Siniestro;
import com.espe.siniestros.repositories.SiniestroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SiniestroServiceImpl implements SiniestroService {

    @Autowired
    private SiniestroRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Siniestro> findAll() {
        return (List<Siniestro>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Siniestro> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Siniestro> findByNumeroCaso(String numeroCaso) {
        return repository.findByNumeroCaso(numeroCaso);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Siniestro> findByEstado(Siniestro.EstadoSiniestro estado) {
        return repository.findByEstado(estado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Siniestro> findByPolizaId(Long polizaId) {
        return repository.findByPoliza_Id(polizaId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Siniestro> findByProveedorId(Long proveedorId) {
        return repository.findByProveedorId(proveedorId);
    }

    @Override
    @Transactional
    public Siniestro save(Siniestro siniestro) {
        return repository.save(siniestro);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
