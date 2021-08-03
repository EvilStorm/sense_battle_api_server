const mariadb = require('mariadb');

const createPool = mariadb.createPool({
    host: process.env.DBHost, 
    port: process.env.DBPort,
    user: process.env.DBUser, 
    password: process.env.DBPassword,
    connectionLimit: 5
});

const init = async () => {

    var maridConn = await connection()
    
    if(maridConn != null) {
      await maridConn.query('create database if not exists sense_battle')
      await maridConn.query('use sense_battle')

      maridConn.end()  
    } else {
      console.log("maraiaDb Connection is Null")
    }
}


const connection = async () => {
    try {
        var conn = await createPool.getConnection();
        return conn;
    } catch (err) {
        console.log(err);
        return null;
    }
}


module.exports = {
    initMariaDB: init,
    getConnection: connection
}