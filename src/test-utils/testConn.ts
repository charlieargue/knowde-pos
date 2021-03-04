import { createConnection } from "typeorm";

const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "karlgolka",
        password: "666",
        database: "knowde-pos-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entities/*.*"]
    });

};
export default testConn;