FROM node:18.12 as builder

# Create app directory
#note: it says /user/src/app but i don't think i need the app part
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Stage 2 build for creating smaller image
FROM node:18.12-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 5200

CMD [ "npm", "start" ]