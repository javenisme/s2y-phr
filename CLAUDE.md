# Medplum Healthcare Platform - Claude Code Documentation

## Project Overview

Medplum is a comprehensive open-source healthcare developer platform built as a TypeScript monorepo that provides FHIR-compliant healthcare data management, electronic health records (EHR), and clinical applications. This platform enables flexible and rapid development of healthcare apps with strong emphasis on interoperability, security, and compliance.

**Repository:** https://github.com/medplum/medplum  
**Documentation:** https://www.medplum.com/docs  
**License:** Apache 2.0  
**Current Version:** 4.3.9

## Architecture Overview

### Core Components
- **Medplum Auth** - OAuth, OpenID, and SMART-on-FHIR authentication
- **Medplum CDR** - Clinical Data Repository with FHIR compliance
- **Medplum API** - RESTful FHIR-based API
- **Medplum SDK** - Client libraries for API interaction  
- **Medplum App** - Web application for data management
- **Medplum Bots** - Server-side automation and logic
- **UI Components** - React healthcare-specific component library

### Technology Stack

**Backend:**
- Node.js with TypeScript
- Express.js web framework
- PostgreSQL for data storage
- Redis for caching and background jobs
- AWS/Azure/GCP cloud support

**Frontend:**
- React 19 with TypeScript
- Mantine UI framework
- React Router for SPA navigation
- Vite for build tooling

**Development:**
- Turbo monorepo management
- ESLint + Prettier for code quality
- Jest + Playwright for testing
- Docker for containerization

## Monorepo Structure

```
medplum/
├── packages/
│   ├── agent/           # On-premise agent for local systems
│   ├── app/             # Main web application
│   ├── bot-layer/       # AWS Lambda layer for bots
│   ├── ccda/            # C-CDA document processing
│   ├── cdk/             # AWS CDK infrastructure
│   ├── cli/             # Command line interface
│   ├── core/            # Core shared library
│   ├── definitions/     # FHIR data definitions
│   ├── docs/            # Documentation site
│   ├── fhir-router/     # FHIR URL routing
│   ├── fhirtypes/       # TypeScript FHIR definitions
│   ├── hl7/             # HL7 message processing
│   ├── react/           # React component library
│   ├── react-hooks/     # React state management
│   └── server/          # Backend API server
├── examples/            # Demo applications and tutorials
├── scripts/             # Build and deployment scripts
└── terraform/           # Infrastructure as code
```

## Key Packages Deep Dive

### packages/core - Foundation Library
**Main Files:**
- `src/client.ts` - MedplumClient for FHIR operations
- `src/fhirpath/` - FHIRPath expression engine
- `src/search/` - Advanced FHIR search implementation
- `src/auth.ts` - Authentication utilities

**Key Features:**
- Complete FHIR R4 TypeScript implementation
- FHIRPath expression parser and evaluator
- OAuth 2.0, SMART-on-FHIR, JWT authentication
- Resource validation using FHIR StructureDefinitions
- WebSocket subscriptions for real-time events
- Caching with LRU implementation

### packages/server - API Server
**Main Files:**
- `src/app.ts` - Express application configuration
- `src/fhir/` - FHIR operation handlers
- `src/auth/` - Authentication middleware
- `src/database.ts` - PostgreSQL connection management

**Key Features:**
- RESTful FHIR API with full R4 compliance
- Repository pattern for data access
- Rate limiting and quota management
- Comprehensive audit logging
- Multi-tenant architecture with project isolation
- Background job processing

### packages/app - Web Application
**Main Files:**
- `src/App.tsx` - Main application component
- `src/admin/` - Administrative interfaces
- `src/resource/` - Resource management pages

**Key Features:**
- Patient and provider portals
- Resource CRUD operations
- Timeline views for patient history
- Admin interfaces for project management
- Dynamic form generation from FHIR structures

### packages/react - UI Components
**Main Files:**
- `src/index.ts` - Component exports
- `src/ResourceTable.tsx` - Data grid for FHIR resources
- `src/ResourceForm.tsx` - Dynamic forms
- `src/Timeline.tsx` - Patient timeline component

**Key Features:**
- 200+ healthcare-specific React components
- FHIR resource display and editing
- Patient timeline and encounter management
- Questionnaire form rendering
- Search and filter interfaces

## Development Workflows

### Getting Started
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm test

