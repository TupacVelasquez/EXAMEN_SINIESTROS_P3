import { useState, useEffect } from 'react';

const initialFormData = {
    name: '',
    brand: '',
    style: '',
    alcoholPercentage: '',
    volumeMl: '',
    price: '',
    description: '',
    stock: '',
    status: 'Activo',
};

const BielaModal = ({ isOpen, onClose, onSave, biela, isLoading }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const isEditing = !!biela;

    useEffect(() => {
        if (biela) {
            setFormData({
                name: biela.name || '',
                brand: biela.brand || '',
                style: biela.style || '',
                alcoholPercentage: biela.alcoholPercentage || '',
                volumeMl: biela.volumeMl || '',
                price: biela.price || '',
                description: biela.description || '',
                stock: biela.stock || '',
                status: biela.status || 'Activo',
            });
        } else {
            setFormData(initialFormData);
        }
        setErrors({});
    }, [biela, isOpen]);

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!formData.style.trim()) {
            newErrors.style = 'El estilo es obligatorio';
        }

        if (!formData.alcoholPercentage || formData.alcoholPercentage <= 0) {
            newErrors.alcoholPercentage = 'Debe ser mayor a 0';
        }

        if (!formData.volumeMl || formData.volumeMl <= 0) {
            newErrors.volumeMl = 'Debe ser mayor a 0';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Debe ser mayor a 0';
        }

        if (formData.stock < 0) {
            newErrors.stock = 'No puede ser negativo';
        }

        if (formData.description && formData.description.length > 255) {
            newErrors.description = 'Máximo 255 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Editar Cerveza' : 'Nueva Cerveza'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="name">Nombre *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nombre de la cerveza"
                            />
                            {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="brand">Marca</label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Marca"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="style">Estilo *</label>
                                <input
                                    type="text"
                                    id="style"
                                    name="style"
                                    value={formData.style}
                                    onChange={handleChange}
                                    placeholder="IPA, Lager, Stout..."
                                />
                                {errors.style && <span className="form-error">{errors.style}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="alcoholPercentage">% Alcohol *</label>
                                <input
                                    type="number"
                                    id="alcoholPercentage"
                                    name="alcoholPercentage"
                                    value={formData.alcoholPercentage}
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                    placeholder="5.0"
                                />
                                {errors.alcoholPercentage && <span className="form-error">{errors.alcoholPercentage}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="volumeMl">Volumen (ml) *</label>
                                <input
                                    type="number"
                                    id="volumeMl"
                                    name="volumeMl"
                                    value={formData.volumeMl}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="330"
                                />
                                {errors.volumeMl && <span className="form-error">{errors.volumeMl}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">Precio *</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    placeholder="2.50"
                                />
                                {errors.price && <span className="form-error">{errors.price}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="100"
                                />
                                {errors.stock && <span className="form-error">{errors.stock}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Descripción de la cerveza (máx. 255 caracteres)"
                            />
                            {errors.description && <span className="form-error">{errors.description}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Estado</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BielaModal;
