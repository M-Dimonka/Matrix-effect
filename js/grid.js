var alf = ["A", "B", "C", "D", "E", "F", "F", "G", "H", "I", "J", "К", "L", "М", "N", "О", "P", "Q", "R", "S", "T", "U", "V", 
"W", "X", "Y", "Z"]; 
var block = document.getElementById("block");

var strCol = "";
var strRow = "";
var colPrev = "fsdf"; //Указываю, что строка не пустая
var rowPrev = "sdfds";
var par = document.getElementsByTagName('p');



	

	console.log("width: " + document.documentElement.clientWidth + "\nheight: " + document.documentElement.clientHeight);
	block.style.width = document.documentElement.clientWidth + "px"; /*Узнаю ширину окна браузера*/
	block.style.height = document.documentElement.clientHeight + "px"; /*Узнаю высоту окна браузера*/

	//Разбивка сетки на строки и столбцы; fr не отображает ячейку, это единица для определения размеров колонок и строк,
	//которые заполняют сетку. т.е. в цикле происходит установление размеров колонок и строк, которые, пересекаясь и 
	//образуют ячейки
	/*************************Разбивка экрана на колонки и строки с помощью Grid**************************/
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
		console.log("cols: " + colPrev + "\nrows: " + rowPrev);	
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
		console.log("cols: " + colPrev + "\nrows: " + rowPrev);
	}

	/**************************Посчет кол-ва колонок и строк****************************/
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
	
	console.log("cols: " + countCols + "\n" + strCol + "\nrows: " + countRows + "\n" + strRow);
	
	
	/************************Добавление тегов <p> в образованные ячейки****************************/
	//При клике сначала удаляю все теги <p>, затем заполняю по новой сетку тегами для возможности обращения к ячейкам
	
	console.log("p count before: " + par.length);
	for(var i=0; i<par.length; ){ 
		par[i].remove(); /*Список сдвигается вперёд при удалении 1-го элемента, поэтому инкремент не нужен*/
	}
	console.log("p count after: " + par.length);

	for(var i=1; i<=countRows*countCols; i++){
		var temp = document.createElement('p');
		block.append(temp);
	}
	console.log("p count: " + par.length);
	/*par[0].remove();
	console.log("p count: " + par.length);*/
	
	for(var i=0; i<par.length; i++){
		par[i].style.display = "flex";
		par[i].style.alignItems = "center";
		par[i].style.justifyContent = "center";
		
	}

	/*************************Прорисовка букв в ячейках***************************/
	/*Т.к. индекс не сбрасывается при переходе на новую строку, а идёт дальше, то для вывода первых элементов в колонку 
	необходимо прибавлять длину строки*/
	//var counter = 0;
	var custom = "obj";
	var b = 0;
	var letter = 0;

	/*Создаю объект с полем counter, которому присваивается 0*/
	for(var i=0; i<countCols; i++){
		window[custom + i] = { /*Задание имени объекту при помощи window[custom(значение переменной) + i]*/
			counter: 0,
			start: 0,
			end: 0,
			index: 0
		};
		//console.log("obj " + i + " counter = " + window[custom + i].counter + "\n");
	}
	
function drawCols(){
	/*Случайное целое число в диапазоне от min до max, включая min и max значения
	по ф-ле: Math.floor(Math.random() * (max - min + 1)) + min*/
	/*У каждой колонки своё поле counter, для объекта есть свой индекс, для элементов, которые идут вниз - свой, т.к. 
	они увеличиваются по-разному*/
	var j = Math.floor(Math.random() * ((countCols - 1) - 0 + 1)) + 0;
	
	b = j;
	//Индекс числа, колонки в которой оно будет находиться
	window[custom + b].start = j; /*Для каждой колонки свой начальный и конечный индекс*/
	window[custom + b].end = j;
	//console.log("index: " + j);

		/*Функция не может вызываться одновременно для нескольких столбцов*/
		/*Каждые 500мс вызывается функция появления элементов в столбик*/
		time = setInterval(function(){
			console.log("obj " + b + " in!");

			if(window[custom + b].counter<countRows){ //Сначала проверяется предыдущее значение, затем назначается новое
				window[custom + b].counter++;
				//console.log("counter " + m + ": " + window[custom + m].counter);
				
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
			else if(window[custom + b].counter==countRows){ /*На следующем заходе желтая ячейка становится красной*/
				letter = Math.floor(Math.random() * ((alf.length - 1) - 0 + 1)) + 0;
				par[window[custom + b].end].innerHTML = alf[letter];

				//par[window[custom + b].end].style.background = "red";
				par[window[custom + b].end].style.opacity = "0";
				par[window[custom + b].end].style.transition = "opacity 0.5s linear 0.5s, background 0s linear";

				window[custom + b].counter = 0; /*Сброс значения поля counter, чтобы ф-я могла вызываться по новой для 
				текущей колонки*/
				
				/*************"Очистка" ячеек************/
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
		console.log("1.5s passed!");
		
	
}; /*setInterval позволяет задать интервал для регулярного вызова функции; здесь: через интервал в 
2000мс(2с) вызывается функция func, которая вызывает другую ф-ю по отрисовке колонки за 200мс*/
setTimeout(drawCols, 1000);
setInterval(drawCols, 9000); //Интервал вызова функции по отрисовке колонок


/*var variable = "num"; /*Значение variable, которое присваивается в дальнейшем в качестве нового имения для друих переменных
for(var i=1; i<=5; i++){
	window[variable + i] = "number " + i;
	console.log("num" + i + " = " + window[variable + i]);
}*/
