import LoadingSpinner from './LoadingSpinner';

const BielaTable = ({ bielas, loading, onEdit, onDelete }) => {
    if (loading) {
        return <LoadingSpinner message="Cargando cervezas..." />;
    }

    if (bielas.length === 0) {
        return (
            <div className="empty-state">
                <div className="icon">🍺</div>
                <h3>No hay cervezas registradas</h3>
                <p>Comienza agregando tu primera cerveza</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Estilo</th>
                        <th>% Alcohol</th>
                        <th>Volumen</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bielas.map((biela) => (
                        <tr key={biela.id}>
                            <td>
                                <div className="product-name">
                                    <span className="product-icon">🍺</span>
                                    {biela.name}
                                </div>
                            </td>
                            <td>{biela.brand || '-'}</td>
                            <td>{biela.style}</td>
                            <td>{biela.alcoholPercentage}%</td>
                            <td>{biela.volumeMl} ml</td>
                            <td className="price">${biela.price?.toFixed(2)}</td>
                            <td>
                                <span className={`stock ${biela.stock <= 5 ? 'low' : ''}`}>
                                    {biela.stock}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge ${biela.status?.toLowerCase() === 'activo' ? 'active' : 'inactive'}`}>
                                    {biela.status || 'N/A'}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="btn-icon edit"
                                        onClick={() => onEdit(biela)}
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn-icon delete"
                                        onClick={() => onDelete(biela)}
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BielaTable;
