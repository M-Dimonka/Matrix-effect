var alf = ["A", "B", "C", "D", "E", "F", "F", "G", "H", "I", "J", "К", "L", "М", "N", "О", "P", "Q", "R", "S", "T", "U", "V", 
"W", "X", "Y", "Z"]; 
var block = document.getElementById("block");

var strCol = "";
var strRow = "";
var colPrev = "fsdf";
var rowPrev = "sdfds";
var par = document.getElementsByTagName('p');



	

	console.log("width: " + document.documentElement.clientWidth + "\nheight: " + document.documentElement.clientHeight);
	block.style.width = document.documentElement.clientWidth + "px"; 
	block.style.height = document.documentElement.clientHeight + "px"; 

	/*************************Splitting canvas into cells using Grid**************************/
	if(colPrev=="" && rowPrev==""){
		//console.log("width: " + typeof(document.documentElement.clientWidth));
		block.style.gridTemplateColumns = "";
		block.style.gridTemplateRows = "";
		strCol = "";
		strRow = "";
		for(var i=0; i<par.length; i++){
			par[i].style.background = "none"; //Обнуление фона
		}

		for(var i=0; i<document.documentElement.clientWidth/13; i++){
			strCol += " 1fr";
			block.style.gridTemplateColumns = strCol;	
		}
		for(var i=0; i<document.documentElement.clientHeight/16; i++){
			strRow += " 1fr";
			block.style.gridTemplateRows = strRow;
		}	
		colPrev = window.getComputedStyle(block).gridTemplateColumns; /*В переменную записывается актуальное значение свойства*/
		rowPrev = window.getComputedStyle(block).gridTemplateRows;
		//console.log("cols: " + colPrev + "\nrows: " + rowPrev);	
	}
	else if(colPrev!="" && rowPrev!=""){
		block.style.gridTemplateColumns = "";
		block.style.gridTemplateRows = "";
		strCol = "";
		strRow = "";
		for(var i=0; i<par.length; i++){
			par[i].style.background = "none"; //Обнуление фона
		}
		for(var i=0; i<document.documentElement.clientWidth/15; i++){
			strCol += " 1fr";
			block.style.gridTemplateColumns = strCol;	
		}
		for(var i=0; i<document.documentElement.clientHeight/16; i++){
			strRow += " 1fr";
			block.style.gridTemplateRows = strRow;	
		}
		colPrev = window.getComputedStyle(block).gridTemplateColumns; /*В переменную записывается актуальное значение свойства*/
		rowPrev = window.getComputedStyle(block).gridTemplateRows;
		//console.log("cols: " + colPrev + "\nrows: " + rowPrev);
	}

	/**************************Counting how many rows and cols****************************/
	var countCols = 0;
	var countRows = 0;
	
	for(var i=0; i<strCol.length; i++){
		if(strCol[i]=="1"){	
			countCols++;
		}
	}

	for(var i=0; i<strRow.length; i++){
		if(strRow[i]=="1"){	
			countRows++;
		}
	}
	
	//console.log("cols: " + countCols + "\n" + strCol + "\nrows: " + countRows + "\n" + strRow);
	
	/************************Adding <p> tags into cells****************************/
	//In beginning deleting all <p> tags before adding new
	
	//console.log("p count before: " + par.length);
	for(var i=0; i<par.length; ){ 
		par[i].remove(); /*A list of <p> goes forward after deleting 1-st element, so icrement can not be used*/
	}
	//console.log("p count after: " + par.length);

	for(var i=1; i<=countRows*countCols; i++){
		var temp = document.createElement('p');
		block.append(temp);
	}
	//console.log("p count: " + par.length);

	for(var i=0; i<par.length; i++){
		par[i].style.display = "flex";
		par[i].style.alignItems = "center";
		par[i].style.justifyContent = "center";
	}

	/*************************Drawing letters in cells***************************/
	//var counter = 0;
	var custom = "obj";
	var b = 0;
	var letter = 0;

	for(var i=0; i<countCols; i++){
		window[custom + i] = { 
			counter: 0,
			start: 0,
			end: 0,
			index: 0
		};
	}
	
function drawCols(){
	/*Math.floor(Math.random() * (max - min + 1)) + min*/
	var j = Math.floor(Math.random() * ((countCols - 1) - 0 + 1)) + 0;
	
	b = j;
	
	window[custom + b].start = j; 
	window[custom + b].end = j;
	//console.log("index: " + j);

		time = setInterval(function(){
			console.log("obj " + b + " in!");

			if(window[custom + b].counter<countRows){ 
				window[custom + b].counter++;
				
				
				if(window[custom + b].counter==1){
					//par[window[custom + b].end].style.background = "yellow";
					par[window[custom + b].end].style.opacity = "1";
					
					letter = Math.floor(Math.random() * ((alf.length - 1) - 0 + 1)) + 0;
					par[window[custom + b].end].innerHTML = alf[letter];
				}

				else{
					letter = Math.floor(Math.random() * ((alf.length - 1) - 0 + 1)) + 0;
					par[window[custom + b].end].innerHTML = alf[letter];
					
					
					//par[window[custom + b].end].style.background = "red";

					par[window[custom + b].end].style.opacity = "0";
					par[window[custom + b].end].style.transition = "opacity 0.5s linear 0.3s, background 0s linear";

					window[custom + b].end+=countCols;
					//par[window[custom + b].end].style.background = "yellow";

					letter = Math.floor(Math.random() * ((alf.length - 1) - 0 + 1)) + 0;
					par[window[custom + b].end].innerHTML = alf[letter];	
				}		
			}
			else if(window[custom + b].counter==countRows){ 
				letter = Math.floor(Math.random() * ((alf.length - 1) - 0 + 1)) + 0;
				par[window[custom + b].end].innerHTML = alf[letter];

				//par[window[custom + b].end].style.background = "red";
				par[window[custom + b].end].style.opacity = "0";
				par[window[custom + b].end].style.transition = "opacity 0.5s linear 0.5s, background 0s linear";

				window[custom + b].counter = 0; 
				
				/*************"Clearing" all cells in column after drawing************/
				setTimeout(function(){ 
					for(var i = window[custom + b].start; i<=window[custom + b].end; i+=countCols){
						par[i].style.background = "none";
						par[i].style.opacity = "";
						par[i].innerHTML = "";
					}
				}, 940);
					
				clearInterval(time);
			}
		}, 100);
	//console.log("9s passed!");
}; 
setTimeout(drawCols, 1000);
setInterval(drawCols, 9000); 
