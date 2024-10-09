FROM node:22-alpine

WORKDIR /app

# Copy the package.json and other config files first
COPY package.json ./
COPY vite.config.ts ./
COPY svelte.config.js ./
COPY eslint.config.js ./
COPY .prettierrc ./

# Install global dependencies (if necessary)
RUN npm install -g vite

# Install project dependencies
RUN npm install @sveltejs/kit
# TODO: WHY ^ is required !!!???
RUN npm install

# Copy the rest of the application code
COPY . .

# TODO: setup the port in .env file
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]