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

#Define env variables
ENV PORT=8080
ENV ACCOUNT_KIT_APP_SECRET=$ACCOUNT_KIT_APP_SECRET
ENV AMPLITUDE_API_KEY=$AMPLITUDE_API_KEY
ENV APOLLO_ENGINE=$APOLLO_ENGINE
ENV FACEBOOK_APP_ID=$FACEBOOK_ID
ENV FACEBOOK_PAGES=$FACEBOOK_PAGES
ENV FLAGR_URL=$FLAGR_URL
ENV GOOGLE_ANALYTICS_TRACKING_ID=$GOOGLE_ANALYTICS_TRACKING_ID
ENV GOOGLE_MAPS_KEY=$GOOGLE_MAPS_KEY
ENV HOTJAR_SITE_ID=$HOTJAR_SITE
ENV IS_STAGING=$IS_STAGING
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_DSN=$SENTRY_DSN
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV WEBSERVICE_BASE_URL=$WEBSERVICE_BASE_URL


# system install yarn
RUN npm install -g yarn

# app set workdir
WORKDIR /opt/emcasa/frontend
COPY . /opt/emcasa/frontend

EXPOSE 8080
RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start"]
