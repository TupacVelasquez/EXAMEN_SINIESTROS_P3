import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PolizaTable from './components/PolizaTable';
import PolizaModal from './components/PolizaModal';
import ProveedorTable from './components/ProveedorTable';
import ProveedorModal from './components/ProveedorModal';
import SiniestroTable from './components/SiniestroTable';
import SiniestroModal from './components/SiniestroModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Notification from './components/Notification';
import { usePolizas, useProveedores, useSiniestros } from './hooks/useData';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Hooks para cada entidad
  const {
    polizas, loading: loadingPolizas, refetch: refetchPolizas,
    createPoliza, updatePoliza, deletePoliza,
  } = usePolizas();

  const {
    proveedores, loading: loadingProveedores, refetch: refetchProveedores,
    createProveedor, updateProveedor, deleteProveedor,
  } = useProveedores();

  const {
    siniestros, loading: loadingSiniestros, stats: siniestroStats, refetch: refetchSiniestros,
    createSiniestro, updateSiniestro, deleteSiniestro,
  } = useSiniestros();

  // Stats para el dashboard
  const polizaStats = { total: polizas.length };
  const proveedorStats = { total: proveedores.length };

  const addNotification = useCallback((type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  // Handlers genéricos para CRUD
  const handleSavePoliza = async (formData) => {
    setIsProcessing(true);
    try {
      if (selectedItem) {
        await updatePoliza(selectedItem.id, formData);
        addNotification('success', 'Póliza actualizada correctamente');
      } else {
        await createPoliza(formData);
        addNotification('success', 'Póliza creada correctamente');
      }
      setIsModalOpen(false);
    } catch (error) {
      addNotification('error', error.response?.data?.message || 'Error al guardar');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveProveedor = async (formData) => {
    setIsProcessing(true);
    try {
      if (selectedItem) {
        await updateProveedor(selectedItem.id, formData);
        addNotification('success', 'Proveedor actualizado correctamente');
      } else {
        await createProveedor(formData);
        addNotification('success', 'Proveedor creado correctamente');
      }
      setIsModalOpen(false);
    } catch (error) {
      addNotification('error', error.response?.data?.message || 'Error al guardar');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveSiniestro = async (formData) => {
    setIsProcessing(true);
    try {
      if (selectedItem) {
        await updateSiniestro(selectedItem.id, formData);
        addNotification('success', 'Siniestro actualizado correctamente');
      } else {
        await createSiniestro(formData);
        addNotification('success', 'Siniestro creado correctamente');
      }
      setIsModalOpen(false);
    } catch (error) {
      addNotification('error', error.response?.data?.message || 'Error al guardar');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    setIsProcessing(true);
    try {
      if (activeSection === 'polizas') {
        await deletePoliza(id);
        addNotification('success', 'Póliza eliminada correctamente');
      } else if (activeSection === 'proveedores') {
        await deleteProveedor(id);
        addNotification('success', 'Proveedor eliminado correctamente');
      } else if (activeSection === 'siniestros') {
        await deleteSiniestro(id);
        addNotification('success', 'Siniestro eliminado correctamente');
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      addNotification('error', 'Error al eliminar');
    } finally {
      setIsProcessing(false);
    }
  };

  const getRefetchFunction = () => {
    if (activeSection === 'polizas') return refetchPolizas;
    if (activeSection === 'proveedores') return refetchProveedores;
    if (activeSection === 'siniestros') return refetchSiniestros;
    return () => { };
  };

  const getSectionTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      polizas: 'Gestión de Pólizas',
      proveedores: 'Gestión de Proveedores',
      siniestros: 'Gestión de Siniestros',
    };
    return titles[activeSection] || 'Dashboard';
  };

  const getEntityName = () => {
    const names = {
      polizas: 'la póliza',
      proveedores: 'el proveedor',
      siniestros: 'el siniestro',
    };
    return names[activeSection] || 'el registro';
  };

  const getButtonLabel = () => {
    const labels = {
      polizas: '+ Nueva Póliza',
      proveedores: '+ Nuevo Proveedor',
      siniestros: '+ Nuevo Siniestro',
    };
    return labels[activeSection] || '+ Nuevo';
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="main-content">
        <header className="header">
          <h1>{getSectionTitle()}</h1>
          {activeSection !== 'dashboard' && (
            <button className="btn btn-primary" onClick={handleOpenCreate}>
              {getButtonLabel()}
            </button>
          )}
        </header>

        {activeSection === 'dashboard' && (
          <Dashboard
            polizaStats={polizaStats}
            proveedorStats={proveedorStats}
            siniestroStats={siniestroStats}
          />
        )}

        {activeSection === 'polizas' && (
          <div className="table-container">
            <div className="table-header">
              <h2>📋 Lista de Pólizas</h2>
              <button className="btn btn-secondary" onClick={refetchPolizas}>
                ↻ Actualizar
              </button>
            </div>
            <PolizaTable
              polizas={polizas}
              loading={loadingPolizas}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        )}

        {activeSection === 'proveedores' && (
          <div className="table-container">
            <div className="table-header">
              <h2>🏭 Lista de Proveedores</h2>
              <button className="btn btn-secondary" onClick={refetchProveedores}>
                ↻ Actualizar
              </button>
            </div>
            <ProveedorTable
              proveedores={proveedores}
              loading={loadingProveedores}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        )}

        {activeSection === 'siniestros' && (
          <div className="table-container">
            <div className="table-header">
              <h2>⚠️ Lista de Siniestros</h2>
              <button className="btn btn-secondary" onClick={refetchSiniestros}>
                ↻ Actualizar
              </button>
            </div>
            <SiniestroTable
              siniestros={siniestros}
              polizas={polizas}
              proveedores={proveedores}
              loading={loadingSiniestros}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {activeSection === 'polizas' && (
        <PolizaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePoliza}
          poliza={selectedItem}
          isLoading={isProcessing}
        />
      )}

      {activeSection === 'proveedores' && (
        <ProveedorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProveedor}
          proveedor={selectedItem}
          isLoading={isProcessing}
        />
      )}

      {activeSection === 'siniestros' && (
        <SiniestroModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSiniestro}
          siniestro={selectedItem}
          polizas={polizas}
          proveedores={proveedores}
          isLoading={isProcessing}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        item={selectedItem}
        entityName={getEntityName()}
        isLoading={isProcessing}
      />

      <Notification notifications={notifications} onRemove={removeNotification} />
    </div>
  );
}

export default App;
