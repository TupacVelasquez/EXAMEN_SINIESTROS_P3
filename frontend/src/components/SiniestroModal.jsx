import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function SiniestroModal({ isOpen, onClose, onSave, siniestro, polizas, proveedores, isLoading }) {
    const [formData, setFormData] = useState({
        numeroCaso: '',
        fecha: '',
        descripcion: '',
        montoEstimado: '',
        estado: 'ABIERTO',
        polizaId: '',
        proveedorId: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (siniestro) {
            setFormData({
                numeroCaso: siniestro.numeroCaso || '',
                fecha: siniestro.fecha || '',
                descripcion: siniestro.descripcion || '',
                montoEstimado: siniestro.montoEstimado || '',
                estado: siniestro.estado || 'ABIERTO',
                polizaId: siniestro.poliza?.id || siniestro.polizaId || '',
                proveedorId: siniestro.proveedorId || '',
            });
        } else {
            setFormData({
                numeroCaso: '',
                fecha: new Date().toISOString().split('T')[0],
                descripcion: '',
                montoEstimado: '',
                estado: 'ABIERTO',
                polizaId: '',
                proveedorId: '',
            });
        }
        setErrors({});
    }, [siniestro, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.numeroCaso.trim()) {
            newErrors.numeroCaso = 'El número de caso es obligatorio';
        }
        if (!formData.fecha) {
            newErrors.fecha = 'La fecha es obligatoria';
        }
        if (!formData.montoEstimado || formData.montoEstimado <= 0) {
            newErrors.montoEstimado = 'El monto debe ser mayor a 0';
        }
        if (!formData.polizaId) {
            newErrors.polizaId = 'Debe seleccionar una póliza';
        }
        if (!formData.proveedorId) {
            newErrors.proveedorId = 'Debe seleccionar un proveedor';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave({
                ...formData,
                polizaId: Number(formData.polizaId),
                proveedorId: Number(formData.proveedorId),
                montoEstimado: Number(formData.montoEstimado),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{siniestro ? '✏️ Editar Siniestro' : '➕ Nuevo Siniestro'}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="numeroCaso">Número de Caso *</label>
                            <input
                                type="text"
                                id="numeroCaso"
                                name="numeroCaso"
                                value={formData.numeroCaso}
                                onChange={handleChange}
                                placeholder="Ej: SIN-2024-001"
                                className={errors.numeroCaso ? 'error' : ''}
                            />
                            {errors.numeroCaso && <span className="error-text">{errors.numeroCaso}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha">Fecha *</label>
                            <input
                                type="date"
                                id="fecha"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleChange}
                                className={errors.fecha ? 'error' : ''}
                            />
                            {errors.fecha && <span className="error-text">{errors.fecha}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="polizaId">Póliza *</label>
                            <select
                                id="polizaId"
                                name="polizaId"
                                value={formData.polizaId}
                                onChange={handleChange}
                                className={errors.polizaId ? 'error' : ''}
                            >
                                <option value="">Seleccionar póliza</option>
                                {polizas?.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.numeroPoliza} - {p.tipo}
                                    </option>
                                ))}
                            </select>
                            {errors.polizaId && <span className="error-text">{errors.polizaId}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="proveedorId">Proveedor *</label>
                            <select
                                id="proveedorId"
                                name="proveedorId"
                                value={formData.proveedorId}
                                onChange={handleChange}
                                className={errors.proveedorId ? 'error' : ''}
                            >
                                <option value="">Seleccionar proveedor</option>
                                {proveedores?.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nombre} ({p.tipo})
                                    </option>
                                ))}
                            </select>
                            {errors.proveedorId && <span className="error-text">{errors.proveedorId}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="montoEstimado">Monto Estimado *</label>
                            <input
                                type="number"
                                id="montoEstimado"
                                name="montoEstimado"
                                value={formData.montoEstimado}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className={errors.montoEstimado ? 'error' : ''}
                            />
                            {errors.montoEstimado && <span className="error-text">{errors.montoEstimado}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado *</label>
                            <select
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                            >
                                <option value="ABIERTO">🟡 Abierto</option>
                                <option value="EN_PROCESO">🔵 En Proceso</option>
                                <option value="CERRADO">🟢 Cerrado</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción del siniestro..."
                            rows="3"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : siniestro ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

SiniestroModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    siniestro: PropTypes.object,
    polizas: PropTypes.array,
    proveedores: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default SiniestroModal;
