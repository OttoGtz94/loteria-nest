<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Lotería

1. Copiar y/o renombrar el archivo **.env.template** a **.env**
2. Cambiar los valores de las variables de entorno _(se puede usar las que vienen por defecto)_.
3. Ejecutar en la terminal

```
yarn install
```

4. Levantar BD y Administrador

```
docker compose up -d
```

5. Ejecutar App

```
yarn start:dev
```

> ¡Se debe de tener instalado NestJs! en caso de que no este instalado, ejecutar el siguiente comando

```
npm i -g @nestjs/cli
```

6. En el navegador ir a la ruta
   > http://localhost:PUERTO_VARIABLE_ENTORNO/api

![Captura Api Swagger](/public/images/ss-api.png 'SS- Captura Swagger')

> Podemos ver las diferentes rutas y sus respectivos verbos Http, además del **Request Body** y/o **Parameters** que se necesitan.

![Captura Api Swagger POST](/public/images/ss-post-api.png 'SS- Captura Swagger Post')

## Cartas

Se puede ir creando carta por carta haciendo la petición **POST** a su respectiva ruta o se pueden cargar todas las cartas desde un _Data_ haciendo una petición **GET** a la ruta

> localhost:PUERTO_VARIABLE_ENTORNO/api/card/load-cards

Podemos ir a nuestra herramiento de administración de BD favorita y conectarnos a la BD con las credenciales declaradas en las _variables de entorno_ o podemos usar el administrador de BD incorporado en el docker-compose.

> http://localhost:ADM_PORT/

![Captura AdminerBD](/public/images/ss-adminerbd.png 'SS- Captura Adminer')

## Tableros

Se necesitan tener las cartas cargadas en la BD.

Para más información ver la documentación de Swagger

> localhost:PORT/api

## Jugar

Podemos hcaer una simulación de juego, encontrando la ruta y el verbo Http en la documentación de Swagger.

La petición devolvera un objeto JSON, donde indica el tablero ganador y los slugs que que se tienen en el tablero. También viene una propiedad _details_ donde vienen todos los tableros que se jugaron y la lista de las cartas barajadas _(en cada juego aparecen en orden diferente)_. Con esta información se podra comprobar si el resultado fue el correcto, para esto se recomienda tener solo 2 tableros.

![Captura PostmanPlay](/public/images/ss-postman-play.png 'SS- Captura postman')

## Postman

En el archivo **loteria.postman.json** se pueden encontrar las request utilizadas.
