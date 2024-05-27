# Estágio de construção
FROM node:alpine AS build

# Definir diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de configuração e dependências do projeto
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Compilar o aplicativo
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar os arquivos de build do estágio de construção para o diretório de trabalho do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Remover configurações padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/conf.d

# Expor a porta 80 para o mundo exterior
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
