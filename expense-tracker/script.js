/**
 * id's: 7
 * balance
 * income-amount
 * expense-amount
 * transaction-list
 * transaction-form
 * description
 * amount
 */
const balanceEL = document.getElementById("balance");
const incomeAmountEL = document.getElementById("income-amount");
const expenseAmountEL = document.getElementById("expense-amount");
const transactionListEL = document.getElementById("transaction-list");
const transactionFormEL = document.getElementById("transaction-form");
const descriptionEL = document.getElementById("description");
const amountEL = document.getElementById("amount");

// get transactions from local storage if any otherwise empty list
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEL.addEventListener("submit", addTransaction);

// addTransaction (add income or expense to list from form data)
function addTransaction(e) {
    e.preventDefault();

    // get form value
    const description = descriptionEL.value.trim();
    const amount = parseFloat(amountEL.value);

    transactions.push({
        id: Date.now(),
        description,
        amount,
    }); // push transaction object onto transactions array

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEL.reset();
} // end addTransaction(e)

//  sorted in reverse list -to append element (to top of list) 
function updateTransactionList() {
    transactionListEL.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEL.appendChild(transactionEl);
    });
}

//  create an html list element for ui
function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expenses");

    const descSpan = document.createElement("span");
    descSpan.textContent = transaction.description;

    const amountSpan = document.createElement("span");
    amountSpan.innerHTML = `${formatCurrency(transaction.amount)} `;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", () => {
        removeTransaction(transaction.id);
    });

    amountSpan.appendChild(deleteBtn);
    li.appendChild(descSpan);
    li.appendChild(amountSpan);

    return li;
}

//  calc balance , income, expenses , with formatting
function updateSummary() {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const income = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenses = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    // update ui
    balanceEL.textContent = formatCurrency(balance);
    incomeAmountEL.textContent = formatCurrency(income);
    expenseAmountEL.textContent = formatCurrency(expenses);
}

//  format currency to USD
function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}

//  remove the clicked -list transaction object
function removeTransaction(id) {

    transactions = transactions.filter((transaction) => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}
// initial render
updateTransactionList();
updateSummary();
