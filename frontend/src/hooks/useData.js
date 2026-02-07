import { useState, useEffect, useCallback } from 'react';
import { polizaService, proveedorService, siniestroService } from '../services/api';

// Hook para Pólizas
export function usePolizas() {
    const [polizas, setPolizas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPolizas = useCallback(async () => {
        try {
            setLoading(true);
            const data = await polizaService.getAll();
            setPolizas(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPolizas();
    }, [fetchPolizas]);

    const createPoliza = async (poliza) => {
        const newPoliza = await polizaService.create(poliza);
        setPolizas((prev) => [...prev, newPoliza]);
        return newPoliza;
    };

    const updatePoliza = async (id, poliza) => {
        const updated = await polizaService.update(id, poliza);
        setPolizas((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
    };

    const deletePoliza = async (id) => {
        await polizaService.delete(id);
        setPolizas((prev) => prev.filter((p) => p.id !== id));
    };

    return {
        polizas,
        loading,
        error,
        refetch: fetchPolizas,
        createPoliza,
        updatePoliza,
        deletePoliza,
    };
}

// Hook para Proveedores
export function useProveedores() {
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProveedores = useCallback(async () => {
        try {
            setLoading(true);
            const data = await proveedorService.getAll();
            setProveedores(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProveedores();
    }, [fetchProveedores]);

    const createProveedor = async (proveedor) => {
        const newProveedor = await proveedorService.create(proveedor);
        setProveedores((prev) => [...prev, newProveedor]);
        return newProveedor;
    };

    const updateProveedor = async (id, proveedor) => {
        const updated = await proveedorService.update(id, proveedor);
        setProveedores((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
    };

    const deleteProveedor = async (id) => {
        await proveedorService.delete(id);
        setProveedores((prev) => prev.filter((p) => p.id !== id));
    };

    return {
        proveedores,
        loading,
        error,
        refetch: fetchProveedores,
        createProveedor,
        updateProveedor,
        deleteProveedor,
    };
}

// Hook para Siniestros
export function useSiniestros() {
    const [siniestros, setSiniestros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSiniestros = useCallback(async () => {
        try {
            setLoading(true);
            const data = await siniestroService.getAll();
            setSiniestros(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSiniestros();
    }, [fetchSiniestros]);

    const createSiniestro = async (siniestro) => {
        const newSiniestro = await siniestroService.create(siniestro);
        setSiniestros((prev) => [...prev, newSiniestro]);
        return newSiniestro;
    };

    const updateSiniestro = async (id, siniestro) => {
        const updated = await siniestroService.update(id, siniestro);
        setSiniestros((prev) => prev.map((s) => (s.id === id ? updated : s)));
        return updated;
    };

    const deleteSiniestro = async (id) => {
        await siniestroService.delete(id);
        setSiniestros((prev) => prev.filter((s) => s.id !== id));
    };

    const stats = {
        total: siniestros.length,
        abiertos: siniestros.filter((s) => s.estado === 'ABIERTO').length,
        enProceso: siniestros.filter((s) => s.estado === 'EN_PROCESO').length,
        cerrados: siniestros.filter((s) => s.estado === 'CERRADO').length,
    };

    return {
        siniestros,
        loading,
        error,
        stats,
        refetch: fetchSiniestros,
        createSiniestro,
        updateSiniestro,
        deleteSiniestro,
    };
}
