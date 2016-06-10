//register
function register() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var passw = document.getElementById("passw").value;
    var repassw = document.getElementById("repassw").value;
    var dbSize = 5 * 1024 * 1024; //5MB
    var msg;
    var command;

    if (name != "" && email != "" && passw != "" && repassw != "") {

        if (passw == repassw) {
            //open connection
            var db = openDatabase('userDB', '1.0', 'userDB cont', dbSize);

            //create database credential if not exist
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS credentials (email unique, name, passw, repassw )');

                //command with the new user register entry
                command = 'INSERT INTO credentials (email, name, passw, repassw) VALUES ("' + email + '","' + name + '","' + passw + '","' + repassw + '")';
                tx.executeSql(command);

                //info to diplay
                msg = 'Entry created with name: ' + name + " and email: " + email;

                //change background color of the information
                document.getElementById("output").style.backgroundColor = "aquamarine";
                document.querySelector('#output').innerHTML = msg;
            });
        } else {
            //info to diplay
            msg = 'Password do not match!';

            //change background color of the information
            document.getElementById("output").style.backgroundColor = "rgba(231, 76, 60, 1)";
            document.getElementById("output").innerHTML = msg;
        }

    } else {
        msg = "You missed something!";
        document.getElementById("output").style.backgroundColor = "rgba(231, 76, 60, 1)";
        document.getElementById("output").innerHTML = msg;
    }
}