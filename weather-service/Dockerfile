FROM node:latest AS builder

WORKDIR /app

COPY . .
COPY package-lock.json ./
RUN npm install --production
RUN cp -R node_modules prod_node_modules
RUN npm install
RUN npm run build

# -------------

FROM node:current-alpine3.10

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=builder /app/prod_node_modules node_modules
COPY --from=builder /app/dist dist
CMD [ "node", "./dist/server.js" ];