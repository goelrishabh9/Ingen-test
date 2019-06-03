var mysql = require('mysql');
var layer2=require("./layer2.js")

var connection = mysql.createConnection({
  host     : "testdb1.cetmc8ahq5eg.us-east-1.rds.amazonaws.com",
  user     : "rishabh",
  password : "rishabhgoel9",
  database : "mydb",
  port     : 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  else console.log("passed")
  

});
module.exports.finderrors=function(q,Callback){
	connection.query(`select * from app_feature_error JOIN errors on errors.id=app_feature_error.errors_id where app_feature_error.id='${q}'`,function(err,data)
	{
		if (err)
		console.log(err)
	else
	{
		Callback(err,data);
	}

	})
	
}

module.exports.updateStatus=function(q,Callback)
{
	connection.query(`update errors set status="RESOLVED" where id='${q}'`,function(err,data)
	{
		if (err)
		console.log(err)
	else
	{
		Callback(err,data);
	}

	})
	
}
module.exports.getAllErrors=function(Callback){
	connection.query("select * from errors",function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)

	})
	
}

module.exports.getResolvedErrors=function(Callback){
	connection.query("select * from errors where status='RESOLVED'",function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)

	})
	
}

module.exports.getUnresolvedErrors=function(Callback){
	connection.query("select * from errors where status='UNRESOLVED'",function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)

	})
	
}
module.exports.getAllApplications=function(Callback){
	connection.query("select * from app",function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)

	})
	
}
module.exports.addapp=function(q1,q2,Callback){
	connection.query(`insert into app_list values('${q1}','${q2}')`,function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)
			
		

	})
	
}

module.exports.addError=function(q1,q2,q3,Callback){
	connection.query(`insert into errors values(NULL,'${q2}','${q3}','${Date.now()}','${q1}',"UNRESOLVED")`,function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)
			
		

	})
	
}

//connection.end();