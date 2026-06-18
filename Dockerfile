FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s \
 CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "app.js"]
