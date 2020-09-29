FROM node:10
# Create app directory
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install -g  --unsafe-perm sequelize-cli

RUN npm install
COPY . .
# TypeScript
# RUN npm run build
EXPOSE 3000
CMD [ "node", "src/bin/www.js" ]
