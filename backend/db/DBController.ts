import { Connection, createConnection, QueryOptions, RowDataPacket } from 'mysql2/promise';


const connect = () =>
{
    try
    {
        return createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 5000,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
    } catch (error)
    {
        throw error
    }

};



const close = (connection: Connection) =>
{
    connection.end();
};


const executeQuery = (connection: Connection, sql: string, params: (string | string[] | number)[]) =>
{
    const query: QueryOptions = {sql, values: params};
    console.log(query)
    return connection.execute<RowDataPacket[]>(query);
};

const toExport = { connect, close, executeQuery };
export default toExport