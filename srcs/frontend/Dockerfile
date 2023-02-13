FROM node:18.13.0-buster

USER node
EXPOSE 5173
WORKDIR /home/frontend

COPY --chown=node:node ./frontend .

COPY ./start.sh ./

RUN npm install --prefix /home/frontend

CMD ["bash", "+x", "/home/frontend/start.sh"]