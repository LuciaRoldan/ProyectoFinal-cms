# Medusa

<p align="center">
  <img width="345" height="466" src="https://i.pinimg.com/originals/01/b5/4f/01b54f097b508b2d59f245191b5d5379.jpg" />
</p>

Implementación de Strapi - Headless CMS

## Cómo levantarlo?

`yarn develop` lo levanta local.

Medusa usa un Mongo para el almacenamiento, la conexión esá en el archivo `config/database.js`. Esto levanta variables de entorno para el host, puerto, usaurio, contraseña y nombre de la base, y estas variables de entorno las levanta del archivito `.env`, que está gitignoreada, por su naturaleza confidencial. En el `.env` debería detallarse lo siguiente:

- `DATABASE_USERNAME`: user para conectarse a la bbdd.
- `DATABASE_PASSWORD`: password del user para la bbdd.
- `DATABASE_SRV`: si usamos un mongo local, puede ser `false`; para Heroku tiene que ser `true`.
- `DATABASE_HOST`: host de la bbdd.
- `DATABASE_PORT`: 27017 (a menos que se defina lo contrario).
- `DATABASE_NAME`: nombre de la base a conectar. En test, es `proyectatest`.

# Servidor de test

https://proyectatest-bo.herokuapp.com/

Correr `heroku git:clone -a proyectatest-bo` para agregar el remote `heroku`. Con esto, para deployar en test alcanza con correr `git push heroku master`.
