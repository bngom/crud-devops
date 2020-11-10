#!/bin/bash
# This script bootstraps the ec2 in such a way almost everything is setup to start a new yolo run on docker
# This script has been tested on an EC2 T2 MICRO
sudo apt update -y
sudo apt upgrade -y

# Install docker
sudo apt install docker.io -y

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


sudo chmod +x /usr/local/bin/docker-compose

# Add GitLab’s official repository
sudo curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash

# Install the latest version of GitLab Runner
export GITLAB_RUNNER_DISABLE_SKEL=true; sudo -E apt-get install gitlab-runner

# Register Gitlab-runner
# sudo gitlab-runner register

# Give it permissions to execute
# sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab CI user:
# sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
