# BackEnd_3_CoderHouse_Entrega_Final
BackEnd_3_CoderHouse_Entrega_Final

## Instalación

1. Clona el repositorio y entra a la carpeta del proyecto:
   ```
   git clone https://github.com/IfreneArlandoArg/BackEnd_3_CoderHouse_Entrega_Final.git
   cd BackEnd_3_CoderHouse_Entrega_Final
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Configura tu string de conexión a MongoDB en `.ENV` si es necesario.
   ```
   MONGODB_URL="<mongodb+srv://user.....>"
   ```
4. Inicia el servidor:
   ```
   npm start
   ```

## Testing

1. Correr tests:
   ```
   npm test
   ```


## Docker

- **Docker image:** https://hub.docker.com/r/ifrenearlando/backend_3_coderhouse
- **Build image:**

```bash
docker build -t ifrenearlando/backend_3_coderhouse:latest .
```

- **Run container:**

```bash
docker run -p 8080:8080 --env MONGODB_URL="your_mongo_uri" ifrenearlando/backend_3_coderhouse:latest
```

Docker image disponible en Docker Hub: https://hub.docker.com/r/ifrenearlando/backend_3_coderhouse

## Swagger UI

Swagger UI para Users disponible: `http://localhost:8080/api/docs`
Nota :
El servidor tiene qué estar corriendo (ver instalacion - Iniciar servidor).