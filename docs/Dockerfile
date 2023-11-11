# 2 Steps:
# 1. Build static website using antora
# 2. Host the static website using goStatic

FROM antora/antora AS docs
ADD . /antora

# We want to use the local version of the documentation for building the docker container so that we can see if
# everything is alright before pushing the changes.
# But we'd have to specify the git repository. That doesn't work because we can't access folders outside the docker context.
# Solution: Initialize a pseudo-git repository during image build time.
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN ["git", "init", "."]
RUN git config --global user.email "romme-docs@playromme.com"
RUN git config --global user.name "romme-docs build"
RUN ["touch", ".gitignore"]
RUN ["git", "add", ".gitignore"]
RUN ["git", "commit", "-m", "initialize repository"]
RUN npm i asciidoctor-kroki
RUN ["antora", "antora-playbook.yml"]

FROM pierrezemb/gostatic
COPY --from=docs /antora/build/site /srv/http/


