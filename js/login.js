//login
function login() {
    var name = document.getElementById("name").value;
    //var email = document.getElementById("email").value;
    var passw = document.getElementById("passw").value;
    //var repassw = document.getElementById("repassw").value;
    //var dbSize = 5 * 1024 * 1024; //5MB
    var msg;
    //var command;

    if (name != "" && passw != "") {
        msg = "Result";
        document.getElementById("output").style.backgroundColor = "aquamarine";
        document.querySelector('#output').innerHTML = msg;
    } else {
        msg = "You missed something!";
        document.getElementById("output").style.backgroundColor = "rgba(231, 76, 60, 1)";
        document.getElementById("output").innerHTML = msg;
    }
}