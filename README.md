# Shopping list web app

[![Build Status](https://travis-ci.org/bngom/to-do-web-app.svg?branch=master)](https://travis-ci.org/bngom/shopping-list)



Shopping list CRUD RESTful Application.

We will build a full-stack Shopping list CRUD Application.The back-end server uses Node.js + Express for REST APIs. MongoDB is used for the persistence layer.

## List of all the work performed (briefly, describing features and bonus tasks).

## Instruction

- Installation
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

- Testing
```
npm test
```


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

## Usage

```
npm start
```

```
curl -d "{\"Title\":\"DevOps Assignement\",\"Description\":\"Write a CRUD app\"}" \
-H "Content-Type: application/json" \
-X POST http://localhost:8080/api/item
```

## Testing

From the root directory of the project run:

```
npm test
```

## Author

Barthelemy NGOM 

barthe.ngom@gmail.com
