/**
 *@author Max Zauner
 *@class BudgetHandler
 *
 *
 */


class BudgetHandler {
    constructor() {
        this.incomeInput = $("#incomeInput");
        this.saveMoney = $("#saveMoneyInput")
        this.monthValue = $("#monthValue");
        this.budgetValue = $("#budgetValue");
        this.incomeValue = $("#incomeValue");
        this.expenseList = $("#expense-list");
        this.item = $("#expenseItem");
        this.newIncome = $("#newIncome");
        this.moneyAlert = $("#moneyAlert");


    }

    /**
     * submitBudgetForm function
     * checks if data is entered and sets the value of income in UI
     * calls the function calculateNewBudget with the parameter expense
     * @return {void}
     *
     */

    submitBudgetForm(){
        const value = this.incomeInput.val();
        if(value === '' || value < 0){
            alert("Es muss etwas positives eingegeben werden");

        } else {
            this.incomeValue.text(value);

            let expense = 0;
            location.href = "#p2";
            this.calculateNewBudget(expense);

            let d = new Date();
            let months = ["Januar", "Februar", "März", "April", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            let date = months[d.getMonth()] + " " + d.getFullYear();

            this.monthValue.text(date);

        }
    }

    /**
     * calculateNewBudget function
     * calculates the new budget and sets it in UI
     * @param expense
     * @return {void}
     * calculates the new budget and sets it in UI
     */


    calculateNewBudget(expense) {

        let incomeFloat = parseFloat(this.incomeValue.text());
        const newBudget = incomeFloat - expense;

        let num = Number(newBudget);
        let round = num.toFixed(2);
        let roundedNum = Number(round);

        this.budgetValue.text(roundedNum);




    }


    /**
     * addNewIncome function
     * adds the new income from the user and calculates the new budget
     * @return {void}
     */


    addNewIncome() {
        const value = this.newIncome.val();
        if (value === '') {
            alert("Das Einkommen darf keinen negativen Betrag haben!");
        } else {
            let oldIncome = parseFloat(this.incomeValue.text());
            let newIncome = parseFloat(this.newIncome.val());
            const newCalculatedIncome = oldIncome + newIncome;

            let incomeNum = Number(newCalculatedIncome);
            let roundIncome = incomeNum.toFixed(2);
            let roundedIncomeNum = Number(roundIncome);

            this.incomeValue.text(roundedIncomeNum);

            let oldBudget = parseFloat(this.budgetValue.text());
            let newBudget = oldBudget + newIncome;

            let budgetNum = Number(newBudget);
            let roundBudget = budgetNum.toFixed(2);
            let roundedBudgetNum = Number(roundBudget);

            this.budgetValue.text(roundedBudgetNum);

            this.newIncome.val("");
        }

    }

    /**
     * checkLeftBudget function
     * compares the left budget with the money, the user wants to save
     * @return {void}
     *
     */

    checkLeftBudget() {
        let moneySave = parseFloat(this.saveMoney.val());
        let budgetLeft = parseFloat(this.budgetValue.text());
        let setText = "Du hast dein Budget leider überschritten";

        if (moneySave > budgetLeft) {
            this.moneyAlert.text(setText);
        }
    }



}
