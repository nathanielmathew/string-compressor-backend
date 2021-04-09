var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var fs = require("fs");


app.get('/', function (req, res) {
    res.send("Enter a string request 'compress/exampleString' to obtain compressed string or 'decompress/exampleString' to obtain decompressed string");
 })

 function decompress_old(str){
    let decompressed_str = [];
    decompressed_str[0]=str.charAt(i);
    let j = 1;
    var counter=1;
    for (var i = 1; i < str.length; i++) {
        var previous = str.charAt(i-1);
        var current = str.charAt(i);
        if(current>='0' && current<='9'){
            n = parseInt(current);
            while(counter<n){
                decompressed_str[j++]=previous;
                counter++;
            }
            counter=1;
        }
        else {
            decompressed_str[j++]=str.charAt(i);
        }
    }
    decompressed_str = decompressed_str.join("");
    myres = {
           "str" : str,
            "decompressed_str" : decompressed_str
    }
    return myres;
}

function decompress(str){
    let decompressed_str = []
    for(var i = 0; i<str.length;i++){
        let code = str.charCodeAt(i);
        let offset = code-33;
        let x=offset/27;
        let y=offset%27;
        decompressed_str.push(String.fromCharCode(97+x));
        if(y!=26)
            decompressed_str.push(String.fromCharCode(97+y));
        else
            decompressed_str.push("");
    }
    decompressed_str = decompressed_str.join("");
    myres = {
           "str" : str,
            "decompressed_str" : decompressed_str
    }
    return myres;
}

function compress_old(str){
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

function compress(str){
    //forbidden 0-32, 128-160
    let starting=33;
    var lookup = new Array();
    for(var i='a'.charCodeAt(0); i<='z'.charCodeAt(0);i++){
        lookup[String.fromCharCode(i)] = new Array();
    }
    for(var i='a'.charCodeAt(0); i<='z'.charCodeAt(0);i++){
        for(var j='a'.charCodeAt(0); j<='z'.charCodeAt(0); j++){
            lookup[String.fromCharCode(i)][String.fromCharCode(j)] = String.fromCharCode(starting++);
            // '\u0001';
        }
        lookup[String.fromCharCode(i)][''] = String.fromCharCode(starting++);
    }
    let compressed_str=[];
    for(var i=0; i<str.length-1;i+=2){
        compressed_str.push(lookup[str.charAt(i)][str.charAt(i+1)]);
    }
    if(str.length%2==1){
        compressed_str.push(lookup[str.charAt(str.length-1)]['']);
    }
    // console.log(compressed_str);
    compressed_str = compressed_str.join("");
    let myres = {
        "str" : str,
        "compressed_str" : compressed_str
 }
 return myres;

}

app.get('/compress/:str', function (req, res) {
       let myres=compress(req.params.str);
    //    console.log(myres.compressed_str);
       res.send(myres);
 })

 app.get('/decompress/:str', function (req, res) {
    let myres=decompress(req.params.str);
 //    console.log(myres.compressed_str);
    res.send(myres);
})

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})