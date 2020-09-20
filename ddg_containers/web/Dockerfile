FROM nginx:latest

ARG USER_NAME
ARG USER_ID
ARG GROUP_ID

# Setup User
RUN \
  apt-get update && \
  apt-get install -y sudo && \
  useradd -u ${USER_ID} -o -m ${USER_NAME} -s /bin/bash && \
  groupmod -g ${GROUP_ID} ${USER_NAME}

COPY ./resource/conf/001-laravel.conf /etc/nginx/conf.d/001-laravel.conf

RUN \
  # Change bash settings.
  sed -E "s/# export LS_OPTIONS=/export LS_OPTIONS=/g" /root/.bashrc -i && \
  sed -E "s/# alias ls=/alias ls=/g" /root/.bashrc -i && \
  sed -E "s/# alias ll=/alias ll=/g" /root/.bashrc -i && \
  sed -E "s/# alias l=/alias l=/g" /root/.bashrc -i && \
  # Install the required packages.
  apt-get install -y \
    git \
    vim \
    npm \
    webpack \
    iputils-ping \
    net-tools \
    && \
  # Remove nginx default settings.
  cp -R /etc/nginx/conf.d /etc/nginx/conf.d.org && \
  rm -f /etc/nginx/conf.d/default.conf && \
  # Setup yarn
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update &&\
  apt-get install -y yarn && \
  # Clean packages
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* 

WORKDIR /var/www/html
