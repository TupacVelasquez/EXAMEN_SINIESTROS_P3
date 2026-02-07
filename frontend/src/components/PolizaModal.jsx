import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PolizaModal({ isOpen, onClose, onSave, poliza, isLoading }) {
    const [formData, setFormData] = useState({
        numeroPoliza: '',
        tipo: '',
        estado: 'ACTIVA',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (poliza) {
            setFormData({
                numeroPoliza: poliza.numeroPoliza || '',
                tipo: poliza.tipo || '',
                estado: poliza.estado || 'ACTIVA',
            });
        } else {
            setFormData({
                numeroPoliza: '',
                tipo: '',
                estado: 'ACTIVA',
            });
        }
        setErrors({});
    }, [poliza, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.numeroPoliza.trim()) {
            newErrors.numeroPoliza = 'El número de póliza es obligatorio';
        }
        if (!formData.tipo.trim()) {
            newErrors.tipo = 'El tipo es obligatorio';
        }
        if (!formData.estado) {
            newErrors.estado = 'El estado es obligatorio';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
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
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{poliza ? '✏️ Editar Póliza' : '➕ Nueva Póliza'}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="numeroPoliza">Número de Póliza *</label>
                        <input
                            type="text"
                            id="numeroPoliza"
                            name="numeroPoliza"
                            value={formData.numeroPoliza}
                            onChange={handleChange}
                            placeholder="Ej: POL-2024-001"
                            className={errors.numeroPoliza ? 'error' : ''}
                        />
                        {errors.numeroPoliza && <span className="error-text">{errors.numeroPoliza}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipo">Tipo *</label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className={errors.tipo ? 'error' : ''}
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="Auto">Auto</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Vida">Vida</option>
                            <option value="Salud">Salud</option>
                            <option value="Empresarial">Empresarial</option>
                        </select>
                        {errors.tipo && <span className="error-text">{errors.tipo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado *</label>
                        <select
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className={errors.estado ? 'error' : ''}
                        >
                            <option value="ACTIVA">Activa</option>
                            <option value="INACTIVA">Inactiva</option>
                            <option value="SUSPENDIDA">Suspendida</option>
                        </select>
                        {errors.estado && <span className="error-text">{errors.estado}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : poliza ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

PolizaModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    poliza: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default PolizaModal;
