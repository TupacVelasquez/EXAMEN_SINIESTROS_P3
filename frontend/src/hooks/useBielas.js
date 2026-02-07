import { useState, useEffect, useCallback } from 'react';
import { bielaService } from '../services/api';

export const useBielas = () => {
    const [bielas, setBielas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBielas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await bielaService.getAll();
            setBielas(data);
        } catch (err) {
            setError(err.message || 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBielas();
    }, [fetchBielas]);

    const createBiela = async (biela) => {
        const newBiela = await bielaService.create(biela);
        setBielas((prev) => [...prev, newBiela]);
        return newBiela;
    };

    const updateBiela = async (id, biela) => {
        const updated = await bielaService.update(id, biela);
        setBielas((prev) => prev.map((b) => (b.id === id ? updated : b)));
        return updated;
    };

    const deleteBiela = async (id) => {
        await bielaService.delete(id);
        setBielas((prev) => prev.filter((b) => b.id !== id));
    };

    // Estadísticas
    const stats = {
        total: bielas.length,
        totalStock: bielas.reduce((sum, b) => sum + (b.stock || 0), 0),
        totalValue: bielas.reduce((sum, b) => sum + (b.price || 0) * (b.stock || 0), 0),
        avgPrice: bielas.length > 0
            ? bielas.reduce((sum, b) => sum + (b.price || 0), 0) / bielas.length
            : 0,
    };

    return {
        bielas,
        loading,
        error,
        stats,
        refetch: fetchBielas,
        createBiela,
        updateBiela,
        deleteBiela,
    };
};
