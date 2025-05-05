# Documentación Técnica de Ayrton

## Índice
1. [Introducción](#introducción)
2. [Objetivos del Proyecto](#objetivos-del-proyecto)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Especificaciones Técnicas](#especificaciones-técnicas)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Flujo de Trabajo](#flujo-de-trabajo)
7. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
8. [Pruebas y Calidad](#pruebas-y-calidad)
9. [Despliegue y Mantenimiento](#despliegue-y-mantenimiento)

## Introducción
En un mundo donde las exigencias laborales, personales y sociales crecen constantemente, las herramientas de gestión del tiempo se han vuelto esenciales. Sin embargo, muchas de estas aplicaciones no logran mantener a los usuarios comprometidos debido a su complejidad o a la falta de elementos motivacionales. Este vacío en el mercado representa una oportunidad para desarrollar una solución innovadora que combina la funcionalidad con la motivación personal.

Ayrton es un sistema de gestión de tareas gamificado que transforma la organización personal en una experiencia atractiva y motivadora. La plataforma combina la gestión eficiente de tareas con elementos de gamificación, creando un entorno donde la productividad se encuentra con el compromiso del usuario.

## Objetivos del Proyecto

### 1. Facilitar la organización de tareas
- Implementar un módulo que permita a los usuarios crear, editar, eliminar y listar sus tareas diarias o futuras
- Proporcionar una interfaz intuitiva para la gestión de tareas
- Asegurar la persistencia y sincronización de datos

### 2. Promover la priorización de actividades
- Diseñar un sistema de asignación de prioridades para identificar pendientes importantes
- Implementar categorización de tareas por importancia y urgencia
- Facilitar la toma de decisiones basada en prioridades

### 3. Aumentar el compromiso mediante desafíos
- Desarrollar un módulo de desafíos automáticos
- Implementar sistema de recompensas virtuales
- Establecer niveles de productividad progresivos
- Generar motivación a través de logros consecutivos

### 4. Proveer recordatorios efectivos
- Incluir un sistema de notificaciones en tiempo real
- Informar sobre plazos y tareas pendientes
- Mantener a los usuarios actualizados sobre sus avances
- Implementar alertas personalizables

### 5. Optimizar la gestión del tiempo
- Integrar un módulo de calendario interactivo
- Permitir la visualización de cronogramas
- Facilitar la agenda de eventos
- Implementar sincronización de fechas importantes

## Arquitectura del Sistema

### Modelo de Datos

El sistema está estructurado en torno a las siguientes entidades principales:

1. **Gestión de Usuarios**
   - Sistema de roles y permisos (`Role`)
   - Perfiles de usuario (`Users`)
   - Gestión de planes y suscripciones (`Plans`)

2. **Sistema de Tareas**
   - Tareas personalizables (`Tasks`)
   - Estados y prioridades
   - Sistema de recordatorios
   - Fechas de creación y vencimiento

3. **Sistema de Gamificación**
   - Desafíos (`Challenges`)
   - Sistema de ranking (`Ranking`)
   - Puntos y recompensas
   - Niveles de dificultad

4. **Sistema de Pagos**
   - Gestión de pagos (`Payments`)
   - Sistema de vales (`Voucher`)
   - Historial de transacciones

### Relaciones Principales

- Los usuarios pueden tener múltiples tareas (`User_task`)
- Los usuarios pueden suscribirse a diferentes planes (`Payment_user`)
- Las tareas pueden formar parte de desafíos (`Challenge_task`)
- Los usuarios pueden alcanzar diferentes rankings basados en sus logros (`challenge_ranking`)

### Diagrama de Arquitectura
[Incluir diagrama de arquitectura]

### Diagrama de Componentes
La arquitectura del sistema está organizada en módulos claramente definidos que interactúan entre sí:

#### 1. Componente de Presentación
El frontend está estructurado en interfaces HTML específicas para cada funcionalidad:
- **Interfaz General**: Manejo de la estructura base de la aplicación
- **Interfaz de Tareas**: Visualización y gestión de tareas incluyendo:
  - Listado de tareas
  - Nivel de prioridad
  - Visualización de tareas pendientes
  - CRUD de tareas
- **Interfaz de Calendario**: Gestión de eventos y fechas
- **Interfaz de Pagos**: Gestión de suscripciones y pagos

#### 2. Controladores Principales
La aplicación está dividida en controladores especializados:
- **Usuario_Controller**: Gestión de usuarios y autenticación
- **Tareas_Controller**: Manejo de operaciones CRUD de tareas
- **Desafio_Controller**: Control de la gamificación y desafíos
- **Calendario_Controller**: Gestión de eventos y recordatorios
- **ValidacionUsuarios_Controller**: Manejo de autenticación y permisos
- **Pagos_Controller**: Procesamiento de pagos y suscripciones

#### 3. Módulos Funcionales
El sistema se divide en cinco módulos principales:

##### MÓDULO UNO: Gestión de Usuarios
- Formulario de registro
- Gestión de perfiles
- Autenticación de usuarios

##### MÓDULO DOS: Creación de Tareas
- Interfaz de creación
- Gestión de tareas
- Nivel de prioridad
- Visualización de tareas

##### MÓDULO TRES: Desafíos
- Sistema de desafíos
- Recordatorios
- Gamificación

##### MÓDULO CUARTO: Recordatorios
- Gestión de notificaciones
- Fechas de finalización
- Alertas personalizadas

##### MÓDULO QUINTO: Pagos
- Tipos de pago
- Procesamiento de transacciones
- Gestión de suscripciones

#### 4. Capa de Persistencia
- **Datos_Usuario**: Almacenamiento de información de usuarios
- **Datos_Tarea**: Gestión de datos de tareas
- **Datos_Desafio**: Almacenamiento de desafíos y logros
- **Datos_Prioridad**: Gestión de prioridades
- **Datos_Transacciones**: Registro de operaciones de pago

### Interacciones entre Componentes

1. **Flujo de Usuarios**
   - El usuario interactúa con las interfaces HTML
   - Las solicitudes son procesadas por los controladores correspondientes
   - Los módulos funcionales ejecutan la lógica de negocio
   - La capa de persistencia gestiona el almacenamiento de datos

2. **Gestión de Tareas**
   - Las tareas se crean a través de la interfaz de usuario
   - El Tareas_Controller procesa las operaciones
   - El módulo de Creación de Tareas gestiona la lógica
   - Los datos se almacenan en la base de datos

3. **Sistema de Desafíos**
   - Los desafíos se gestionan mediante el Desafio_Controller
   - Se integran con el sistema de tareas
   - Los logros se registran en la base de datos
   - Las notificaciones se envían a través del módulo de recordatorios

### Componentes Principales
1. **Frontend**
   - [Descripción del componente]
   - Responsabilidades principales
   - Interacciones con otros componentes

2. **Backend**
   - [Descripción del componente]
   - Responsabilidades principales
   - Interacciones con otros componentes

3. **Base de Datos**
   - [Descripción del componente]
   - Modelo de datos
   - Estrategias de persistencia

## Especificaciones Técnicas

### Frontend
- **Framework**: React.js 19.0.0 con Next.js
- **Lenguaje**: TypeScript 5.7.2
- **Estilos**: Tailwind CSS
- **Estado Global**: Redux Toolkit
- **Enrutamiento**: React Router v6
- **Validaciones**: Zod
- **Testing**: Next.js Testing Library (basado en Jest)

### Backend
- **Framework**: Spring Boot 3.1.0
- **Java Version**: 17
- **Gestión de Dependencias**: Gradle
- **Base de Datos**: PostgreSQL 15
- **ORM**: Hibernate
- **Testing**: JUnit 5 + Mockito
- **Seguridad**: Spring Security + JWT

## Estructura del Proyecto

### Frontend (React)
```
frontend/
├── .next/              # Archivos generados por Next.js
├── public/             # Archivos estáticos públicos
├── src/
│   ├── app/            # Configuración principal de la aplicación
│   │   ├── (Routes)/   # Rutas principales (Login, Admin, etc.)
│   │   ├── Components/ # Componentes reutilizables
│   │   ├── Styles/     # Estilos globales
│   │   ├── Types/      # Definiciones de tipos
│   │   └── page.tsx    # Página principal
├── eslint.config.mjs   # Configuración de ESLint
├── next.config.ts      # Configuración de Next.js
├── package.json        # Dependencias del proyecto
├── tailwind.config.js  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Documentación del frontend
```

### Backend (Java)
```
backend/
├── .gradle/            # Archivos de configuración de Gradle
├── build/              # Archivos generados por el build
├── gradle/
│   └── wrapper/        # Wrapper de Gradle
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/ayrton/
│   │   │       ├── Business/    # Lógica de negocio
│   │   │       ├── Controller/  # Controladores REST
│   │   │       ├── Dto/         # Clases DTO
│   │   │       ├── Entity/      # Entidades JPA
│   │   │       ├── Repository/  # Repositorios JPA
│   │   │       └── Services/    # Servicios de aplicación
│   │   └── resources/           # Configuraciones (application.properties, etc.)
│   └── test/                    # Pruebas unitarias
├── build.gradle.kts    # Configuración de Gradle
├── settings.gradle.kts # Configuración de Gradle
└── gradlew             # Wrapper de Gradle
```

## Flujo de Trabajo

### Metodología de Desarrollo
El proyecto sigue una metodología ágil basada en Scrum, con las siguientes características:

#### Sprints
- Duración: 2 semanas
- Ceremonias principales:
  - Sprint Planning: Planificación de tareas y objetivos
  - Daily Standup: Reuniones diarias de sincronización
  - Sprint Review: Demostración de funcionalidades completadas
  - Sprint Retrospective: Análisis y mejora continua

#### Roles y Responsabilidades
- **Product Owner**: Gestión del backlog y priorización
- **Scrum Master**: Facilitador del proceso
- **Equipo de Desarrollo**: 
  - Desarrolladores Frontend (React)
  - Desarrolladores Backend (Java)
  - Diseñadores UI/UX
  - QA Engineers

### Proceso de Desarrollo

#### 1. Planificación
- Análisis de requerimientos
- Diseño de arquitectura
- Definición de sprints
- Estimación de tareas

#### 2. Desarrollo
- **Frontend (React)**
  - Desarrollo de componentes
  - Implementación de interfaces
  - Integración con APIs
  - Testing unitario con Next.js Testing Library

- **Backend (Java)**
  - Desarrollo de servicios REST
  - Implementación de lógica de negocio
  - Gestión de base de datos
  - Testing con JUnit

#### 3. Control de Calidad
- Testing automatizado
  - Pruebas unitarias
  - Pruebas de integración
  - Pruebas end-to-end
- Code review
- Análisis estático de código
- Validación de requerimientos

### Control de Versiones

#### Estructura de Ramas
- `main`: Código en producción
- `gabrielDev`: Rama de desarollo
- `julianDev`: Rama de desarollo
- `feature/*`: Nuevas funcionalidades
- `bugfix/*`: Corrección de errores
- `release/*`: Preparación de versiones

#### Flujo de Git
1. Crear rama feature desde develop
2. Desarrollo y commits frecuentes
3. Pull request con code review
4. Merge a develop
5. Deploy a staging
6. Release a producción

### Integración Continua (CI/CD)

#### Pipeline de Desarrollo
1. **Build**
   - Compilación del código
   - Instalación de dependencias
   - Validación de sintaxis

2. **Test**
   - Ejecución de pruebas unitarias
   - Cobertura de código
   - Análisis de calidad

3. **Deploy**
   - Build de artefactos
   - Despliegue a ambientes
   - Validación de despliegue

#### Ambientes
- **Desarrollo**: Para trabajo local
- **Testing**: Pruebas de QA
- **Staging**: Pre-producción
- **Producción**: Ambiente live

### Políticas de Código

#### Estándares de Codificación
- **Frontend**
  - ESLint para JavaScript/TypeScript
  - Prettier para formateo
  - Convenciones de React

- **Backend**
  - Checkstyle para Java
  - SonarQube para análisis
  - Convenciones de Spring Boot

#### Proceso de Code Review
1. Verificación de funcionalidad
2. Revisión de estándares
3. Optimización de código
4. Validación de tests
5. Aprobación por pares

### Gestión de Tareas
- Uso de AzureDevops para seguimiento
- Tablero Kanban para visualización
- Estimación por puntos de historia
- Priorización basada en valor de negocio

## Consideraciones de Seguridad

### Implementación con Spring Security

#### 1. Autenticación
- **JWT (JSON Web Tokens)**
  - Generación de tokens seguros
  - Validación de tokens en cada petición
  - Renovación automática de tokens
  - Blacklist de tokens revocados

- **Gestión de Sesiones**
  - Tiempo de expiración configurable
  - Manejo de sesiones concurrentes
  - Logout automático por inactividad
  - Registro de intentos de inicio de sesión

#### 2. Autorización
- **Control de Acceso Basado en Roles (RBAC)**
  - Roles predefinidos:
    - ROLE_ADMIN: Acceso total al sistema
    - ROLE_USER: Acceso a funcionalidades básicas
    - ROLE_PREMIUM: Acceso a funcionalidades premium

- **Anotaciones de Seguridad**
  - `@PreAuthorize`
  - `@PostAuthorize`
  - `@Secured`
  - `@RolesAllowed`

#### 3. Protección contra Vulnerabilidades Comunes
- **Cross-Site Scripting (XSS)**
  - Sanitización de entrada de datos
  - Headers de seguridad
  - Content Security Policy (CSP)

- **Cross-Site Request Forgery (CSRF)**
  - Tokens CSRF en formularios
  - Validación de origen de peticiones
  - Protección en endpoints sensibles

- **SQL Injection**
  - Uso de JPA/Hibernate
  - Prepared Statements
  - Validación de parámetros

#### 4. Configuración de Seguridad
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .antMatchers("/api/premium/**").hasRole("PREMIUM")
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

#### 5. Gestión de Contraseñas
- Encriptación con BCrypt
- Políticas de contraseñas seguras
- Proceso de recuperación seguro
- Historial de contraseñas

#### 6. Auditoría y Logging
- **Registro de Eventos de Seguridad**
  - Intentos de acceso fallidos
  - Cambios en roles y permisos
  - Modificaciones de datos sensibles
  - Actividad administrativa

- **Monitoreo de Seguridad**
  - Alertas de actividad sospechosa
  - Detección de intentos de intrusión
  - Análisis de patrones de uso
  - Reportes de seguridad

#### 7. Seguridad en Comunicaciones
- **HTTPS/TLS**
  - Certificados SSL
  - Redirección automática HTTP a HTTPS
  - Configuración de cipher suites seguros

- **Cors Configuration**
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("https://ayrton-app.com");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        
        return new CorsFilter(source);
    }
}
```

#### 8. Seguridad en Datos
- Encriptación de datos sensibles
- Anonimización de datos personales
- Cumplimiento con GDPR/LGPD
- Backups seguros

## Pruebas y Calidad
- [Estrategia de pruebas]
- [Cobertura de código]
- [Métricas de calidad]

## Despliegue y Mantenimiento
- [Proceso de despliegue]
- [Monitoreo]
- [Plan de mantenimiento]

## Conclusiones y Trabajo Futuro
- [Resumen de logros]
- [Lecciones aprendidas]
- [Mejoras planificadas]

### Base de Datos

#### Esquema de Tablas Principales

##### Usuarios y Autenticación
- **Users**: Almacena información de usuarios
  - `id_users` (PK)
  - `name`, `email`, `password`, `username`
  - `role_id` (FK)
  - `plans_id` (FK)

##### Gestión de Tareas
- **Tasks**: Almacena las tareas del sistema
  - `id_tasks` (PK)
  - `name`, `state`, `description`
  - `priority`, `type`
  - `f_creation`, `f_expiration`
  - `reminder`

##### Sistema de Gamificación
- **Challenges**: Sistema de desafíos
  - `id_challenges` (PK)
  - `name`, `description`
  - `category`, `state`
  - `difficulty`, `points`

##### Sistema de Pagos
- **Payments**: Registro de transacciones
  - `id_payments` (PK)
  - `purchase_amount`
  - `payment_method`
  - `payment_date`
  - `id_voucher` (FK)