# Shopping list web app

[![bngom](https://circleci.com/gh/bngom/shopping-list.svg?style=svg)](https://app.circleci.com/pipelines/github/bngom/shopping-list)

Shopping list CRUD Application.

We will build a Shopping list CRUD Application.The back-end server uses Node.js + Express for REST APIs. MongoDB is used for the persistence layer.

## List of all the work performed (briefly, describing features and bonus tasks).

Features: create, update, retrieve, delete an item
Bonus tasks:...

## Instruction

- Installation

```
git clone https://github.com/bngom/shopping-list.git
```
From the root directory of the project run:
```
npm install
```
Lauch tha application
```
npm start
```

- Usage
Create an item in the shopping list
```
curl --location --request POST 'http://localhost:8080/api/item' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pasta",
    "quantity": 2,
    "description": "Panzani"
}'
```
Get all created items
```
curl --location --request GET 'http://localhost:8080/api/item'
```

Get item by id
```
curl --location --request GET 'http://localhost:8080/api/item/<ID>'
```

Update an item
```
curl --location --request PUT 'http://localhost:8080/api/item/<ID>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pasta",
    "quantity": 3,
    "description": "Adja****"
}'
```

Delete one item
```
curl --location --request DELETE 'http://localhost:8080/api/item/<ID>'
```

Delete all items
```
curl --location --request DELETE 'http://localhost:8080/api/item/'
```

- Testing
```
npm test
```

## CI/CD pipeline



## IaC

Allow Ansible to clone private repository

` echo "godeepdsti!" | openssl aes-256-ecb -a -salt > C:\Users\barth\shopping-list\iac\.ansible_vault.pass`


`ansible-vault encrypt_string '<your_github_access_token>' --name 'GITHUB_ACCESS_TOKEN' --vault-password-file=.ansible_vault.pass`

on windows have to run the above command
run `vagrant plugin install vagrant-winnfsd`

run `vagrant plugin install vagrant-vbguest`

run `vagrant up`

> [Troobleshoot](https://stackoverflow.com/questions/50053255/virtualbox-raw-mode-is-unavailable-courtesy-of-hyper-v-windows-10)]

> clone private repo [here](https://community.ibm.com/community/user/ibmz-and-linuxone/blogs/asif-mahmud1/2020/03/15/cloning-private-git-repository-using-ansible)

## Build Docker image 

Check the [Dockerfile](./Dockerfile)

Build the docker image

```
docker build -t shopping-list_web .
```

Push docker image to docker registry

```
docker tag shopping-list_web 230984/shopping-list_web
docker push 230984/shopping-list_web
```

## Docker compose

Check the [docker-compose.yml](./docker-compose.yml) file

```
docker-compose up
```

Open a browser on http://localhost:8080 to see the application

Look at the running containers

```
docker ps
```

- **shopping-list_web**: which represents our application
- **mongo**: which represents the persistence layer docker

## Author

Barthelemy NGOM 

barthe.ngom@gmail.com
