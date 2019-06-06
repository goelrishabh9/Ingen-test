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

app.get('/appfeature',function(req,res)
{
    var q=req.query.app_id;    
    con.getAppFeature(q,function(err,result)
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

app.get('/resolvederrors',function(req,res)
{
   var q1=req.query.app_id;
   var q2=req.query.feature_id;
   console.log(q1,q2);
    con.getResolvedErrors(q1,q2,function(err,result)
        {
            res.json({success: 1,
                result: result
        })
        });

});
app.get('/unresolvederrors',function(req,res)
{
    
   var q1=req.query.app_id;
   var q2=req.query.feature_id;
    
    
    con.getUnresolvedErrors(q1,q2,function(err,result)
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
app.get('/pp',function(req,res)
{
    con.del();
})
app.post('/adderror',function(req,res)
{
    var q5=req.body.created_by;
    var q3=req.body.error_name;
    var q4=req.body.desc;
    var q1=req.body.app_id;
    var q2=req.body.feature_id;
    if(q3!="")
    {
    con.addError(q1,q2,q3,q4,q5,function(err,result){
        res.json({success: 1,
                result: result
            })})
}
else {console.log("empty input");
    res.json("empty input")
}
})
app.post('/updatestatus',function(req,res)
{
    var q=req.body.id;
    con.updateStatus(q,function(err,result){
        res.json({success: 1,
                result: result
            })
    })
})
var server = app.listen(5000, function () {
    console.log('Server is running..');
});
