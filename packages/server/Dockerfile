FROM node:20-alpine3.16

# ====================================================== Init project
RUN mkdir /root/project
WORKDIR /root/project

# ====================================================== Copy project
# -------------------------------- Copy config
COPY package.json /root/project/package.json
COPY tsconfig.json /root/project/tsconfig.json
# -------------------------------- Copy sources
COPY src /root/project/src

RUN npm install

# ====================================================== Entrypoint
ENTRYPOINT ["npm", "run", "dev"]