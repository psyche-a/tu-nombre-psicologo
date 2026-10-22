# PSYCHE — plantilla web para consulta psicológica

Sitio estático adaptable a móviles con secciones de presentación, servicios, preguntas frecuentes, contacto y una autoexploración breve de bienestar. Las respuestas del cuestionario se procesan en el navegador y no se envían ni almacenan.

## Personalización antes de publicar

1. Sustituye el nombre de ejemplo, la biografía, la población atendida, los servicios y los datos profesionales por información verdadera y verificable en `index.html`.
2. Cambia `contactEmail` en `script.js`. Ese correo actualiza los enlaces de contacto, la dirección visible y el correo para consultar citas.
3. Sustituye `logo1.png`, `logo2.png` y `profile.jpg` por recursos que tengas permiso de utilizar; ajusta el texto alternativo de la fotografía en `index.html`.
4. Revisa honorarios, duración, modalidad, privacidad, límites de atención y la información de emergencia según tu ubicación y práctica profesional.
5. Sustituye los enlaces de ejemplo de Instagram y Facebook al final de `index.html` por los perfiles profesionales reales. Si agregas analítica, agenda u otros servicios, usa únicamente cuentas propias y actualiza la política de privacidad y las cabeceras de seguridad según corresponda.

El nombre y los textos del perfil son contenido demostrativo, no acreditan identidad, titulación, licencia ni experiencia profesional. La autoexploración es material informativo y no está validada como instrumento clínico; no sustituye una evaluación profesional ni servicios de emergencia.

## Ejecución local

Abre el proyecto con un servidor estático local para que el navegador pueda cargar `test-modal.html`:

```powershell
python -m http.server 8000
```

Después visita `http://localhost:8000`. También se puede publicar en un alojamiento estático que sirva los archivos del proyecto.
