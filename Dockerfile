FROM node:10.3.0

WORKDIR /Users/zheng/Files/face-recognition-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]