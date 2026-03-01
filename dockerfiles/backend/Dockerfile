FROM node:22-alpine
WORKDIR /app

COPY nitro-app/package*.json ./
RUN npm install

COPY nitro-app/ ./
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

EXPOSE 3000
CMD ["npm", "run", "dev"]
