FROM node:20.16.0

WORKDIR /agents_pay

COPY package.json ./

RUN npm install react-native-cli
RUN npx react-native --version

RUN npm install --force

COPY . .

RUN npx react-native start --reset-cache