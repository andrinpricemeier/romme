# base node image
FROM node:16-bullseye-slim as base
# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl
RUN apt-get install -y git

# Build shared libraries
FROM base as shareddeps
# We clone the entire repository. An alternative would be to use the "sparse" features
# of git, but not all git versions support this.
RUN git clone https://github.com/andrinmeier/romme /romme
RUN cp -R /romme/game-events /game-events
WORKDIR /game-events
RUN npm install
RUN npm run build
RUN cp -R /romme/game-webgl /game-webgl
WORKDIR /game-webgl
RUN npm install
RUN npm run build

# Install all node_modules, including dev dependencies
FROM base as deps
RUN mkdir /webapp
WORKDIR /webapp
COPY --from=shareddeps /game-events /game-events
COPY --from=shareddeps /game-webgl /game-webgl
ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps
RUN mkdir /webapp
WORKDIR /webapp
COPY --from=shareddeps /game-events /game-events
COPY --from=shareddeps /game-webgl /game-webgl
COPY --from=deps /webapp/node_modules /webapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build
ENV NODE_ENV=production
RUN mkdir /webapp
WORKDIR /webapp
COPY --from=shareddeps /game-events /game-events
COPY --from=shareddeps /game-webgl /game-webgl
COPY --from=deps /webapp/node_modules /webapp/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV NODE_ENV=production
RUN mkdir /webapp
WORKDIR /webapp
# We have to copy over the shared libraries everywhere because "npm install" only installs local packages
# as symlinks. We could just build tarballs but that would add additional complexity.
COPY --from=shareddeps /game-events /game-events
COPY --from=shareddeps /game-webgl /game-webgl
COPY --from=production-deps /webapp/node_modules /webapp/node_modules
COPY --from=build /webapp/build /webapp/build
COPY --from=build /webapp/public /webapp/public
ADD . .
CMD ["npm", "run", "start"]
