#!/bin/bash

# Variáveis de ambiente
DOCKER_HUB_USERNAME="ti@sedec.mt.gov.br"
DOCKER_IMAGE_NAME="simbef-web"

# Solicitar tag da imagem
read -p "Digite a tag da imagem Docker (default: latest): " DOCKER_IMAGE_TAG
DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG:-latest}

# Solicitar senha do Docker Hub
echo -n "Digite a senha do Docker Hub: "
# Desabilitar a ecoação da entrada
stty -echo
read DOCKER_HUB_PASSWORD
# Habilitar a ecoação da entrada
stty echo
echo

# Passo 1: Construir o projeto Spring Boot
echo "Passo 1: Construindo o projeto Spring Boot..."
cd ..
mv .env .env.bkp
cp .env-prod .env
yarn install
yarn run build
mv .env.bkp .env
cp -r ./dist ./docker-build/dist
cd docker-build

# Passo 2: Construir a imagem Docker
echo "Passo 2: Construindo a imagem Docker..."
cat <<EOF > Dockerfile
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
COPY ./replace_params.sh /usr/share/nginx/html/replace_params.sh
RUN chmod +x /usr/share/nginx/html/replace_params.sh
EXPOSE 80
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/replace_params.sh && nginx -g 'daemon off;'"]

EOF
#docker build -t "tisedec/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG" .

# Passo 3: Autenticar no Docker Hub
echo "Passo 3: Autenticando no Docker Hub..."
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin

# Passo 4: Enviar a imagem Docker para o Docker Hub
echo "Passo 4: Enviando a imagem Docker para o Docker Hub..."
docker push "tisedec/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"

# Passo 5: Limpar
echo "Passo 5: Limpando..."
rm -rf ./dist ./Dockerfile

echo "Concluído!"