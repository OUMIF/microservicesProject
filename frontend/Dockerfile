# ---- Étape builder ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Étape serveur Nginx ----
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Angular
COPY --from=builder /app/dist/project/browser/ /usr/share/nginx/html/

# Écrire la conf Nginx unique
RUN rm -f /etc/nginx/conf.d/default.conf && \
    printf 'server { \
        listen       80; \
        server_name  localhost; \
        root         /usr/share/nginx/html; \
        index        index.csr.html index.html; \
        location / { try_files $uri $uri/ /index.csr.html; } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
