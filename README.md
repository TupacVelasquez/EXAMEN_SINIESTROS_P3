# 🛡️ Sistema de Gestión de Siniestros

Sistema distribuido para gestión de siniestros de seguros con Docker y Kubernetes.

## 📋 Modelo de Datos

| Entidad | Tipo | Campos |
|---------|------|--------|
| **Póliza** | Independiente | id, numeroPoliza (único), tipo, estado |
| **Proveedor** | Independiente | id, nombre, tipo (TALLER/CLÍNICA/GRÚA), ciudad |
| **Siniestro** | Dependiente | id, numeroCaso (único), fecha, descripcion, montoEstimado, estado, FK→Póliza, FK→Proveedor |

## 🏗️ Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│  Siniestros API │────▶│     MySQL       │
│  React + Nginx  │     │  Spring Boot 3  │     │   (Siniestros)  │
│     :80         │     │     :3001       │     │     :3306       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🚀 Despliegue en Kubernetes

### Requisitos
- Docker Desktop con Kubernetes habilitado
- kubectl configurado

### 1. Construir imágenes Docker

```bash
# Backend API
cd biela
docker build -t siniestros-api:latest .

# Frontend
cd ../frontend
docker build -t siniestros-frontend:latest .
```

### 2. Aplicar manifiestos de Kubernetes

```bash
cd k8s

# 1. Crear volúmenes persistentes
kubectl apply -f mysql-pv.yaml
kubectl apply -f postgresql-pv.yaml

# 2. Desplegar bases de datos
kubectl apply -f mysql-deployment.yaml
kubectl apply -f postgresql-deployment.yaml

# 3. Esperar a que las BD estén listas
kubectl wait --for=condition=ready pod -l app=mysql --timeout=120s
kubectl wait --for=condition=ready pod -l app=postgresql --timeout=120s

# 4. Desplegar API
kubectl apply -f siniestros-deployment.yaml

# 5. Desplegar Frontend
kubectl apply -f frontend-deployment.yaml
```

### 3. Verificar despliegue

```bash
# Ver pods
kubectl get pods

# Ver servicios
kubectl get services

# Ver logs del API
kubectl logs -l app=siniestros-api
```

### 4. Acceder a la aplicación

```bash
# Frontend
kubectl port-forward svc/frontend 8080:80

# API directamente
kubectl port-forward svc/siniestros-api 3001:3001
```

- **Frontend**: http://localhost:8080
- **API**: http://localhost:3001/api/polizas

## 📡 API Endpoints

### Pólizas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/polizas` | Listar todas |
| GET | `/api/polizas/{id}` | Obtener por ID |
| POST | `/api/polizas` | Crear nueva |
| PUT | `/api/polizas/{id}` | Actualizar |
| DELETE | `/api/polizas/{id}` | Eliminar |

### Proveedores
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proveedores` | Listar todos |
| GET | `/api/proveedores/{id}` | Obtener por ID |
| GET | `/api/proveedores/tipo/{tipo}` | Filtrar por tipo |
| POST | `/api/proveedores` | Crear nuevo |
| PUT | `/api/proveedores/{id}` | Actualizar |
| DELETE | `/api/proveedores/{id}` | Eliminar |

### Siniestros
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/siniestros` | Listar todos |
| GET | `/api/siniestros/{id}` | Obtener por ID |
| GET | `/api/siniestros/estado/{estado}` | Filtrar por estado |
| POST | `/api/siniestros` | Crear nuevo |
| PUT | `/api/siniestros/{id}` | Actualizar |
| DELETE | `/api/siniestros/{id}` | Eliminar |

## 🧪 Pruebas con cURL

```bash
# Crear póliza
curl -X POST http://localhost:3001/api/polizas \
  -H "Content-Type: application/json" \
  -d '{"numeroPoliza":"POL-001","tipo":"Auto","estado":"ACTIVA"}'

# Crear proveedor
curl -X POST http://localhost:3001/api/proveedores \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Taller Central","tipo":"TALLER","ciudad":"Quito"}'

# Crear siniestro
curl -X POST http://localhost:3001/api/siniestros \
  -H "Content-Type: application/json" \
  -d '{"numeroCaso":"SIN-001","fecha":"2026-02-06","descripcion":"Choque menor","montoEstimado":500,"estado":"ABIERTO","polizaId":1,"proveedorId":1}'
```

## 📁 Estructura del Proyecto

```
├── biela/                    # Backend Spring Boot
│   ├── src/main/java/com/espe/siniestros/
│   │   ├── controllers/      # REST Controllers
│   │   ├── models/entities/  # Entidades JPA
│   │   ├── repositories/     # Repositorios
│   │   ├── services/         # Servicios
│   │   └── config/           # Configuración
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── hooks/            # Custom hooks
│   │   └── services/         # API services
│   ├── Dockerfile
│   └── nginx.conf
└── k8s/                      # Kubernetes manifests
    ├── mysql-pv.yaml
    ├── mysql-deployment.yaml
    ├── postgresql-pv.yaml
    ├── postgresql-deployment.yaml
    ├── siniestros-deployment.yaml
    └── frontend-deployment.yaml
```

## 🛠️ Tecnologías

- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA
- **Base de Datos**: MySQL 8.0, PostgreSQL 15
- **Frontend**: React 18, Vite, Axios
- **Contenedores**: Docker, Nginx
- **Orquestación**: Kubernetes

## 👤 Autor

ESPE - Sistemas Distribuidos - 2026
