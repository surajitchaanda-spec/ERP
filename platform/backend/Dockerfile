FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --legacy-peer-deps --omit=dev || npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/database/migrations ./dist/database/migrations
CMD ["node", "dist/main"]
