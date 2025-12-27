FROM node:18-slim

WORKDIR /app

# Install production dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 8080

ENV PORT=8080

CMD [ "node", "src/app.js" ]
