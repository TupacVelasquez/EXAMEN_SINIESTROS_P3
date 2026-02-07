import PropTypes from 'prop-types';

function Dashboard({ polizaStats, proveedorStats, siniestroStats }) {
    const cards = [
        {
            title: 'Total Pólizas',
            value: polizaStats?.total || 0,
            icon: '📋',
            color: 'blue',
        },
        {
            title: 'Total Proveedores',
            value: proveedorStats?.total || 0,
            icon: '🏭',
            color: 'purple',
        },
        {
            title: 'Total Siniestros',
            value: siniestroStats?.total || 0,
            icon: '⚠️',
            color: 'orange',
        },
        {
            title: 'Siniestros Abiertos',
            value: siniestroStats?.abiertos || 0,
            icon: '🟡',
            color: 'yellow',
        },
        {
            title: 'En Proceso',
            value: siniestroStats?.enProceso || 0,
            icon: '🔵',
            color: 'cyan',
        },
        {
            title: 'Cerrados',
            value: siniestroStats?.cerrados || 0,
            icon: '🟢',
            color: 'green',
        },
    ];

    return (
        <div className="dashboard">
            <div className="stats-grid">
                {cards.map((card, index) => (
                    <div key={index} className={`stat-card stat-${card.color}`}>
                        <div className="stat-icon">{card.icon}</div>
                        <div className="stat-content">
                            <h3 className="stat-value">{card.value}</h3>
                            <p className="stat-label">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    polizaStats: PropTypes.object,
    proveedorStats: PropTypes.object,
    siniestroStats: PropTypes.object,
};

export default Dashboard;
