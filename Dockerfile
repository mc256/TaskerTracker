FROM node:10-slim

# Create working directory
WORKDIR /usr/src/app

# Copy files to the
COPY package*.json ./
COPY example.env ./.env
COPY . .

RUN ln -snf /usr/share/zoneinfo/Canada/Eastern /etc/localtime && echo "Canada/Eastern" > /etc/timezone

RUN npm install -g yarn
RUN yarn install

EXPOSE 8080
CMD ["yarn","start"]