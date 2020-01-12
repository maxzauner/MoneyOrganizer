var db;
var databasename = "todo";
var storename = "todos";


// function to open a database
function openDb() {
    var request = indexedDB.open(databasename, 4);
    request.onerror = function () {
        alert("Sorry! Browser doesn't support required features!");
    };
    request.onsuccess = function () {
        db = request.result;
        listTodos();
    };

    request.onupgradeneeded = function () {
        var newVersion = request.result;
        if (!newVersion.objectStoreNames.contains(storename)) {
            var store = newVersion.createObjectStore(storename, { autoIncrement: true });
            var index = store.createIndex("dateindex", "date", { unique: false });
        }
    }
}

function editTodo(key) {
    var transaction = db.transaction([storename], "readonly");
    var store = transaction.objectStore(storename);
    var getRequest = store.get(key);

    getRequest.onsuccess = function () {
        var todo = request.result;
        if (todo !== undefined) {
            $("#txtText").val(todo.text);
            $("#expensePriceInput").val(todo.date);
            $("#key").val(key);
            // show relevant buttons
            $("#divUpdate").css("visibility", "visible");
            $("#btnAdd").hide();
        }
    };
}
/*
function cancelEdit() {
    $("#txtText").val("");
    $("#txtDate").val("");
    // hide and show  relevant buttons
    $("#divUpdate").css("visibility", "invisible");
    $("#btnAdd").show();
}

 */

function addTodo() {
    var text = $("#txtText").val();
    if (text == "") {
        alert("Please enter text for todo!");
        return;
    }
    var date = $("#expensePriceInput").val();
    if (date == "") {
        alert("Please enter date for todo!");
        return;
    }

    var todo = { text: $("#txtText").val(), date: $("#expensePriceInput").val() };

    var transaction = db.transaction([storename], "readwrite");
    var store = transaction.objectStore(storename);
    var addrequest = store.add(todo);

    addrequest.onsuccess = function () {
        listTodos();
    };

    addrequest.onerror = function () {
        alert("Could not add todo!");
    };
}

function deleteTodo(key) {
    var resp = confirm("Do you really want to delete todo??");
    if (!resp)
        return;

    var transaction = db.transaction(storename, "readwrite");
    var store = transaction.objectStore(storename);
    var deleteRequest = store.delete(key);

    deleteRequest.onsuccess = function () {
        listTodos();
    };
}

/*
function updateTodo() {
    var todo;
    var key = Number($("#key").val());
    var transaction = db.transaction(storename, "readwrite");
    var store = transaction.objectStore(storename);
    var getRequest = store.get(key);

    getRequest.onsuccess = function (event) {
        todo = event.target.result;
        // now modify the name and date
        todo.text = $("#txtText").val();
        todo.date = $("#txtDate").val();

        var putRequest = store.put(todo, key);
        putRequest.onsuccess = function () {
            listTodos();
            cancelEdit();
        }
    };
}

 */

function listTodos() {
    var list = "";
    var todo;
    var transaction = db.transaction(storename, "readonly");
    var store = transaction.objectStore(storename);
    var index = store.index("dateindex");
    var cursor = index.openCursor();





    cursor.onsuccess = function (event) {
        todo = event.target.result;
        if (todo != null) {
            list += "<tr><td><button onclick='deleteTodo(" + todo.primaryKey +
                ")'>Delete</button> </td>"
            list += "<td>" + todo.value.date + " </td><td>" + todo.value.text + "</td></tr>";
            todo.continue();
            console.log("passt");
        }
        else {


            if (list === "")
                $("#todosList").html("No todos found!");
            else

                return todo.value.date


                $("#todosList").html("<table class='todos'><tr><th>Action</th><th class='price'>Date</th><th>Task</th></tr>"
                    + list + "</table>");
                console.log("ee");


                var list = todo.value.date;
                var table = "<table class='todos'><tr><th>Action</th><th class='price'>Date</th><th>Task</th></tr>" + list + "</table>";
                $("#todosList").append(list);

        }


    };



}
