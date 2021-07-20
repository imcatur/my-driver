'use strict';
const {Driver, Pool} = require('./lib');

async function test_driver(){
	let driver = new Driver();
	driver.connect();
	let res_one = await driver.query("SELECT NOW() AS res_one");
	console.log(res_one);
	let res_two = await driver.query("SELECT NOW() AS res_two");
	console.log(res_two);
	driver.end();
}
async function test_pool(){
	let pool = new Pool();
	let res = await pool.query("SELECT NOW() AS res");
	console.log(res);
	pool = new Pool();
	res = await pool.query("SELECT NOW() AS res");
	console.log(res);
}
//test_driver();
//test_pool();
async function get_data(){
	let driver = new Driver();
	driver.connect();
	let res = await driver.query("SELECT * from mydata");
	console.log('id | names | contact');
	for(let i = 0; i < res.length; i++){
	  console.log(res[i].id + ' | ' + res[i].names + ' | ' + res[i].contact);
	}
	driver.end();
}
get_data();
async function in_data(){
  let driver = new Driver();
	driver.connect();
	let res = await driver.query("INSERT INTO mydata VALUES(null, 'Mayde','8733')");
	console.log(res);
	driver.end();
}
//in_data();