import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProveedorModal({ isOpen, onClose, onSave, proveedor, isLoading }) {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        ciudad: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (proveedor) {
            setFormData({
                nombre: proveedor.nombre || '',
                tipo: proveedor.tipo || '',
                ciudad: proveedor.ciudad || '',
            });
        } else {
            setFormData({
                nombre: '',
                tipo: '',
                ciudad: '',
            });
        }
        setErrors({});
    }, [proveedor, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        }
        if (!formData.tipo) {
            newErrors.tipo = 'El tipo es obligatorio';
        }
        if (!formData.ciudad.trim()) {
            newErrors.ciudad = 'La ciudad es obligatoria';
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
                    <h2>{proveedor ? '✏️ Editar Proveedor' : '➕ Nuevo Proveedor'}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del proveedor"
                            className={errors.nombre ? 'error' : ''}
                        />
                        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
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
                            <option value="TALLER">🔧 Taller</option>
                            <option value="CLINICA">🏥 Clínica</option>
                            <option value="GRUA">🚗 Grúa</option>
                        </select>
                        {errors.tipo && <span className="error-text">{errors.tipo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad *</label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            placeholder="Ciudad del proveedor"
                            className={errors.ciudad ? 'error' : ''}
                        />
                        {errors.ciudad && <span className="error-text">{errors.ciudad}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : proveedor ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

ProveedorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    proveedor: PropTypes.object,
    isLoading: PropTypes.bool,
};

export default ProveedorModal;
