require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Product } from "./entities/Product";
import { Scan } from "./entities/Scan";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { MyContext } from "./types";

// ------------------------
const main = async () => {

    // TYPE ORM
    await createConnection({
        type: 'postgres',
        database: 'knowde-pos',
        username: process.env.PG_USERNAME,
        password: process.env.PG_PWD,
        logging: true,
        synchronize: true,
        entities: [Product, User, Scan],
    });

    const app = express();

    // CORS
    app.use(cors({
        // applies to ALL ROUTES for now
        origin: 'http://localhost:3000',
        credentials: false
    }));

    // gql
    const apolloServer = new ApolloServer({

        schema: await buildSchema({
            resolvers: [HelloResolver
                // , ProductResolver, UserResolver
            ],
            validate: false
        }),
        context: ({ req, res }): MyContext => ({
            req,
            res,
        })
    });

    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000'
        }
    });

    // start
    app.listen(4000, () => {
        console.log("🚀 SERVER STARTED on http://localhost:4000/ ");
    });
};

main().catch(err => {
    console.log("🚀 ~ err", err)
});
