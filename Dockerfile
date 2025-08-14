# Usa imagem nginx oficial como base
FROM nginx:alpine

# Remove configuração default do nginx (opcional)
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração customizado para nginx (vamos criar esse arquivo no passo 3)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build do React para a pasta padrão do nginx onde ele serve arquivos estáticos
COPY build /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão para rodar o nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
