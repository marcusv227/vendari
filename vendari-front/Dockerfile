# Dockerfile
FROM node:20-alpine AS base

# Diretório padrão
WORKDIR /home/node/web

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expondo a porta usada pelo `next dev`
EXPOSE 4400

# Comando padrão para ambiente de desenvolvimento
CMD ["npm", "run", "dev"]
