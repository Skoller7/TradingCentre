var resultsText = '{"users":['+'{"username":"test" , "sirName" : "John"},'+'{"username":"123test","sirName": "Tom"},'+'{"username":"TesT123","sirName":"David"}]}';

var results = JSON.parse(resultsText);
console.log(results);

for(var i = 0; i < 3; i++){
	console.log(results[i].users);
}