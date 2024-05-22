# Requisitos de Aprobación

## Obligatorios

1. **Autenticación propia y externa** 
   - Persistencia de sesión

2. **Notificaciones**

3. **Almacenamiento de archivos**
   - En cloud

4. **Usuario administrador**
   - Dashboard correspondiente

5. **Documentación**
   - Documentación general de la aplicación
   - Opcional: Open API u otra herramienta similar para backend

6. **Implementación de plataforma de pagos**
   - Si la aplicación no es de venta de productos o servicios, implementar:
     - Base de suscripción a contenido premium
     - Donaciones

7. **Despliegue del proyecto**

## Requisitos Adicionales

8. **ChatBot**
   - No necesariamente con IA, pero si se puede, mejor.
   - Capacidad para tomar datos y responder preguntas básicas seleccionadas.

9. **Chat usuario/usuario o usuario/admin**
   - Implementación usando sockets.

10. **Sistema de notificación automática periódica**
    - Uso de crons.

11. **Implementación de herramientas Google Cloud**
    - Ejemplos/propuestas:
      - Google Maps.
      - Detección de contenido inadecuado en textos y/o imágenes.
      - Speech-to-Text / Text-to-Speech.

12. **Investigar y aplicar una nueva tecnología**
    - Ejemplos:
      - GraphQL.
      - Prisma.
      - Otros frameworks de Frontend como Vue o Angular.
      - React Native.
      - Cualquier otra tecnología interesante dentro del lenguaje JS (por lo menos de momento).

## Obligatorios si es E-commerce

1. **Sistema de trackeo del estado del envío del producto**
   - Marcado como despachado por el administrador a la dirección del usuario.
   - Marcado como recibido por el cliente.

2. **Manejo de stock avanzado**

3. **Generación de códigos de descuento por el administrador**
   - Indicando el % de descuento.
   - El código debe generarse aleatoriamente y aplicarse al total de la compra.
   - El código debe ser válido y no reutilizable.
