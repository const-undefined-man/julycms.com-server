ARG NODE_VERSION=20.10.0

# build satge
FROM node:${NODE_VERSION}-alpine as build-stage

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm ci

COPY . .

RUN npm run build

# production stage
FROM node:${NODE_VERSION}-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install --omit=dev

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "/app/main.js"]
# CMD ["sh", "-c", "pm2-runtime /app/main.js"]