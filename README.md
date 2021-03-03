# Knowde Point-of-Sale INTERVIEW TEST 

A **Node.js** backend using **GraphQL**, **Apollo-Server**, and **PostgreSQL**, written for Knowde's interview test.

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

# install PosgreSQL
# (see https://brew.sh/ for how to install brew)
# (you maybe prompted to create a SA password, remember it, keep it simple)
brew install postgresql

# confirm installed correctly, check version:
postgres -V

# create a database user (🟡 all these to your username):
# (this should be the username you enter in your .env file!)
# First enter (twice) a new password for THIS NEW USER (keep it simple)
# (you will be prompted for the SA password at the end)
sudo su postgres -c 'createuser -P --superuser 🟡karlgolka🟡'

# make a database (you will need to enter the USER PASSWORD)
sudo su postgres -c 'createdb knowde-pos -U 🟡karlgolka🟡'

# make sure to save this USER PASSWORD back in your .env file!

```

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

To make a `SALE` operation, for example:
```graphql


```

And to perform an `EXIT` operation:
```graphql


```


# Test Mocked JSON Data 

... mockaroo.com, TBD