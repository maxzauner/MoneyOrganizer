

class db {


    /*
    constructor() {

        /*
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




    openDb() {

        let db;
        let storeName = "expenses";

        console.log("Code für database wird ausgeführt");


        let request = indexedDB.open('database', 1);

        request.onerror = function () {
            alert("Sorry! Browser doesn't support required features!");
        };

        request.onsuccess = function () {
            db = request.result;
            console.log("database onScuccess");
            db.listExpenses();
        };

        //aenderung/Erzeugungs-Event
        request.onupgradeneeded = function () {

            console.log("database onUpgraded");
            let newVersion = this.result;
            if (!newVersion.objectStoreNames.contains(storeName)) {
                let store = newVersion.createObjectStore(storeName, {
                    keyPath: 'key',
                    autoIncrement: true
                });
                let dateIndex = store.createIndex("dateindex", "date", { unique: false });
                //let itemIndex = store.createIndex("itemindex", "item", { unique: false });

            }
        };
    }


    addExpense(expense) {

        let storeName = "expenses";
        let db = request.result;

        /*
        const divElement = document.createElement('div');
        divElement.classList.add('expenseList');

        divElement.innerHTML = `<h3 id="expenseDate" >${expense.date}</h3><h3 id="expensePrice" >-${expense.price}€</h3><h3 id="expenseItem">${expense.title}</h3>`;

        $("#list").append(divElement);

         */

        let transaction = db.transaction([storeName], "readwrite");
        let store = transaction.objectStore(storeName);
        let addRequest = store.add(expense);

        addRequest.onsuccess = function (event) {

            db.listExpenses();
        };

        addRequest.onerror = function (event) {
            alert("Could not add todo!");
        };


    }



    listExpenses() {
        let storeName = "expenses";



        let list = "";
        let expense;
        let transaction = db.transaction(storeName, "readonly");
        let store = transaction.objectStore(storeName);
        let index = store.index("dateindex");
        let cursor = index.openCursor();

        cursor.onsuccess = function (event) {
            expense = request.result;
            if (expense != null) {

                //list += "<h3><button onclick='deleteExpense(" + expense.primaryKey + ")'>Delete</button></h3>";
                list += `<h3 class="expenseDate" >${expense.date}</h3><h3 class="expensePrice" >-${expense.price}€</h3><h3 class="expenseItem">${expense.title}</h3>`;
                expense.continue();

            }

            else {

                if (list === "")
                    alert("No todos found!");
                else
                    $("#list").append(list);
            }
        };

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

