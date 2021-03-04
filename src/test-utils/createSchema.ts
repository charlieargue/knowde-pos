import { buildSchema } from "type-graphql";
import { ScanResolver } from '../resolvers/scan';


export const createSchema = () =>
    buildSchema({
        resolvers: [
            ScanResolver
        ],
    });