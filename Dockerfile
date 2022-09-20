FROM node:14.17.0-alpine3.13 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./prisma ./prisma
RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:14.17.0-alpine3.13 as dependencies

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY ./prisma ./prisma
RUN yarn prisma generate

FROM node:14.17.0-alpine3.13 as runner

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY package.json ./
COPY prisma ./prisma
COPY api-docs ./api-docs

CMD ["yarn", "start:prod"]