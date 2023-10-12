import pkg from 'pg';
const {Client} = pkg;

async function getConnection (){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'yose',
        password: 'admin123',
        database: 'my_store'
    });
    await client.connect();
    return client;
}

export default getConnection;
