# Knowde Point-of-Sale INTERVIEW TEST 

Written for Knowde's interview test, this is a **Node.js** backend using:
* **GraphQL**, 
* **Apollo-Server**, 
* **Jest**,
* and **PostgreSQL**

> by Karl Golka on Wed Mar 3, 2021, [karlgolka.com](https://karlgolka.com/)

> Install video (2 mins) [video link](https://www.loom.com/share/12459f71bf5b4afcaacfe8c44a46422f)

# How to install

```sh

# clone the repo
git clone https://github.com/charlieargue/knowde-pos.git

# change directory 
cd knowde-pos

# install all libraries (can do npm i)
yarn install
```

# Quick Start

## Setup environment variables and output files

You will need to grab a `.env` environment variable file:
```
🛑 The back-end will not work without the correct .env files!
```

```sh
# copy env file distribution version
cp .env.dist .env

# make sure to fill it out with the PostgreSQL username/password, see below...
```

Create your two output files:
```sh
# output files
touch output-LCD.txt && touch output-PRINTER.txt
```

## Setup database

To setup your PosgreSQL database, execute the following commands:
```sh

# install PosgreSQL (note doen the SA password you will be prompted to create)
brew install postgresql

# confirm installed correctly, check version:
postgres -V

# create a database user (🟡 change username):
createuser -P --superuser 🟡myusername🟡
# NOTE: you'll enter the same password THREE times

# make a database 🔴  (you will need to enter the USER PASSWORD)
createdb knowde-pos -U 🟡myusername🟡
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

First, setup the test DB:
```sh
# change username!
createdb knowde-pos-test -U 🟡karlgolka🟡

# NOTE: you DO NOT need the server nor `yarn watch` running for tests to work!

# run tests
yarn test

```

# Output Files

Output devices were mocked to be files, as per instructions. They can be viewed here:
*  [🖥 LCD output file](output-LCD.txt)
*  [🖨 PRINTER output file](output-PRINTER.txt)