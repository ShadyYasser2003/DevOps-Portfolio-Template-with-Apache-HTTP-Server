FROM httpd:latest

USER root
RUN apt-get update && apt-get upgrade -y --only-upgrade zlib1g \
    && rm -rf /var/lib/apt/lists/*
USER apache httpd
COPY . /usr/local/apache2/htdocs/
EXPOSE 80