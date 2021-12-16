FROM strapi/base

COPY setup-msmtp.sh /
RUN apt-get update && apt-get -y install msmtp
RUN chmod 770 /setup-msmtp.sh && /setup-msmtp.sh

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
