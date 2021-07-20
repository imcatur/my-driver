'use strict';
const mysql = require('mysql');

class Driver{
	constructor(){
		this.driver = mysql.createConnection({
			host            : '127.0.0.1',
			user            : 'u0_a220',
			password        : '123456',
			database        : 'mydb'
		});
	}
	connect(){
		this.driver.connect();
	}
	query(q, p = null){
		return new Promise((resolve, reject) => {
			this.driver.query(q, p, (error, results, fields) => {
				if (error) throw error;
				resolve(results);
			});
		});
	}
	end(){
		this.driver.end();
	}
}

class Pool{
	constructor(){
		this.pool  = mysql.createPool({
			connectionLimit : 10,
			host            : '127.0.0.1',
			user            : 'u0_a220',
			password        : '123456',
			database        : 'mydb'
		});
	}
	query(q, p = null){
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) throw err;
				connection.query(q, p, (error, results, fields) => {
					if (error) throw error;
					resolve(results);
					connection.destroy();
				});
			});
		});
	}
}
module.exports.Driver = Driver;
module.exports.Pool = Pool;