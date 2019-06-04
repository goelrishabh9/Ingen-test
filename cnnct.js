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
	connection.query(`update app_feature_error set status="RESOLVED" where id='${q}'`,function(err,data)
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

module.exports.getResolvedErrors=function(q,Callback){
	connection.query(`select app_feature_error.id,app_feature_error.tester_name,app_feature_error.created_at,name,description from app_feature_error inner join errors where app_feature_error.errors_id=errors.id AND app_feature_error.app_feature_id='${q}'AND app_feature_error.status='RESOLVED' ORDER BY app_feature_error.created_at DESC`,function(err,data)
	{if (err)
		console.log(err)
	else
		Callback(err,data)

	})
	
}

module.exports.getUnresolvedErrors=function(q,Callback){
	connection.query(`select app_feature_error.id,app_feature_error.tester_name,app_feature_error.created_at,name,description from app_feature_error inner join errors where app_feature_error.errors_id=errors.id AND app_feature_error.app_feature_id='${q}'AND app_feature_error.status='UNRESOLVED' ORDER BY app_feature_error.created_at DESC`,function(err,data)
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

module.exports.getAppFeature=function(q,Callback){
	connection.query(`select * from app_feature JOIN features where app_feature.features_id=features.id AND app_id='${q}'`,function(err,data)
	{
		if (err)
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

module.exports.addError=function(q1,q2,q3,q4,q5,Callback){
	connection.query(`select* from errors where name='${q3}'`,function(err,data)
	{
		if(err)
			console.log(err);
		else
			{
			if(data.length<=0)
			{
				connection.query(`insert into errors values (NULL,'${q3}','${q4}','${Date.now()}')`,function(er,data1)
				{
					if(err)
						console.log("errork");

				})
			connection.query(`select* from errors where name='${q3}'`,function(err,data4)
			{
				if(err)
				{
					console.log("error")
				}
				else data=data4;
			})						

			}
			
			connection.query(`select id from app_feature where app_id='${q1}'AND features_id='${q2}'`,function(error,data2){
				if(error)
					console.log(error)
				else{console.log(data[0]['id']);
				connection.query(`insert into app_feature_error values (NULL,'${Date.now()}','${data[0]['id']}','${data2[0]['id']}','${q5}',"UNRESOLVED")`,function(err3,data3){
					if(err)
						console.log("error2");
					else Callback(err3,data3);
				})
			}
			})
			}
	
			

	})
	
}

//connection.end();