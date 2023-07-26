FROM node:19
WORKDIR /app
COPY *.json /app
COPY ./public /app/public
COPY ./src /app/src
COPY *.js /app
RUN npm install
CMD ["npm", "run", "dev"]
