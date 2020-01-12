/**
 * @author Max Zauner
 *
 */

class UI {

    constructor() {
        this.incomeInput = $("#incomeInput");
        this.monthInput = $("#monthInput");
        this.budgetValue = $("#budgetValue");
        this.expenseValue = $("#expenseValue");
        this.monthValue = $("#monthValue");
        this.incomeValue = $("#incomeValue");
        this.expenseItem = $("#txtText");
        this.expensePrice = $("#expensePriceInput");
        this.expenseDate = $("#txtDate");
        this.expenseList = $("#expense-list");
        this.itemList = [];
        this.itemID = 0;
        this.item = $("#expenseItem");
        this.newIncome = $("#newIncome");


        //this.db = new db();

    }






    submitBudgetForm(){
        const value = this.incomeInput.val();
        if(value === '' || value < 0){
            alert("Es muss etwas positives eingegeben werden");

        } else {
            this.incomeValue.text(value);

            location.href = "#p2";
            this.calculateNewBudget();
        }
    }

    calculateNewBudget() {

        const expense = this.getTotalExpense();
        let incomeFloat = parseFloat(this.incomeValue.text());
        const newBudget = incomeFloat - expense;
        this.budgetValue.text(newBudget);

    }


    addNewIncome() {
        const value = this.newIncome.val();
        if (value === '') {
            alert("Das Einkommen darf keinen negativen Betrag haben!");
        } else {
            let oldIncome = parseFloat(this.incomeValue.text());
            let newIncome = parseFloat(this.newIncome.val());
            const newCalculatedIncome = oldIncome + newIncome;
            this.incomeValue.text(newCalculatedIncome);

            let oldBudget = parseFloat(this.budgetValue.text());
            let newBudget = oldBudget + newIncome;
            this.budgetValue.text(newBudget);

            this.newIncome.val("");
        }

    }



    submitExpenseList() {

        const expenseItem = this.expenseItem.val();
        const expensePrice = this.expensePrice.val();


        if(expenseItem === '' || expensePrice === '' || expensePrice < 0) {
            alert("Werte dürfen nicht null oder weniger als null sein");
            } else {
            let price = parseFloat(expensePrice);
            let d = new Date();
            let months = ["1","2","3","4","5","6","7","8","9","10","11","12"];
            let date = d.getDate() + "." + months[d.getMonth()] + "." + d.getFullYear();


            this.expensePrice.val("");
            this.expenseItem.val("");

            let expense = {
                id: this.itemID,
                title: expenseItem,
                price: price,
                date: date
            };

            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.calculateNewBudget();


            /*Test of Db */
            //this.db.openDb();
            //this.db.addExpense(expense);


        }

    }



    addExpense(expense){
        console.log("das ist die id: "  + expense.id);
        console.log("das ist der preis " + expense.price);
        console.log("Das ist das heutige Datum " + expense.date);

        /*
        let price = $("<h3 id='expensePrice' ></h3>").text(expense.price);
        let date = $("<h3 id='expenseDate'></h3>").text(expense.date);
        let title = $("<h3 id='expenseItem'></h3>").text(expense.title);
        $(".expenseList").append(price, date, title);

         */

        const divElement = document.createElement('div');
        divElement.classList.add('expenseList');


        divElement.innerHTML = `<h3 class="expenseDate" >${expense.date}</h3><h3 class="expensePrice" >-${expense.price}€</h3><h3 class="expenseItem">${expense.title}</h3>`;

        $("#list").append(divElement);

    }



    getTotalExpense() {
        let total = 0;

        if(this.itemList.length > 0){
            total = this.itemList.reduce(function(acc, curr){
                acc = acc + curr.price;
                return acc;
            }, 0)
        }
        this.expenseValue.text(total);
        console.log("hier steht der berechnete ausgaben betrag: " + total);


        return total;
    }

}







class DashboardValues {

    get getIncomeInput() {
        var income = $("#incomeInput").val();
        return parseFloat(income);
    }

    get getMonthInput() {
        return $("#monthInput").val();
    }

    setDashboardValues() {

        var setIncomeValue = this.getIncomeInput + " Euro";
        $("#incomeValue").text(setIncomeValue);

        var setBudgetValue = "Budget: " + this.getIncomeInput + " Euro";
        $("#budgetValue").text(setBudgetValue);

        var setMonthValue = this.getMonthInput;
        $("#monthValue").text(setMonthValue);
    }


    /*
    setIncomeValue() {
        var setIncomeValue = this.getIncomeInput + " Euro";
        $("#incomeValue").text(setIncomeValue);
    }

    setBudget() {
        var setBudgetValue = "Budget: " + this.getIncomeInput + " Euro";
        $("#budgetValue").text(setBudgetValue);
    }

    setMonth() {
        var setMonthValue = this.getMonthInput;
        $("#monatValue").text(setMonthValue);
    }

     */

}
class ExpenseHandler {


    get getExpenseItem() {
        return $("#expenseItemInput").val();
    }

    get getExpensePrice() {
        var price = $("#expensePriceInput").val();
        return parseFloat(price);
    }

    get getExpenseDate() {
        return $("#expenseDateInput").val();
    }


    setExpenseList() {


        var expenseItem = this.getExpenseItem;
        $("#expenseItem").text(expenseItem);

        var expensePrice = "-" + this.getExpensePrice + "€";
        $("#expensePrice").text(expensePrice);

        var expenseDate = this.getExpenseDate;
        $("#expenseDate").text(expenseDate);


    }



    calculateBudget() {
        var startBudget = new DashboardValues();
        var budgetInt = startBudget.getIncomeInput;

        var calculateBudget = budgetInt - this.getExpensePrice;
        var budget = "Budget: " + calculateBudget + " Euro";


        var expense = this.getExpensePrice + " Euro";


        $(".tr").css("display", "table-row");


        $("#budgetValue").text(budget);
        $("#expenseValue").text(expense);

    }



    /*
    budgetneu() {


        var totalBudget = $("#budgetValue").val();
        var totalIncome = $("#incomeValue").val();
        console.log("?");

        $("#todosList").children($(".price")).each(function() {
            if ($(this).val() != "") {
                totalBudget = totalIncome - parseInt($(this).val());
                var budget = "Budget: " + totalBudget + " Euro";
                $("#budgetValue").text(budget);
                console.log($(this).val());
            }
        });

    }
    */

}
class Transactions {

    newExpense() {
        var eintrag = new ExpenseHanlder();
        console.log(eintrag);

        var preis = eintrag.getExpensePrice;
        console.log(preis);


    }

    newBudget() {
        var budget = new DashboardValues();
        var income = budget.getIncomeInput;
        console.log(income);
    }

    setDarkMode() {
        $("#p2").css("background-color", "black");
    }
}
