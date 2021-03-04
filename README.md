# Knowde Point-of-Sale INTERVIEW TEST 

Written for Knowde's interview test, this is a **Node.js** backend using:
* **GraphQL**, 
* **Apollo-Server**, 
* **Jest**
* and **PostgreSQL**

> by Karl Golka on Wed Mar 3, 2021

# How to install

```sh

# clone the repo
git clone git@github.com:charlieargue/knowde-pos.git

# change directory 
cd knowde-pos

# install all libraries (can do npm i)
yarn install
```

# Quick Start

## Setup environment variables

You will need to grab a `.env` environment variable file:
```
🛑 The back-end will not work without the correct .env files!
```

```sh
# copy env file distribution version
cp .env.dist .env

# make sure to fill it out with the PostgreSQL username/password, see below...
```

## Setup database

To setup your PosgreSQL database, execute the following commands:
```sh

# install PosgreSQL (note doen the SA password you will be prompted to create)
brew install postgresql

# confirm installed correctly, check version:
postgres -V


# 🔴 ???? do you need sudo su postgres -c ' ... '    ????

# create a database user (🟡 change to your username):
# 🔴 [ ] enter the new user username and password in your .env file
# 🔴 [ ] you have to enter 2 passwords with these commands:
#        • first your root password for sudo, and then a new password for createuser
createuser -P --superuser 🟡karlgolka🟡

# make a database 🔴  (you will need to enter the USER PASSWORD)
createdb knowde-pos -U 🟡karlgolka🟡
createdb knowde-pos -U karlgolka

❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ ❌ 
createdb blbl       ✅ works!
createuser blabl    ✅ works!


```

## Update your ormconfig.json

✅ Make sure to also update the `username` and `password` fields in the `ormconfig.json` file!

## Start up the server

```sh
# start the typescript compiler (🟡 in one terminal window)
yarn watch
```

```sh
# start the server locally (🟡 in another terminal window)
yarn dev
```

# GraphQL Playground

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to open the **GraphQL Playground** in the browser.


## GraphQL Mutations

To view all `products`, `users`, or `scans`, use:
```graphql
# view products
{
  products {
    id
    barcode
    name
    price
    createdAt
    
  }
}


# view users
{
  users {
    id
    email
    username
    createdAt
    
  }
}


# view scans (with product data)
{
  scans {
    id
    userId
    productId
    price
    createdAt
    product {
      id
      name
      price
    }
  }
}

```

To make a `SALE` operation, for example:
```graphql
# example values
mutation {
  sale(
    barcode: "68151-4146",
    userId: 22) {
    id
    userId
    productId
    createdAt
  }
}

```

And to perform an `EXIT` operation:
```graphql

{
  exit
}
```


# Running Tests

❌ TODO:
1. setup test DB:
```sh
# change username!
createdb knowde-pos-test -U 🟡karlgolka🟡

# NOTE: server nor yarn watch DO NOT need to be running for tests to work!

# run tests
yarn test

```