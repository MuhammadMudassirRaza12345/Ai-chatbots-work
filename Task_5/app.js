function think() {


    let cityName = document.getElementById("cityName").value;
    let cityname = document.getElementById("cityName").value = '';


    // Make a request for a user with a given ID  
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1af3f657a272bb6328f2c886a1d6d157&units=metric`)

    .then(
        function (response) {

    let temp = response.data.main.temp
    let minTemp = response.data.main.temp_min
    let maxTemp = response.data.main.temp_max
    var result = document.getElementById("result");
     let tempr = response.data
        // console.log(tempr)


        // console.log("result: ", result);

    switch (true) {
       

        case ((temp < -10) || (minTemp < -10)):
            alert(" Dont go out its too cold  :" + temp + "\u00B0C")
            result.innerText = `Dont go out its too cold : ${temp} \u00B0 C`;
            break;

        case (temp > 35 || maxTemp > 35):
            alert("Dont go outside its too hot :" + temp + "\u00B0C")
            result.innerText = `Dont go outside its too hot :${temp} \u00B0 C`;
            break;


        case ((temp >= -10 && temp <= 5) || (minTemp >= -10 && minTemp <= 5)):
            alert(" Carry coat and be care full :" + temp + "\u00B0C")
            result.innerText = `Carry coat and be care full : ${temp}\u00B0 C`;
            break;

        case ((temp > 5 && temp <= 20) || (minTemp > 5 && minTemp <= 20)):
            alert(" Carry jacket with you :" + temp + "\u00B0C")
            result.innerText = `Carry jacket with you  :${temp}\u00B0 C`;
            break;

        case (temp > 20 && temp <= 35):
            alert(" Dont carry jacket :" + temp + "\u00B0C")
            result.innerText = `Dont carry jacket :  ${temp}\u00B0C`;
            break;

        default:
            result.innerText = "Sorry! No Result Found"
            break;







    }
})
.catch(function (error) {
    // handle error
    console.log(error);
})




}


    // var result = document.getElementById("result");
    // // var maxTemp = 25;
    // var perp = 25; // 0 - 100







