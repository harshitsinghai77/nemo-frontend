## Nemo is your little helper and companion no matter if you need to focus, tune out other noises or if you want to have a moment of calm and relaxation

## Nemo helps you boost your motivation and help you think more creatively.

## Demo: https://nemo-app.netlify.app/

### Build a docker container
```bash
docker build -t nemo-frontend .
```

### Run the docker container
```bash
docker run -d -p 3000:3000 --name nemo-frontend nemo-frontend
```

### Get inside the running container
```bash
docker exec -it $(docker ps -q -f name=nemo-frontend) bash
```

### Get the build folder to local directory
```bash
docker cp $(docker ps -q -f name=nemo-frontend):/usr/src/app/build $(pwd)
```
 