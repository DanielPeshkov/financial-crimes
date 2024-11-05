import pg from "pg";
const Pool = pg.Pool;

export const handler = async (event) => {
    const client = new Pool({
        user: process.env['user'],
        host: process.env['host'],
        database: process.env['database'],
        password: process.env['password'],
        port: process.env['port'],
        ssl: {rejectUnauthorized: false},
    });
    let resp;
    await client.connect().then(() => {
        console.log('Connected to Aurora Postgres');
        var query = 'INSERT INTO logs(ts, gat, req, hit) \nVALUES '
        let x;
        while (x = event.logs.pop()) {
            console.log('X: ', x);
            query += `\t(${x}),\n`
        }
        query = query.slice(0, query.length-2) + ';'
        console.log('Query: ', query);
        client.query(query).then(data => resp = data).catch(err => {
            console.log('Error inserting into database: ', err);
        }).finally(() => {
            client.end();
            console.log('Aurora connection closed');
            });
    }).catch(err => {
        console.log('Error connecting to Aurora Postgres:', err);
    });
    
    return resp;
}