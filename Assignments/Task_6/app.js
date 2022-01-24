
function think() {
        let tableval  = document.getElementById("cityName").value;
    // let  tablevalue = document.getElementById("cityName").value = '';
    let endvar =+prompt("Enter end val") 


for (var i = 0; i <  endvar; i++) {

            var oneBaseIndex = i + 1
            // document.write();
            var result = document.getElementById("result");

            result.innerHTML +=  `${tableval} X ${oneBaseIndex} = ${oneBaseIndex *  tableval} <br>`

        }

}


function Reset(){
    let  tablevalue = document.getElementById("cityName").value = '';
    var result = document.getElementById("result");
    result.innerHTML =''

}
 