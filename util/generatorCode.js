var fs = require("fs")
	,path = require("path")
	,confJson = JSON.parse(fs.readFileSync("config.json"));

var GeneratorCode = function(fsConf,column){
	productMoudleFile(confJson.moudle.dirPath,fsConf,column);
};

function productMoudleFile(dirPath,fsConf,column) {
    var files = fs.readdir(dirPath,function(err,files){
    	files.forEach(function (itm, index) {
            var stat = fs.statSync(dirPath+itm);
            if (stat.isDirectory()) {
            	productMoudleFile(dirPath+itm+"/",fsConf,column);
            } else {
                readMoudleFile(dirPath+itm,itm,fsConf,column);
            }
        })
    });
    changeFile("conf/controller.js",fsConf);
}

function readMoudleFile(fileName,itm,fsConf,column){
	var outFilePath = itm;
	var path = "";
	/**
	 * 根据文件类型生成对应的文件路径
	 */
	if(itm.indexOf("html")>-1){
		outFilePath = "views/"+fsConf.path+"/"+fsConf.classLowerName+".html";
		path = "views/"+fsConf.path+"/";
	}else if(itm.indexOf("Dao")>-1){
		outFilePath = "dao/"+fsConf.path+"/"+fsConf.classLowerName+".js";
		path = "dao/"+fsConf.path+"/";
	}else if(itm.indexOf("Route")>-1){
		outFilePath = "routes/"+fsConf.path+"/"+fsConf.classLowerName+".js";
		path = "routes/"+fsConf.path+"/";
	}
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}

	var data;
	var readerStream = fs.createReadStream(fileName);
	var writerStream = fs.createWriteStream(outFilePath);
	readerStream.setEncoding('UTF8');

	//#{{list}} #{key} #{value} #{{/list}}
	readerStream.on('data', function(chunk) {
		data = "";
		var preArr = chunk.split("#{{list}}");
		for(var p=0;p<preArr.length-1;p++){
			if(p==0){
				data += preArr[p];
			}
			var after = preArr[p+1].split("#{{/list}}");
			for(var c in column){
				if(after[0].indexOf(",")>0){
					if(c<column.length-1){
						data += after[0].replace(/,/gm,"").replace(new RegExp("#{value}","gm"),column[c]+",");
					}else{
						data += after[0].replace(/,/gm,"").replace(new RegExp("#{value}","gm"),column[c]);
					}
				}else{
					data += after[0].replace(new RegExp("#{key}","gm"),c).replace(new RegExp("#{value}","gm"),column[c]);
				}
			}
			data += after[1];
		}

		if(data==null||data==""){data=chunk}
		for(var obj in fsConf){
			data = data.replace(new RegExp("#{"+obj+"}","gm"),fsConf[obj]);
		}
		data = data.replace(new RegExp("#{{/list}}","gm"),"");
	});

	readerStream.on('end',function(){
		writerStream.write(data,'UTF8');
		writerStream.end();
	});

	writerStream.on('finish', function() {
	});

	readerStream.on('error', function(err){
		console.log(err.stack);
	});

	writerStream.on('error', function(err){
		console.log(err.stack);
	});
}

function changeFile(fileName,fsConf){
	var readStream = fs.createReadStream(fileName);
	readStream.setEncoding('UTF8');
	var afterArr = [];
	var cdata;

	readStream.on('data', function(chunk) {
		cdata = "";
		var temp = "";
		var preArr = chunk.split("//#");
		for(var j=0;j<preArr.length-1;j++){
			if(j==0) cdata += preArr[j];
			afterArr = preArr[j+1].split("#//");
			for(var i=0;i<afterArr.length;i=i+2){
				cdata += "//# "+afterArr[i]+" #//";
				if(i==0) {
					temp = afterArr[i];
					for (var obj in fsConf) {
						temp = temp.replace(new RegExp("#{"+obj+"}","gm"),fsConf[obj]);
					}
					cdata += "\n    "+temp;
				}
				cdata += afterArr[i+1];
			}
		}
	});

	readStream.on('end',function(){
		var writeStream = fs.createWriteStream(fileName);
			writeStream.write(cdata,'UTF8');
			writeStream.end();

			writeStream.on('finish', function() {
			});

			writeStream.on('error', function(err){
				console.log(err.stack);
			});
	});

	readStream.on('error', function(err){
		console.log(err.stack);
	});
}

module.exports = GeneratorCode;