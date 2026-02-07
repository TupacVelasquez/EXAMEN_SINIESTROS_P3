import PropTypes from 'prop-types';
import './Sidebar.css';

function Sidebar({ activeSection, onSectionChange }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'polizas', label: 'Pólizas', icon: '📋' },
        { id: 'proveedores', label: 'Proveedores', icon: '🏭' },
        { id: 'siniestros', label: 'Siniestros', icon: '⚠️' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="logo">🛡️ SiniestrosApp</h1>
                <span className="subtitle">Sistema de Gestión</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => onSectionChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p>© 2026 ESPE</p>
                <p className="version">v1.0.0</p>
            </div>
        </aside>
    );
}

Sidebar.propTypes = {
    activeSection: PropTypes.string.isRequired,
    onSectionChange: PropTypes.func.isRequired,
};

export default Sidebar;
