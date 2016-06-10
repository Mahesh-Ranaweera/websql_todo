var msg;

if (window.openDatabase) {

    //db (database name, version num, description, size of db in byte[1024*1024 = 1MB])
    var db = openDatabase("todo", "0.1", "TodoApp", 1024 * 1024);

    db.transaction(function (x) {
        x.executeSql("CREATE TABLE IF NOT EXIST task (id INTEGER PRIMARY KEY ASC , todotxt TEXT, tag TEXT)");
    });
} else {
    /*msg = "Connection error";
    document.getElementById("").innerHTML = msg;*/
    alert("db not found");
}

//todo display func
function todo_info(transaction, results){
    var todo_list = "";
    var cont_list = document.getElementById("");
    
    cont_list.innerHTML = "";
    
    for (var i=0; i < results.rows.length; i++){
        var row = results.rows.item(i);
        
        cont_list.innerHTML += "<li>"+row.make + " - "+ row.todotxt + " - "+row.tag + " - <br>";
    }
}

function outp_todo(){
    if (db){
        //Select info from the websql
        db.transaction(function(y){
            y.executeSql("SELECT * FROM task", [], todo_info);
        });
    }
    else{
        alert("db not found");
    }
}

function add_todo(){
    if(db){
        var todotxt = document.getElementById("todotxt").value;
        var tag     = document.getElementById("tag").value;
        
        //if the text is not empty
        if (todotxt != "" && tag != ""){
            db.transaction(function(t){
                t.executeSql("INSERT INTO task (todotxt, tag) VALUES (?, ?)",[todotxt, tag]);
                outp_todo();
            });
        }
        else{
            alert("db not found");
        }
    }
    else{
        alert("db not found");
    }
}

function delete_todo(){
    if(db){
        db.transaction(function(t){
            t.executeSql("DELETE FROM task WHERE id=?", [id], outp_todo);
        });
    }
    else{
        alert("db not found");
    }
}

outp_todo();