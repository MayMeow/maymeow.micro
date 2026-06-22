FROM ghcr.io/maymeow/hugo/hugo:latest as builder
WORKDIR /src
COPY . /src
RUN hugo --minify

# Production stage
FROM caddy:alpine
COPY --from=builder /src/public /srv
COPY <<EOF /etc/caddy/Caddyfile
:80 {
    root * /srv
    file_server
    encode gzip
}
EOF
EXPOSE 80