# Build all packages
npm run build
```

### Key Scripts
- `npm run build` - Build all packages except docs and examples
- `npm run build:fast` - Quick build of app and server only
- `npm run test` - Run test suites across packages
- `npm run lint` - Run ESLint across codebase
- `npm run clean` - Clean build artifacts

### Testing Strategy
- **Unit Tests:** Jest with >95% coverage
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Playwright for user workflows
- **Component Tests:** React Testing Library

### Code Quality
- **ESLint:** Strict TypeScript rules with custom config
- **Prettier:** Consistent code formatting
- **Biome:** Additional linting and formatting
- **API Extractor:** TypeScript declaration management

## FHIR Implementation

### Compliance
- **FHIR R4** complete implementation
- **SMART-on-FHIR** app launch framework
- **CDS Hooks** for clinical decision support
- **FHIR Bulk Data** for large dataset operations
- **HL7 FHIR** resource validation

### Search Capabilities
- All FHIR search parameters supported
- Chained searches and reverse includes
- Full-text search with PostgreSQL
- Geographic proximity searches
- Custom search parameters

### Operations
- Standard FHIR operations ($validate, $expand, etc.)
- Custom operations framework
- Batch and transaction bundles
- Compartment-based access control

## Security & Compliance

### Authentication
- OAuth 2.0 with PKCE
- SMART-on-FHIR launch sequences
- JWT token management
- Multi-factor authentication support

### Authorization  
- Role-based access control (RBAC)
- FHIR AccessPolicy resources
- Compartment-based security
- Attribute-based access control

### Compliance
- HIPAA compliance features
- SOC 2 Type II certified
- GDPR privacy controls
- Audit logging for all operations
- Data encryption at rest and in transit

## Integration Capabilities

### Standards Support
- **HL7 v2** message processing
- **C-CDA** document conversion
- **DICOM** medical imaging
- **IHE** integration profiles

### External Systems
- EHR system integrations
- Laboratory information systems
- Pharmacy systems
- Billing and claims processing

### APIs & Webhooks
- RESTful FHIR API
- GraphQL endpoint
- WebSocket subscriptions
- Webhook notifications for events

## Deployment & Infrastructure

### Self-Hosting Options
- Docker Compose for development
- Kubernetes deployment charts
- AWS CDK infrastructure templates
- Terraform configurations for multi-cloud

### Cloud Support
- **AWS:** Complete CDK templates
- **Azure:** Resource Manager templates
- **GCP:** Deployment Manager configs
- **On-premise:** Docker and Kubernetes

### Scaling Considerations
- Horizontal scaling with load balancers
- Database read replicas
- Redis clustering for cache
- Background job processing with queues

## Examples & Demos

The repository includes 20+ complete example applications:
- **foomedical/** - Complete EHR demonstration
- **medplum-patient-intake-demo/** - Patient intake workflows
- **medplum-provider/** - Provider portal
- **medplum-chat-demo/** - Healthcare messaging
- **medplum-eligibility-demo/** - Insurance eligibility checks

## Common Tasks & Patterns

### Creating Resources
```typescript
const patient = await medplum.createResource({
  resourceType: 'Patient',
  name: [{ given: ['John'], family: 'Doe' }],
  // ... other patient data
});
```

### Searching Resources
```typescript
const results = await medplum.searchResources('Patient', {
  name: 'Smith',
  birthdate: 'ge2000-01-01',
  _sort: '-_lastUpdated'
});
```

### Using React Components
```typescript
import { ResourceForm, PatientTable } from '@medplum/react';

function MyComponent() {
  return (
    <ResourceForm 
      resourceType="Patient"
      onSubmit={handleSubmit}
    />
  );
}
```

### Bot Development
```typescript
import { BotEvent, MedplumClient } from '@medplum/core';

export async function handler(medplum: MedplumClient, event: BotEvent) {
  // Process webhook events, run scheduled tasks, etc.
  const patient = await medplum.readResource('Patient', event.input.id);
  // ... bot logic
}
```

## Development Guidelines

### TypeScript Standards
- Strict TypeScript configuration
- Complete type coverage required
- Interface-driven development
- Generic programming for reusability

### React Patterns  
- Functional components with hooks
- Context for state management
- Memoization for performance
- Accessibility (a11y) compliance

### FHIR Best Practices
- Use proper FHIR resource types
- Follow FHIR naming conventions  
- Implement proper error handling
- Validate resources before submission

## Troubleshooting & Support

### Common Issues
- **Database connection:** Check PostgreSQL configuration
- **Authentication errors:** Verify OAuth client setup
- **CORS issues:** Configure allowed origins properly
- **Performance:** Enable Redis caching and database indexing

### Debugging
- Use `DEBUG=medplum:*` for verbose logging
- Browser dev tools for client-side issues
- PostgreSQL logs for database queries
- Redis monitoring for cache performance

### Resources
- **Documentation:** https://www.medplum.com/docs
- **GitHub Issues:** https://github.com/medplum/medplum/issues
- **Discord Community:** Active developer community
- **Example Code:** Extensive examples in repository

## Contributing

### Development Setup
1. Clone repository
2. Install Node.js 20+ and npm
3. Run `npm install` in root directory
4. Set up PostgreSQL and Redis locally
5. Copy example config files and customize
6. Run `npm run dev` to start development servers

### Code Contribution Process
1. Fork the repository
2. Create feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit pull request with clear description
6. Address review feedback

### Standards
- Follow existing code patterns
- Write comprehensive tests
- Update documentation as needed
- Maintain backward compatibility
- Sign Developer Certificate of Origin (DCO)

---

This documentation provides a comprehensive overview of the Medplum healthcare platform codebase for Claude Code development assistance. The platform represents a mature, production-ready healthcare infrastructure with extensive FHIR compliance, modern web technologies, and healthcare-specific features suitable for building everything from patient portals to comprehensive EHR systems.