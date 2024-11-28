#!/bin/sh

# Defina o diretório de trabalho
WORKDIR=/usr/src/app
cd $WORKDIR

if [ ! -d "node_modules" ]; then
    echo "Aguardando instalação de dependências..."
    yarn
fi

npx nx reset
npx nx repair

# Executa os comandos necessários
cp .env.example .env

# Inicie a aplicação
echo "Iniciando a aplicação..."

exec "$@"