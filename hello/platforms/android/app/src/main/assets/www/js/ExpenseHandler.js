/**
 *@author Max Zauner
 *@class ExpenseHandler
 * handles the data from the expenses
 * calculates the total amount of expenses
 * creates a list of expenses
 *
 */


class ExpenseHandler {
    constructor() {
        this.expenseValue = $("#expenseValue");
        this.expenseItem = $("#txtText");
        this.expensePrice = $("#expensePriceInput");
        this.expenseList = $("#expense-list");
        this.itemList = [];
        this.itemID = 0;
        this.item = $("#expenseItem");
        this.newIncome = $("#newIncome");

    }


    /**
     * submitExpenseList function
     * gets the data from UI and creates an object
     * the object is the parameter for the addExpense function
     * @return {void}
     *
     */

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

            this.getTotalExpense();

        }
    }


    /**
     * addExpense function
     * adds expenses in the UI as a list
     * @param expense - the expense object from the submitExpenseList function
     * @return {void}
     */

    addExpense(expense){

        const divElement = document.createElement('div');
        divElement.classList.add('expenseList');


        divElement.innerHTML = `<h3 class="expenseDate" >${expense.date}</h3><h3 class="expensePrice" >-${expense.price}€</h3><h3 class="expenseItem">${expense.title}</h3>`;

        $("#list").append(divElement);

    }


    /**
     * getTotalExpense function
     * calculate the total expenses of the user
     * sets the total expense in UI
     * @return {number}
     *
     */


    getTotalExpense() {
        let total = 0;
        console.log(this.itemList.length);

        if(this.itemList.length > 0){
            total = this.itemList.reduce(function(acc, curr){
                acc = acc + curr.price;
                return acc;
            }, 0)
        }

        let expenseNum = Number(total);
        let roundExpense = expenseNum.toFixed(2);
        let roundedExpenseNum = Number(roundExpense);

        this.expenseValue.text(roundedExpenseNum);

        const budgetHandler = new BudgetHandler();
        budgetHandler.calculateNewBudget(total);

    }
}
