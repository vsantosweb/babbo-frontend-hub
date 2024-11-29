FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# Instalar as dependências do projeto usando npm
RUN yarn

# Copie o restante do código da aplicação para dentro do container
COPY . ./

ENTRYPOINT ["./entrypoint.sh"]