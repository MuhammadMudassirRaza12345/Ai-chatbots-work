function Loop(){

    

    var matrix1=[
[],
[],
[]
] ;

var matrix2=[
[],
[],
[]
] ;

var result=[
[],
[],
[]

];


var matrix1Span = document.getElementById("matrix1Span");
var  matrix2Span= document.getElementById("matrix2Span");
var resultSpan = document.getElementById("resultSpan");


for (var i = 0; i < 3; i++) {

for (var j = 0; j < 3; j++) {

matrix1[i][j] = Number(prompt(`First Metrics - Enter ${i}, ${j}:`));
matrix1Span.innerText += `${matrix1[i][j]} `
}
matrix1Span .innerText += `\n`;
}
// console.log("input1: ", matrix1);







for(var i=0;i <3;i++){
for(var j=0;j <3;j++){
    matrix2[i][j]=Number(prompt(`Second Matrix - Enter ${i}, ${j}`));
    matrix2Span.innerText += `${matrix2[i][j]}`;


}
matrix2Span.innerText += `\n`;
}


for (var i = 0; i < matrix1.length; i++) {

for (var j = 0; j < matrix2[i].length; j++) {

result[i][j] = matrix1[i][j] + matrix2[i][j];
resultSpan.innerText += `${result[i][j]} `;
}
resultSpan.innerText += `\n`;
}


}




function Map(){

    

    var matrix1=[
[],
[],
[]
] ;

var matrix2=[
[],
[],
[]
] ;

var result=[
[],
[],
[]

];


var matrix1Span = document.getElementById("matrix1Span");
var  matrix2Span= document.getElementById("matrix2Span");
var resultSpan = document.getElementById("resultSpan");


for (var i = 0; i < 3; i++) {

for (var j = 0; j < 3; j++) {

matrix1[i][j] = Number(prompt(`First Metrics - Enter ${i}, ${j}:`));
matrix1Span.innerText += `${matrix1[i][j]} `
}
matrix1Span .innerText += `\n`;
}
// console.log("input1: ", matrix1);





for(var i=0;i <3;i++){
for(var j=0;j <3;j++){
    matrix2[i][j]=Number(prompt(`Second Matrix - Enter ${i}, ${j}`));
    matrix2Span.innerText += `${matrix2[i][j]}`;


}
matrix2Span.innerText += `\n`;
}

matrix1.map((eachRow, i) => {                        // [1,2,7] 2
    //eachRow means matrix rows
    //each row is just a variable element 
        eachRow.map((eachElement, j) => {                // 1 0
// eachElement means rows element or value
            result[i][j] =  matrix1[i][j] + matrix2[i][j];
            
            resultSpan.innerText += `${result[i][j]} `
        });

        resultSpan.innerText += `\n`;
    })


}









