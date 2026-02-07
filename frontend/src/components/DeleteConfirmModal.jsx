import PropTypes from 'prop-types';

function DeleteConfirmModal({ isOpen, onClose, onConfirm, item, entityName, isLoading }) {
    if (!isOpen) return null;

    const getDisplayName = () => {
        if (!item) return '';
        return item.numeroPoliza || item.nombre || item.numeroCaso || `ID: ${item.id}`;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>⚠️ Confirmar Eliminación</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <p>¿Está seguro de que desea eliminar {entityName || 'este registro'}:</p>
                    <p className="item-name"><strong>{getDisplayName()}</strong>?</p>
                    <p className="warning-text">Esta acción no se puede deshacer.</p>
                </div>

                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onConfirm(item.id)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

DeleteConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    item: PropTypes.object,
    entityName: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default DeleteConfirmModal;
