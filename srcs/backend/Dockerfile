FROM node:18.13.0-buster

EXPOSE 5000
EXPOSE 5555

USER node
WORKDIR /home/backend-api

COPY --chown=node:node ./backend-api ./

COPY  ./start.sh ./

RUN npm install --prefix /home/backend-api

CMD ["bash", "+x", "/home/backend-api/start.sh"]