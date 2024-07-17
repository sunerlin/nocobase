FROM node:18-bullseye-slim

WORKDIR /app
COPY ./nocobase.tar.gz ./

COPY ./sources.list /etc/apt/sources.list
RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
  amd64) ARCH='x64';; \
  ppc64el) ARCH='ppc64le';; \
  s390x) ARCH='s390x';; \
  arm64) ARCH='arm64';; \
  armhf) ARCH='armv7l';; \
  i386) ARCH='x86';; \
  *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  && set -ex \
  # libatomic1 for arm
  && apt-get update && apt-get install -y nginx

RUN rm -rf /etc/nginx/sites-enabled/default

WORKDIR /app/nocobase

COPY docker-entrypoint.sh /app/
# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 80/tcp

CMD ["/app/docker-entrypoint.sh"]
