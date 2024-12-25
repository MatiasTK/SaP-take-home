# Shaw and partners take home

*Prueba técnica para Shaw and Partners*

## Enunciado 📋

- [Enlace original (notion)](https://stirring-system-d4c.notion.site/Challenge-1f09fab538794c738e0532695efa126f)
- [Markdown](./enunciado.md)

## Demo 🎥

- [Preview](https://matiastk.github.io/SaP-take-home/)
- [API](https://sap-take-home.onrender.com)

## Requerimientos 🛠️

- [Node.js](https://nodejs.org/es/)
- [pnpm](https://pnpm.io/)

## Ejecución 🚀

- Instalar dependencias con `pnpm install`
- Para ejecutar el servidor `pnpm run dev`
- Para ejecutar los test `pnpm run test`
- Para chequear cobertura de test `pnpm run coverage`

## Aclaraciones 📌

- No usé una base de datos, los datos se guardan en un archivo json. Esto es para simplificar la prueba, si usaba una base de datos no solo me iba a tomar mas tiempo configurar su integración sino que a la hora de hacer test iba a tener que hacer un mock de la base de datos.
- Para el frontend hice test unitarios con `happy-dom` una alternativa más rapida a `js-dom` y test E2E con `playwright`.
- Los test E2E son opcionales ya que los unitarios cubren la mayoría de los casos y en este caso es medio overkill usarlos.

## Idea original ✒️

- [Midudev](https://youtu.be/MmfoLqiu1A0?si=sW3-cxyHhFuwDZ0W)
