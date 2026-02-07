import axios from 'axios';

// En producción (K8s), Nginx redirige /api/* al backend
// En desarrollo, Vite proxy redirige /api a localhost:3001
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios CRUD para Pólizas
export const polizaService = {
  getAll: async () => {
    const response = await api.get('/polizas');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/polizas/${id}`);
    return response.data;
  },
  create: async (poliza) => {
    const response = await api.post('/polizas', poliza);
    return response.data;
  },
  update: async (id, poliza) => {
    const response = await api.put(`/polizas/${id}`, poliza);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/polizas/${id}`);
  },
};

// Servicios CRUD para Proveedores
export const proveedorService = {
  getAll: async () => {
    const response = await api.get('/proveedores');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/proveedores/${id}`);
    return response.data;
  },
  getByTipo: async (tipo) => {
    const response = await api.get(`/proveedores/tipo/${tipo}`);
    return response.data;
  },
  create: async (proveedor) => {
    const response = await api.post('/proveedores', proveedor);
    return response.data;
  },
  update: async (id, proveedor) => {
    const response = await api.put(`/proveedores/${id}`, proveedor);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/proveedores/${id}`);
  },
};

// Servicios CRUD para Siniestros
export const siniestroService = {
  getAll: async () => {
    const response = await api.get('/siniestros');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/siniestros/${id}`);
    return response.data;
  },
  getByEstado: async (estado) => {
    const response = await api.get(`/siniestros/estado/${estado}`);
    return response.data;
  },
  create: async (siniestro) => {
    const response = await api.post('/siniestros', siniestro);
    return response.data;
  },
  update: async (id, siniestro) => {
    const response = await api.put(`/siniestros/${id}`, siniestro);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/siniestros/${id}`);
  },
};

export default api;
