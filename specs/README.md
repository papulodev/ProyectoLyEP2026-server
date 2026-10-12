# Specs del backend

Estos documentos reparten el trabajo del backend en unidades independientes.
Cada integrante toma una spec, trabaja en **su** rama `feature/*` y abre un Pull Request.

## Flujo de trabajo

1. Sincronizar `main`: `git checkout main && git pull`.
2. Crear la rama personal: `git checkout -b feature/<NOMBREAPELLIDO>`.
3. Implementar según los criterios de aceptación.
4. Commits convencionales (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
5. Abrir un Pull Request hacia `main` cumpliendo los 3 criterios obligatorios.

## Reglas y convenciones

### Nombres de rama

- La rama se identifica con el **nombre y apellido del integrante**, pegados y en
  mayúsculas, sin espacios, sin tildes y sin guiones:

  ```
  feature/JHONDOE
  ```

- Si un integrante toma **más de una spec**, se agrega un sufijo con el tema para
  distinguirlas:

  ```
  feature/JHONDOE-crud
  feature/JHONDOE-tests
  ```

### Criterios obligatorios de cada Pull Request

Todo PR debe cumplir los **3 criterios**:

1. **Descripción completa**: qué se hace, cómo se hace y archivos modificados.
2. **Título con referencia**: referencia al issue cuando el trabajo se registra en
   issues (por ejemplo `feat(#12): CRUD de clientes`). Si el proyecto no usa issues,
   el título describe la unidad de trabajo (`feat: CRUD de clientes`).
3. **Declaratoria de uso de IA**: herramienta usada, tipo de asistencia y evaluación.

### Plantilla de Pull Request

> Copiar y completar. Cumple los 3 criterios obligatorios.

````markdown
## Descripción

**Qué se hace**: <qué resuelve este PR>
**Cómo se hace**: <enfoque/decisiones técnicas>
**Archivos modificados**:
- `ruta/archivo` — <qué cambia>

## Declaratoria de uso de IA

- **Herramienta**: <nombre y versión de la herramienta>
- **Asistencia**: generación de código / revisión / debugging / documentación
- **Evaluación**: <cómo el integrante revisó, entendió y validó el resultado>
````

## Reglas del código

- No romper el contrato de la API (rutas y shape JSON). El frontend está en producción.
- No versionar `.env`. Usar `.env.example` como referencia.
- Una spec por PR. Si una spec queda muy grande, dividirla en PRs encadenados.

## Mapa de specs (rama real: `feature/<NOMBREAPELLIDO>` del integrante asignado)

| Spec | Tema (rama de referencia) | Depende de |
|------|---------------------------|------------|
| [01 - CRUD de clientes](spec-01-crud-clientes.md) | `crud-clientes` | base |
| [02 - Validación de payloads](spec-02-validacion-middleware.md) | `validacion-middleware` | 01 |
| [03 - Autenticación](spec-03-autenticacion.md) | `autenticacion` | base |
| [04 - Seguridad](spec-04-seguridad.md) | `seguridad` | base |
| [05 - Tests](spec-05-tests.md) | `tests` | 01 |
| [06 - Deploy en Render](spec-06-deploy-render.md) | `deploy-render` | base |
| [07 - Integración del frontend](spec-07-integracion-frontend.md) | `integracion-frontend` | 01, 03 |

> La asignación spec ↔ integrante se completa con el roster del equipo.