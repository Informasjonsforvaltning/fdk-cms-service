FROM node:22-alpine AS build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH=/opt/node_modules/.bin:$PATH
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install --production
WORKDIR /opt/app
COPY ./ .
RUN yarn build


FROM node:22-alpine
RUN apk update && apk add --no-cache vips-dev && apk upgrade -a
COPY setup-msmtp.sh startup.sh /
RUN apk add msmtp
RUN chmod 770 /setup-msmtp.sh /startup.sh
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=build /opt/node_modules ./node_modules
ENV PATH=/opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
EXPOSE 1337
CMD ["sh", "startup.sh"]
