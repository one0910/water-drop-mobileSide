# 容器的软件环境是什么，这里使用的是 node 18
# 这里使用的是 docker 的多阶段构建
FROM node:18 AS builder
# 第一个 . 的意思是当前 dockerfile 所在的目录
# 第二个 . 的意思是当前启动的容器的根目录
COPY . .

RUN npm install && npm run build

FROM nginx:1.25.1

COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
