
let transactions = JSON.parse(localStorage.getItem('user_transactions'))||[];
let transactionForm = document.querySelector('.transactions');
transactionForm.addEventListener('submit',event=>{
    event.preventDefault();
    const newtransaction = {
        Id:Date.now(),
        description: document.getElementById("f-description").value,
        amount: document.getElementById('f-amount').value,
        date:document.getElementById('f-date').value,
        type:document.querySelector('input[name=type]:checked')?.value||'income',
    };    
    transactions.push(newtransaction);
    localStorage.setItem('user_transactions',JSON.stringify(transactions));
    console.log(transactions);
    transactionForm.reset();
    renderTransactions();
});
const RecordList = document.querySelector('.t-records-list');
const chevron = document.getElementById('chevron');
const dropdownBtn = document.getElementById('t-icon-btn');

function renderTransactions(){
    if(transactions.length===0){
        RecordList.innerHTML = `
        <div class="empty-list">
        <p>No Transactions recorded. Add a transaction</p></div>s`;
        return;
    }
    RecordList.innerHTML = transactions
    .slice()
    .sort((a,b)=>new Date(b.date)-new Date(a.date))
    .map(tx => `
            <div class="t-record" data-id="${tx.Id}">
                <div class="t-record-left">
                    <div class="t-icon ${tx.type === 'income' ? 't-icon-income' : 't-icon-expense'}">
                        <span class="material-symbols-outlined">
                            ${tx.type === 'income' ? 'payments' : 'shopping_cart'}
                        </span>
                    </div>
                    <div class="t-record-details">
                        <h4>${tx.description}</h4>
                        <p>${tx.date}</p>
                    </div>
                </div>
                <div class="t-record-amount ${tx.type === 'income' ? 'text-income' : 'text-expense'}">
                    ${tx.type === 'income' ? '+' : '-'}KSh ${parseFloat(tx.amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </div>
            </div>
        `).join('');
}

dropdownBtn.addEventListener('click',event=>{

    RecordList.classList.toggle('collapsed');
    chevron.classList.toggle('open');
})























const fileInput = document.getElementById('file-upload');
const profileDisplay = document.querySelector('.profile-img');

fileInput.addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = function() {
        profileDisplay.style.backgroundImage = `url(${reader.result})`;
    }
    reader.readAsDataURL(fileInput.files[0]);
})