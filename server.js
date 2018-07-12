var fs = require('fs'),
path = require('path'),
json2csv = require('json2csv'),
filesPath = path.join(__dirname,'\sentiments'),
dictionaryPath = path.join(__dirname,'\dictionary'),
stopWords = fs.readFileSync(path.join(dictionaryPath, '\\stop-words.txt'), "utf8"),
positiveWords = fs.readFileSync(path.join(dictionaryPath, '\\positive-words.txt'), "utf8"),
negativeWords = fs.readFileSync(path.join(dictionaryPath, '\\negative-words.txt'), "utf8");



fs.readdir(filesPath, function(err, items) {

    items.forEach(function(filename){

	
	fs.readFile(path.join(filesPath,filename), {encoding: 'utf-8'}, function (err,data){
    if (err) console.log(err);
	data = data.replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, ''); //remove special characters to get the maximum number of words
    var dataArray = data.split(' ').filter(function (value){
		return stopWords.indexOf(value.toLowerCase()) === -1
	})
	
	var totalWords = dataArray.length;
	var positiveCounter = 0;
	var negativeCounter = 0;
	var result;
	var percentage;
	
	for (var j = 0; j < dataArray.length; j++){
		if(positiveWords.indexOf(dataArray[j]) != -1){
			positiveCounter++;
					
	    } else if (negativeWords.indexOf(dataArray[j]) != -1){
			negativeCounter++;			
		  }
		}
		
	if (positiveCounter > negativeCounter){
			result = 'Positive';
			percentage = positiveCounter / totalWords;
	} else if (positiveCounter < negativeCounter){
			result = 'Negative';
			percentage = negativeCounter / totalWords;
	} else if (positiveCounter === negativeCounter){
			result = 'Neutral';
			percentage = 0.5;
	} else {
		result = 'Error';
		percentage = 'Error';
	}
	
	
	
	
	var finalOutput = {}
    

	finalOutput.fileNumber = filename.replace('.txt','');
	finalOutput.sentiment = result;
	finalOutput.score = percentage;
     
	

	var newLine= "\r\n";
	var fields = ['fileNumber', 'sentiment', 'score'];	
	var toCsv = {data: finalOutput, fields: fields, hasCSVColumnTitle: false};
	
	fs.stat(path.join(__dirname,'\output\\sentiment.csv'), function (err, stat) {
    if (err == null) {console.log('File exists');
        var csv = json2csv(toCsv) + newLine;

        fs.appendFile(path.join(__dirname,'\output\\sentiment.csv'), csv, function (err) {
            if (err) console.log(err);
            console.log('Appended output to csv');
        });
    }
    else {
        console.log('New file, writing headers');
        fields = (fields + newLine);

        fs.writeFile(path.join(__dirname,'\output\\sentiment.csv'), fields, function (err, stat) {
            if (err) console.log(err);
            console.log('File saved');
			
        });
    }
});
	
	
	
	
	
	
})

    })
});

