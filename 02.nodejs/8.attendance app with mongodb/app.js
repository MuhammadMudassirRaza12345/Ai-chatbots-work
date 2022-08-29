 
// import axios from 'axios';
// const baseUrl = "http://localhost:3000";
// // const baseUrl = "https://yourappname.herokuapp.com";

// function addStudent() {
//     let studentName = document.getElementById("input1").value;
//     let studentRoll = document.getElementById("input2").value;
//     // console.log(studentRoll)
//     let studentBatchNo = document.getElementById("input3").value;
//     let studentDepartment = document.getElementById("input4").value;

//     var result = document.getElementById("result");

//     axios.post(`${baseUrl}/student`, {
//         studentName: studentName,
//         studentRoll:  studentRoll,
                    
//         studentBatchNo:  studentBatchNo,
//         studentDepartment:studentDepartment
//     })
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);
//             result.innerText = responseData;

//             getAllStudents();
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// function getAllStudents() {
//     var posts = document.getElementById("posts");

//     axios.get(`${baseUrl}/students`)
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);

//             posts.innerHTML = "";

//             responseData.map(eachStudent => {
//                 posts.innerHTML = `
//                <div class="col  ">
//                 <div class="card text-light bg-dark"  id="${eachStudent._id}">
//                     <div class="card-body">
//                         <h6 class="card-subtitle mb-2 text-warning">${eachStudent._id}</h6>
//                         <h5 class="card-title">student_Name :${eachStudent.studentName}</h5>
//                         <p class="card-text">Roll NO : ${eachStudent.studentRoll} </p>
//                         <p class="card-text">BATCH NO : ${eachStudent.studentBatchNo} </p>
//                         <p class="card-text">DEPARTMENT: ${eachStudent.studentDepartment} </p>
                       
//                         <button href="#" class="btn btn-primary" onclick="markAttendance('${eachStudent._id}', '${eachStudent.studentName}')">Mark Present</button>
//                     </div>
//                 </div>


//                </div>
               
//                `
//                 // <hr />  
//                 // <br />`
//                  + posts.innerHTML;
//             })
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }
// getAllStudents();

// function deletePost(id) {

//     axios.delete(`${baseUrl}/post/${id}`)
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);
//             result.innerText = responseData;

//             getAllStudents();
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// // function updatePost(id) {

// //     let newPost = prompt("please enter new text for that post");

// //     axios.put(`${baseUrl}/post/${id}`, { text: newPost })
// //         .then(function (response) {
// //             let responseData = response.data
// //             console.log("responseData: ", responseData);
// //             result.innerText = responseData;

// //             getAllStudents();
// //         })
// //         .catch(function (error) {
// //             // handle error
// //             console.log(error);
// //         })
// // }
// function updatePost(id) {

//     document.getElementById(id).innerHTML = `
//         <input type="text" id="${id}_text" placeholder="enter new text for this post" />
//         <button onclick="doChanges('${id}')">do changes</button>
//     `;
// }
// function doChanges(id) {

//     let newText = document.getElementById(`${id}_text`).value;

//     axios.put(`${baseUrl}/post/${id}`, { text: newText })
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);
//             result.innerText = responseData;

//             getAllStudents();
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// function markAttendance(id, name) {

//     axios.post(`${baseUrl}/attendance`, {
//         studentId: id,
//         studentName: name,
//         isPresent: true
//     })
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);
//             result.innerText = responseData;
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

// function getAttendance() {
//     var date = document.getElementById("dateInput").value;
//     var att = document.getElementById("att");


//     console.log("date: ", date);

//     axios.get(`${baseUrl}/attendance/${date}`)
//         .then(function (response) {
//             let responseData = response.data
//             console.log("responseData: ", responseData);

//             att.innerHTML = "";

//             responseData.map(eachAtt => {
//                 att.innerHTML =
//                     `<div id="${eachAtt._id}"> 

//                         <p> ${eachAtt.studentName} </p>
//                         <p> ${eachAtt.isPresent} </p>

//                     </div>  
//                 <hr />  
//                 <br />` + posts.innerHTML;
//             })
//         })
//         .catch(function (error) {
//             //handle error
//             console.log(error);
//         })
// }
// getAttendance();



 