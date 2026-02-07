import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

function ProveedorTable({ proveedores, loading, onEdit, onDelete }) {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!proveedores || proveedores.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">🏭</span>
                <p>No hay proveedores registrados</p>
            </div>
        );
    }

    const getTipoIcon = (tipo) => {
        const icons = {
            TALLER: '🔧',
            CLINICA: '🏥',
            GRUA: '🚗',
        };
        return icons[tipo] || '🏢';
    };

    const getTipoBadge = (tipo) => {
        const badges = {
            TALLER: 'badge-info',
            CLINICA: 'badge-success',
            GRUA: 'badge-warning',
        };
        return badges[tipo] || 'badge-secondary';
    };

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor) => (
                        <tr key={proveedor.id}>
                            <td>{proveedor.id}</td>
                            <td><strong>{proveedor.nombre}</strong></td>
                            <td>
                                <span className={`badge ${getTipoBadge(proveedor.tipo)}`}>
                                    {getTipoIcon(proveedor.tipo)} {proveedor.tipo}
                                </span>
                            </td>
                            <td>{proveedor.ciudad}</td>
                            <td className="actions-cell">
                                <button
                                    className="btn btn-sm btn-edit"
                                    onClick={() => onEdit(proveedor)}
                                    title="Editar"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-sm btn-delete"
                                    onClick={() => onDelete(proveedor)}
                                    title="Eliminar"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ProveedorTable.propTypes = {
    proveedores: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProveedorTable;
