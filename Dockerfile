FROM node:slim
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install serve -g
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["serve", "-s", "build", "-l", "3000"]