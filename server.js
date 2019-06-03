var express = require('express');
var app = express();
var con=require('./cnnct.js')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function(req,res)
{
   var q= req.query.application;
   //console.log(q);
    
    con.finderrors(q,function(err,result)
        {
            res.json({success: 1,
                result: result
        })
        });

});

app.get('/app',function(req,res)
{
    
    con.getAllApplications(function(err,result)
        {
            res.json({success: 1,
                result: result
        })
        });

});

app.get('/errors',function(req,res)
{
    
    con.getAllErrors(function(err,result)
        {
            res.json({success: 1,
                result: result
        })
        });

});


app.post('/',function(req,res)
{
    var q1=req.body.app_id;
    var q2=req.body.app_name;
    con.addapp(q1,q2,function(err,result){
        res.json({success: 1,
                result: result
            })})
})

app.post('/adderror',function(req,res)
{
    var q1=req.body.error_id;
    var q2=req.body.error_name;
    var q3=req.body.desc;
    con.addError(q1,q2,q3,function(err,result){
        res.json({success: 1,
                result: result
            })})
})
var server = app.listen(5000, function () {
    console.log('Server is running..');
});
