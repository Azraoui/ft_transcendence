FROM debian:buster

WORKDIR /home

COPY ./backend-api .

WORKDIR /home/backend-api

RUN ["npm", "run", "dev"]