FROM node:lts-alpine
# 如果你在国内，这行配置很有必要，不然打包会非常非常慢，原因嘛，都懂。
RUN npm config set registry https://registry.npm.taobao.org
# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8200
# 加入端口自定义配置，避免与其他K8S容器端口冲突
CMD [ "http-server","-p","8200", "dist" ]