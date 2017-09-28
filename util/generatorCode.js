var fs = require("fs"),
	path = require("path");

var confJson = JSON.parse(fs.readFileSync("Desktop/codeConf.json"));

//var fsConf = {"a":"kkkk","b":"gggg"};

//var column = ["z","x","c","v","b"];

var GeneratorCode = function(fsConf,column){
	productMoudleFile(confJson.dirPath,fsConf,column);
}

function productMoudleFile(dirPath,fsConf,column) {
	
    var files = fs.readdir(dirPath,function(err,files){
    	files.forEach(function (itm, index) {
            var stat = fs.statSync(dirPath+itm);
            if (stat.isDirectory()) {
            	productMoudleFile(dirPath+itm+"/",fsConf,column)
            } else {
                readMoudleFile(dirPath+"/"+itm,itm,fsConf,column);
            }
        })
    });

}

function readMoudleFile(fileName,itm,fsConf,column){

	var data = "";
	
	var outFilePath = confJson.outPath +itm;

	var readerStream = fs.createReadStream(fileName);
	
	var writerStream = fs.createWriteStream(outFilePath);
	
	readerStream.setEncoding('UTF8');
	
	console.log("process start!");
	
	
	//#{{list}} #{key} #{value} #{{/list}}
	readerStream.on('data', function(chunk) {
		var preArr = chunk.split("#{{list}}");
		for(var p=0;p<preArr.length-1;p++){
			data += preArr[0];
			var after = preArr[p+1].split("#{{/list}}");
			for(var c in column){
				data += after[0].replace(new RegExp("#{key}","gm"),c).replace(new RegExp("#{value}","gm"),column[c]);
				if(c!=column.length-1){
					data+=",";
				}
			}
			data += after[1];
		}
		for(var obj in fsConf){
			data = data.replace(new RegExp("#{"+obj+"}","gm"),fsConf[obj]);
		}
		data = data.replace(new RegExp("#{{/list}}","gm"),"");
	});
	
	readerStream.on('end',function(){
		console.log("read finish");
		writerStream.write(data,'UTF8');
		writerStream.end();
	});
	
	writerStream.on('finish', function() {
	    console.log("write finish");
	});
	
	readerStream.on('error', function(err){
		console.log(err.stack);
	});
	
	writerStream.on('error', function(err){
	   console.log(err.stack);
	});
}

module.exports = GeneratorCode;