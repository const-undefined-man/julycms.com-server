ARG NODE_VERSION=20.10.0

# build satge
FROM node:${NODE_VERSION}-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm ci

COPY . .

RUN npm run build

# production stage
FROM node:${NODE_VERSION}-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist ./
COPY --from=build-stage /app/package*.json ./

RUN npm install --omit=dev

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "/app/main.js"]