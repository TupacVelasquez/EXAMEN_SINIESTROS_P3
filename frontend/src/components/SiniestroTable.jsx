import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

function SiniestroTable({ siniestros, polizas, proveedores, loading, onEdit, onDelete }) {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!siniestros || siniestros.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">⚠️</span>
                <p>No hay siniestros registrados</p>
            </div>
        );
    }

    const getEstadoBadge = (estado) => {
        const badges = {
            ABIERTO: 'badge-warning',
            EN_PROCESO: 'badge-info',
            CERRADO: 'badge-success',
        };
        return badges[estado] || 'badge-secondary';
    };

    const getPolizaNumero = (polizaId) => {
        if (!polizaId) return 'N/A';
        // Si el siniestro viene con el objeto poliza anidado
        if (typeof polizaId === 'object') return polizaId.numeroPoliza;
        const poliza = polizas?.find((p) => p.id === polizaId);
        return poliza?.numeroPoliza || `ID: ${polizaId}`;
    };

    const getProveedorNombre = (proveedorId) => {
        if (!proveedorId) return 'N/A';
        const proveedor = proveedores?.find((p) => p.id === proveedorId);
        return proveedor?.nombre || `ID: ${proveedorId}`;
    };

    const formatMonto = (monto) => {
        return new Intl.NumberFormat('es-EC', {
            style: 'currency',
            currency: 'USD',
        }).format(monto || 0);
    };

    const formatFecha = (fecha) => {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-EC');
    };

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>N° Caso</th>
                        <th>Fecha</th>
                        <th>Póliza</th>
                        <th>Proveedor</th>
                        <th>Monto Est.</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {siniestros.map((siniestro) => (
                        <tr key={siniestro.id}>
                            <td><strong>{siniestro.numeroCaso}</strong></td>
                            <td>{formatFecha(siniestro.fecha)}</td>
                            <td>{getPolizaNumero(siniestro.poliza)}</td>
                            <td>{getProveedorNombre(siniestro.proveedorId)}</td>
                            <td className="monto-cell">{formatMonto(siniestro.montoEstimado)}</td>
                            <td>
                                <span className={`badge ${getEstadoBadge(siniestro.estado)}`}>
                                    {siniestro.estado?.replace('_', ' ')}
                                </span>
                            </td>
                            <td className="actions-cell">
                                <button
                                    className="btn btn-sm btn-edit"
                                    onClick={() => onEdit(siniestro)}
                                    title="Editar"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-sm btn-delete"
                                    onClick={() => onDelete(siniestro)}
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

SiniestroTable.propTypes = {
    siniestros: PropTypes.array.isRequired,
    polizas: PropTypes.array,
    proveedores: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default SiniestroTable;
