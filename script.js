var students = [];

function submit(){
	var form = document.getElementById("form");
  var name = document.getElementById("name").value;
  var shadow = document.getElementById("shadow").checked;
  var pale = document.getElementById("pale").checked;
  var garlic = document.getElementById("garlic").checked;
  
  //calculating likelihood for students to be vampires
  var vampirism = 0;
  if(shadow == true){
  	vampirism += 4;
  }
  if(pale == true){
  	vampirism += 3;
  }
  if(garlic == true){
  	vampirism += 3;
  }
  students.push([name, shadow, pale, garlic, vampirism]);
  
	var table = document.getElementById("entries");
  var row = table.insertRow(-1);
  for(var i = 0; i < 4; i++){
    var cell = row.insertCell(i);
    cell.innerHTML = students[students.length - 1][i];
  }
}

function checkVampires(){
	var model = document.getElementById("dropdown").value
	var numVamps = 0;
  
  if(model == "thr"){	//Threshold
	  for(var i = 0; i < students.length; i++){
    	if(students[i][4] > 6){
      	numVamps++;
      }
		}
	} else if(model == "ran"){ //Random guessing
  	for(var i = 0; i < students.length; i++){
    	if(Math.random() > 0.5){
      	numVamps++;
      }
    }
  }
  
  return numVamps;
}

function createPieChart(){

var numVamps = checkVampires();

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Vampires"
	},
	data: [{
		type: "pie",
		startAngle: 0,
		indexLabel: "{label}: {y}",
		dataPoints: [
			{y: numVamps, label: "Vampires", color:"red"},
			{y: students.length-numVamps, label: "Not Vampires", color:"black"}
		]
	}]
});
chart.render();

}


var but = document.getElementById("button");
if(but){
	but.addEventListener("click", submit, false);
}
/* document.getElementById("form").addEventListener("click", function(event) {
event.preventDefault();
}, false); */