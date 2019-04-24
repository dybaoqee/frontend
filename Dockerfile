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
RUN npm install -g yarn

# app set workdir
WORKDIR /opt/emcasa/frontend
COPY . /opt/emcasa/frontend

RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start"]
