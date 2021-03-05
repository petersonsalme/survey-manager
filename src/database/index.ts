import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    const testDatabaseName = "./src/database/database.test.sqlite";
        
    const assinedOptions = Object.assign(defaultOptions, { 
        database: process.env.NODE_ENV === 'test' ? testDatabaseName : defaultOptions.database 
    });

    return createConnection(assinedOptions);
}
