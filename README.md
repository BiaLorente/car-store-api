# Car Store API

Uma API para gerenciamento de vendas de veículos automotores, implementada seguindo os princípios da **Clean Architecture** e **SOLID**.

## 🏗️ Arquitetura

Este projeto segue a **Clean Architecture** com as seguintes camadas:

```
src/
├── domain/                    # Camada de Domínio (Entidades e Regras de Negócio)
│   ├── Vehicle.ts            # Entidade principal
│   ├── VehicleRepository.ts  # Interface do repositório
│   └── PaymentGateway.ts     # Interface do gateway de pagamento
├── application/              # Camada de Aplicação (Casos de Uso)
│   ├── CreateVehicle.ts
│   ├── EditVehicle.ts
│   ├── SellVehicle.ts
│   ├── ListVehiclesForSale.ts
│   ├── ListSoldVehicles.ts
│   └── UpdatePaymentStatus.ts
├── infrastructure/           # Camada de Infraestrutura (Implementações)
│   ├── InMemoryVehicleRepository.ts
│   ├── MockPaymentGateway.ts
│   └── container/
│       └── DependencyContainer.ts
└── interfaces/               # Camada de Interface (Controllers e Rotas)
    ├── controllers/
    │   └── VehicleController.ts
    └── routes/
        └── vehicleRoutes.ts
```

## 🎯 Princípios SOLID Aplicados

### 1. **Single Responsibility Principle (SRP)**
- Cada classe tem uma única responsabilidade
- `VehicleController`: Apenas gerencia requisições HTTP
- `CreateVehicle`: Apenas cria veículos
- `InMemoryVehicleRepository`: Apenas gerencia dados em memória

### 2. **Open/Closed Principle (OCP)**
- Abertas para extensão, fechadas para modificação
- Novos tipos de repositório podem ser implementados sem modificar o código existente
- Novos gateways de pagamento podem ser adicionados facilmente

### 3. **Liskov Substitution Principle (LSP)**
- Implementações podem ser substituídas por suas interfaces
- `InMemoryVehicleRepository` pode ser substituído por `DatabaseVehicleRepository`
- `MockPaymentGateway` pode ser substituído por `RealPaymentGateway`

### 4. **Interface Segregation Principle (ISP)**
- Interfaces específicas para cada responsabilidade
- `VehicleRepository` para operações de veículos
- `PaymentGateway` para operações de pagamento

### 5. **Dependency Inversion Principle (DIP)**
- Dependências de alto nível não dependem de baixo nível
- Use cases dependem de interfaces, não de implementações
- `DependencyContainer` gerencia todas as dependências

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker
- Kubernetes (Minikube para desenvolvimento local)

### Execução Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npx ts-node src/interfaces/app.ts
```

### Execução com Docker

```bash
# Build e execução com Docker Compose
docker-compose up --build

# Ou build manual
docker build -t car-store-api .
docker run -p 3000:3000 car-store-api
```

### Execução com Kubernetes

```bash
# Iniciar Minikube
minikube start

# Build da imagem no contexto do Minikube
eval $(minikube docker-env)
docker build -t car-store-api:latest .

# Aplicar manifests
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Acessar a aplicação
minikube service car-store-api
```

## 📡 Endpoints da API

### Veículos
- `POST /api/vehicles` - Criar veículo
- `PUT /api/vehicles/:id` - Editar veículo
- `POST /api/vehicles/:id/sell` - Vender veículo
- `GET /api/vehicles/for-sale` - Listar veículos à venda
- `GET /api/vehicles/sold` - Listar veículos vendidos

### Webhook
- `POST /api/webhook/payment-status` - Atualizar status de pagamento

### Documentação
- `GET /api-docs` - Swagger UI

## 🧪 Testando a API

### Criar um veículo
```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "color": "White",
    "price": 50000
  }'
```

### Listar veículos à venda
```bash
curl http://localhost:3000/api/vehicles/for-sale
```

### Vender um veículo
```bash
curl -X POST http://localhost:3000/api/vehicles/{id}/sell \
  -H "Content-Type: application/json" \
  -d '{
    "buyerCpf": "123.456.789-00",
    "saleDate": "2024-01-15T10:00:00Z",
    "paymentCode": "PAY123456"
  }'
```

## 🔄 Padrões de Design

### Repository Pattern
- Abstrai acesso a dados
- Permite troca fácil de implementações
- Facilita testes unitários

### Use Case Pattern
- Encapsula regras de negócio
- Mantém domínio limpo
- Facilita manutenção

### Gateway Pattern
- Abstrai serviços externos
- Permite mock para testes
- Facilita integração

## 📊 Estrutura de Dados

### Vehicle
```typescript
{
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  status: 'for_sale' | 'sold';
  buyerCpf?: string;
  saleDate?: Date;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  paymentCode?: string;
}
```

## 🐳 Kubernetes

### Manifests
- `deployment.yaml` - Deployment da aplicação
- `service.yaml` - Service para exposição
- `configmap.yaml` - Configurações
- `secret.yaml` - Dados sensíveis

### Comandos Úteis
```bash
# Verificar status
kubectl get all

# Ver logs
kubectl logs -f deployment/car-store-api

# Escalar
kubectl scale deployment car-store-api --replicas=3

# Deletar tudo
kubectl delete -f k8s/
```

## 🧪 Testes

Para executar testes (quando implementados):
```bash
npm test
```

## 📝 Documentação da API

Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

## 🔧 Configuração

### Variáveis de Ambiente
- `NODE_ENV` - Ambiente (development/production)
- `PORT` - Porta da aplicação (padrão: 3000)

### Kubernetes
- ConfigMap: `NODE_ENV=production`
- Secret: `SECRET_KEY` (base64 encoded)

## 🚀 Próximos Passos

1. **Implementar testes unitários**
2. **Adicionar validação de entrada**
3. **Implementar logging estruturado**
4. **Adicionar monitoramento**
5. **Implementar cache**
6. **Adicionar autenticação/autorização**

## 📄 Licença

Este projeto é parte de um desafio técnico para implementação de Clean Architecture.
