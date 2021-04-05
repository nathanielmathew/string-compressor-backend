var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
var fs = require("fs");


app.get('/', function (req, res) {
    res.send("Enter a string request '/exampleString' to obtain compressed string");
 })

function compress(str){
    let compressed_str = [];
    compressed_str[0]=str.charAt(i);
    let j = 1;
    var counter=1;
    var flag=0;
    for (var i = 1; i < str.length; i++) {
        var previous = str.charAt(i-1);
        var current = str.charAt(i);
        if(previous==current){
            counter++;
            flag=1;
            if(i==str.length-1){
                compressed_str[j++]=counter;
            }
            // console.log(" i fired for "+str.charAt(i));
        }
        else if (flag==1){
            compressed_str[j++]=counter;
            compressed_str[j++]=str.charAt(i);
            flag=0;
            counter=1;
            // console.log(" ei fired for "+str.charAt(i));
        }
        else {
            compressed_str[j++]=str.charAt(i);
            // console.log(" e fired for "+str.charAt(i));
        }
    }
    compressed_str = compressed_str.join("");
    myres = {
           "str" : str,
            "compressed_str" : compressed_str
    }
    return myres;
}

app.get('/:str', function (req, res) {
       let myres=compress(req.params.str);
    //    console.log(myres.compressed_str);
       res.send(myres);
 })

 
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})