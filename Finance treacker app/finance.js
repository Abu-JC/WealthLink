
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
//The Dropdown button
const RecordList = document.querySelector('.t-records-list');
const chevron = document.getElementById('chevron');
const dropdownBtn = document.getElementById('t-icon-btn');
dropdownBtn.addEventListener('click',event=>{

    RecordList.classList.toggle('collapsed');
    chevron.classList.toggle('open');
})

//Updating transaction history
function renderTransactions(){
    if(transactions.length===0){
        RecordList.innerHTML = `
        <div class="empty-list">
        <p class="t-cleared">No Transactions recorded. Add a transaction</p></div>`;
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
                   ${tx.type === 'income' ? '+' : '-'}KSh ${parseFloat(tx.amount) ? parseFloat(tx.amount).toLocaleString('en-KE', { minimumFractionDigits: 2 }) : '0.00'}
                </div>
            </div>
        `).join('');
}
//Delete button
const clearBtn = document.getElementById('clear-history');
clearBtn.addEventListener('click',event=>{
    transactions = [];
    localStorage.removeItem('user_transactions');
    renderTransactions();
});


const fileInput = document.getElementById('file-upload');
const profileDisplay = document.querySelector('.profile-img');
const savedImage = localStorage.getItem('profile_image');
if (savedImage) {
    profileDisplay.style.backgroundImage = `url(${savedImage})`;
}
fileInput.addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
            // Draw image onto a small canvas to compress it
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 100, 100);

            // Convert canvas to a compressed base64 string
            const compressed = canvas.toDataURL('image/jpeg', 0.5);

            // Apply and save
            profileDisplay.style.backgroundImage = `url(${compressed})`;
            localStorage.setItem('profile_image', compressed);
        }
    }
    reader.readAsDataURL(fileInput.files[0]);
})
renderTransactions();