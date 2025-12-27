# BackEnd_3_CoderHouse_Entrega_Final
BackEnd_3_CoderHouse_Entrega_Final

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

The image is publicly available on Docker Hub at: https://hub.docker.com/r/ifrenearlando/backend_3_coderhouse

## Swagger UI

Swagger UI for Users is available at: `http://localhost:8080/api/docs`
