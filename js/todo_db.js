//open the database connection

if(window.openDatabase){
    //create the database for the todo
    // required fields are Title, Date, Task, Description, and Tag : 1024*1024 = 1MB
    var db = openDatabase("todo_db","0.1","todo_list", 2*1024*1024);
    
    db.transaction(function(t){
        t.executeSql("CREATE TABLE IF NOT EXIST todo (id INTEGER PRIMARY KEY ASC, date TEXT, title TEXT, task TEXT, desc TEXT, tag TEXT)");
    });
}
else{
    alert("Something went wrong!");
}

function addTodo(){
    //check status of db is available
    if(db){
        //get info from the input panel
        var title = document.getElementById("title_txt").value;
        var date  = document.getElementById("date_txt").value;
        var task  = document.getElementById("task_txt").value;
        var desc  = document.getElementById("desc_txt").value;
        var tag   = document.getElementById("tag_txt").value;
        
        //check weather data is entered into the inputs
        if (title != "" && date != "" && task != "" && desc !="" && tag != ""){
            
            //enter the values into the db
            db.transaction(function(t){
                t.executeSql("INSERT INTO todo (date, title, task, desc, tag) VALUES (?, ?, ?, ?, ?)", [date, title, task, desc, tag]);
                
                displayTodo();
            });
        }
        else{
            alert("You have to fill all the blanks");
        }
    }
    else{
        alert("Something went wrong!");
    }
}

function displayTodo(){
    //check status of db is available
    if(db){
        //get info from the db
        db.transaction(function(t){
            // * means select all from the given table
            t.executeSql("SELECT * FROM * todo", [], refreshTodo);
        });
    }
    else{
        alert("Something went wrong!");
    }
}

function refreshTodo(transaction, results){
    var todoTask = "";
    var todoList = document.getElementById("todo_container");
    
    todoList.innerHTML = "";
    
    for(var i = 0; i < results.rows.length; i++){
        //info from each row
        var todoRow = results.rows.item(i);
        
        //display the info in todo cards
        
        todoList.innerHTML += "<p>"+todoRow.date+" "+todoRow.title+" "+todoRow.task+" "+todoRow.desc+" "+todoRow.tag+"</p>";
    }
}




function removeTodo(){
    
}


displayTodo();