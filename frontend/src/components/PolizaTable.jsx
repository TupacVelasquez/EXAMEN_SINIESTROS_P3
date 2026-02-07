import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

function PolizaTable({ polizas, loading, onEdit, onDelete }) {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!polizas || polizas.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">📋</span>
                <p>No hay pólizas registradas</p>
            </div>
        );
    }

    const getEstadoBadge = (estado) => {
        const badges = {
            ACTIVA: 'badge-success',
            INACTIVA: 'badge-danger',
            SUSPENDIDA: 'badge-warning',
        };
        return badges[estado] || 'badge-secondary';
    };

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número Póliza</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {polizas.map((poliza) => (
                        <tr key={poliza.id}>
                            <td>{poliza.id}</td>
                            <td><strong>{poliza.numeroPoliza}</strong></td>
                            <td>{poliza.tipo}</td>
                            <td>
                                <span className={`badge ${getEstadoBadge(poliza.estado)}`}>
                                    {poliza.estado}
                                </span>
                            </td>
                            <td className="actions-cell">
                                <button
                                    className="btn btn-sm btn-edit"
                                    onClick={() => onEdit(poliza)}
                                    title="Editar"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-sm btn-delete"
                                    onClick={() => onDelete(poliza)}
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

PolizaTable.propTypes = {
    polizas: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default PolizaTable;
