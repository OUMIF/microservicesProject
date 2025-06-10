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

# Configuration Nginx avec proxy vers API Gateway
RUN rm -f /etc/nginx/conf.d/default.conf && \
    printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Proxy vers API Gateway - CORRECTION ICI\n\
    location /api/ {\n\
        proxy_pass http://apigateway:5000/api/;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
        proxy_connect_timeout 60s;\n\
        proxy_send_timeout 60s;\n\
        proxy_read_timeout 60s;\n\
    }\n\
\n\
    # Gestion du routage Angular SPA\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache pour les assets statiques\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]