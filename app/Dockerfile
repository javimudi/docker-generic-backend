FROM node:argon

MAINTAINER Javier Muñoz "javier.munoz.diaz@gmail.com"

RUN mkdir -p /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN npm install -g nodemon
RUN npm install --production