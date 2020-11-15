#!/bin/bash

# Update and upgrade packages
sudo apt update -y
sudo apt upgrade -y

# Linux x86-64
sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

sudo chmod +x /usr/local/bin/gitlab-runner

# Install docker
sudo curl -sSL https://get.docker.com/ | sh

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Add user gitlab-runner
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install gitlab-runner
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner

# Start gitlab-runner
sudo gitlab-runner start

# Register gitlab-runner
sudo gitlab-runner register -n \
  --url https://gitlab.com/ \
  --registration-token RbgvFxTcz_P4FfxGyz4J \
  --executor shell \
  --description "My Runner"

sudo usermod -aG docker gitlab-runner

# sudo echo 'gitlab-runner ALL=(ALL) NOPASSWD: ALL' >> sudo /etc/sudoers

# sudo gitlab-runner restart


