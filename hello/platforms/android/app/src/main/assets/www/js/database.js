/*
var request = indexedDB.open('database', 1);


//aenderung/Erzeugungs-Event
request.onupgradeneeded = function () {
    console.log("Datenbank wurde angelegt");
    var db = this.result;
    if (!db.objectStoreNames.contains('features')) {
        store = db.createObjectStore('features', {
            keyPath: 'key',
            autoIncrement: true
        });
    }
};


request.onsuccess = function() {

    console.log('Datenbank geöffnet');
    var db = this.result;

    var item = { title: 'Web Storage' };

    /*
    var expense = {
        title: ,
        price: ,
        date:
    };


// Speicher-Transaktion
    var trans = db.transaction(['features'], 'readwrite');
    var store = trans.objectStore('features');
    var request = store.put(item); // `item` in dem Store ablegen


//Öffnungs-event
    request.onsuccess = function () {

        console.log('Eintrag ' + request.result + ' gespeichert');
        console.log(item);

        // Auslese-Transaktion
        var trans = db.transaction(['features'], 'readonly');
        var store = trans.objectStore('features');


    };

};

 */





class db {

    constructor(expense) {

        /*
        storeExpenese(){
            let date = this.expense.date;
        }
         */

        let request = indexedDB.open('database', 1);

        //aenderung/Erzeugungs-Event
        request.onupgradeneeded = function () {

            console.log("das expense" + expense);
            console.log("Datenbank wurde angelegt");
            let db = this.result;
            if (!db.objectStoreNames.contains('features')) {
                let store = db.createObjectStore('features', {
                    keyPath: 'key',
                    autoIncrement: true
                });

            }
        };



        request.onsuccess = function() {

            console.log('Datenbank geöffnet');
            let db = this.result;

            let item = { title: 'Web Storage' };

            //let expense = expense.title


            // Speicher-Transaktion
            let trans = db.transaction(['features'], 'readwrite');
            let store = trans.objectStore('features');
            let request = store.put(item); // `item` in dem Store ablegen


            //Öffnungs-event
            request.onsuccess = function () {

                console.log('Eintrag ' + request.result + ' gespeichert');
                console.log(item);

                // Auslese-Transaktion
                let trans = db.transaction(['features'], 'readonly');
                let store = trans.objectStore('features');


            };

        };


    }


    toString() {

        return `Name of Person: ` + this.expenseItem;
    }


    /*

    start() {
        console.log(this.expensePrice);

        let request = indexedDB.open('database', 1);

        //aenderung/Erzeugungs-Event
        request.onupgradeneeded = function () {
            console.log("Datenbank wurde angelegt");
            let db = this.result;
            if (!db.objectStoreNames.contains('features')) {
                let store = db.createObjectStore('features', {
                    keyPath: 'key',
                    autoIncrement: true
                });
            }
        };


        request.onsuccess = function() {

            console.log('Datenbank geöffnet');
            let db = this.result;

            let item = { title: 'Web Storage' };

            //let expense = expense.title


            // Speicher-Transaktion
            let trans = db.transaction(['features'], 'readwrite');
            let store = trans.objectStore('features');
            let request = store.put(item); // `item` in dem Store ablegen


            //Öffnungs-event
            request.onsuccess = function () {

                console.log('Eintrag ' + request.result + ' gespeichert');
                console.log(item);

                // Auslese-Transaktion
                let trans = db.transaction(['features'], 'readonly');
                let store = trans.objectStore('features');


            };

        };
    }

     */


}





/*
let db;
let databaseName = "expense";
let storeName = "expenses";

function openDb() {
    let request = indexedDB.open(databaseName, 4);
    request.onerror = function () {
        alert("Sorry! Browser doesn't support required features!");
    };
    request.onsuccess = function () {
        db = request.result;
        //listTodos();
    };

    request.onupgradeneeded = function () {
        alert("onupgrad");

        let newVersion = request.result;
        if (!newVersion.objectStoreNames.contains(storeName)) {
            let store = newVersion.createObjectStore(storeName, { autoIncrement: true });
            let index = store.createIndex("dateindex", "date", { unique: false });
        }
    }
}

 */
