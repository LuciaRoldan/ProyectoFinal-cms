# Medusa

<p align="center">
  <img width="345" height="466" src="https://i.pinimg.com/originals/01/b5/4f/01b54f097b508b2d59f245191b5d5379.jpg" />
</p>

Implementación de Strapi - Headless CMS

## Cómo levantarlo?

`yarn develop` lo levanta local.

Medusa usa un Mongo para el almacenamiento, la conexión esá en el archivo `config/database.js`. Esto levanta variables de entorno para el host, puerto, usaurio, contraseña y nombre de la base, y estas variables de entorno las levanta del archivito `.env`, que está gitignoreada, por su naturaleza confidencial. También se ignoran 3 archivos más: `.env.dev`, `.env.prod` y `.env.test`, cada uno correspondiente a los 3 entornos: desarrollo local, producción y test.

Estos archivos son necesarios para el ambiente productivo que se desee:

- `yarn develop` reemplaza el `.env` por `.env.dev`.
- `yarn build` reemplaza el `.env` por `.env.prod`
- `yarn build-test` reemplaza el `.env` por `env.test`
