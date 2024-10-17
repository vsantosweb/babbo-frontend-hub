# Use uma imagem base do Node.js
FROM node:22

RUN apt-get update && apt-get install -y iputils-ping inetutils-traceroute net-tools dnsutils iproute2

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json /app

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
#COPY . .

# Comando para rodar a aplicação
#CMD ["npx", "nx", "dev", "client"]
