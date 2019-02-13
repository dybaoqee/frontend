FROM node:10.9
ARG BUILD_DATE
ARG VCS_REF
LABEL maintainer="EmCasa <dev@emcasa.com>" \
      org.opencontainers.image.title="Frontend service for EmCasa." \
      org.opencontainers.image.description="Frontend service for EmCasa." \
      org.opencontainers.image.authors="EmCasa <dev@emcasa.com>" \
      org.opencontainers.image.license="MIT" \
      org.opencontainers.image.source="https://github.com/emcasa/frontend" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.created=$BUILD_DATE

# system install yarn
RUN apt-get -y update \
    && apt-get -y install apt-transport-https ca-certificates \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get -y update \
    && apt-get -y install --no-install-recommends yarn \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*

# app set workdir
WORKDIR /opt/emcasa/frontend

# NOTE (jpd): check a way to first install app deps and them copy the code,
# copying package.json and .npmrc doesn't solve the problem
# app add source code and install it
COPY . /opt/emcasa/frontend
RUN yarn install
