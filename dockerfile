FROM node:14.17.5
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g expo-cli
RUN npm install
COPY . .
CMD ["npm", "start", "android"]