    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyCfdhyE3EWqEJlswIADFeGJvjNfru9v99s",
    authDomain: "jurnalabimanyu.firebaseapp.com",
    projectId: "jurnalabimanyu",
    storageBucket: "jurnalabimanyu.firebasestorage.app",
    messagingSenderId: "726774356243",
    appId: "1:726774356243:web:7d77111e3231f597c2e2e6",
    measurementId: "G-0KL1TD01NF"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // ========================================
    // DOM Elements untuk Jurnal
    // ========================================
    const journalForm = document.getElementById('journal-form');
    const journalDate = document.getElementById('journal-date');
    const journalEntry = document.getElementById('journal-entry');
    const addJournalButton = document.getElementById('add-journal');
    const journalList = document.getElementById('journal-list');

    // ========================================
    // DOM Elements untuk Transaksi
    // ========================================
    const transactionForm = document.getElementById('transaction-form');
    const transactionType = document.getElementById('transaction-type');
    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const addTransactionBtn = document.getElementById('add-transaction');
    const transactionHistoryBody = document.getElementById('transaction-history-body');
    const currentBalance = document.getElementById('current-balance');
    const totalIncome = document.getElementById('total-income');
    const totalExpense = document.getElementById('total-expense');

    // ========================================
    // Variabel Keuangan
    // ========================================
    let balance = 0;
    let income = 0;
    let expense = 0;

    // Format mata uang
    const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    // Update ringkasan transaksi
    const updateSummary = () => {
    currentBalance.textContent = formatCurrency(balance);
    totalIncome.textContent = formatCurrency(income);
    totalExpense.textContent = formatCurrency(expense);
    };

    // Tambahkan transaksi ke riwayat
    const addTransactionToHistory = (type, amount, description) => {
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const row = document.createElement('tr');
    row.className = 'text-gray-100';

    const dateCell = document.createElement('td');
    dateCell.textContent = formattedDate;
    dateCell.className = 'p-2 border-b border-gray-600';

    const typeCell = document.createElement('td');
    typeCell.textContent = type === 'income' ? 'Pemasukan' : 'Pengeluaran';
    typeCell.className = `p-2 border-b border-gray-600 font-semibold ${type === 'income' ? 'text-blue-400' : 'text-red-400'}`;

    const amountCell = document.createElement('td');
    amountCell.textContent = formatCurrency(amount);
    amountCell.className = 'p-2 border-b border-gray-600';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description || '-';
    descriptionCell.className = 'p-2 border-b border-gray-600';

    row.appendChild(dateCell);
    row.appendChild(typeCell);
    row.appendChild(amountCell);
    row.appendChild(descriptionCell);

    transactionHistoryBody.appendChild(row);
    };

    // Tambahkan jurnal ke daftar
    const addJournalToHistory = (date, entry) => {
    const journalItem = document.createElement('li');
    journalItem.className = 'mb-4 p-4 bg-gray-700 text-gray-100 rounded shadow';

    const journalDateElement = document.createElement('p');
    journalDateElement.className = 'text-sm text-gray-400';
    journalDateElement.textContent = `Tanggal: ${date}`;

    const journalContent = document.createElement('p');
    journalContent.className = 'mt-2';
    journalContent.textContent = entry;

    journalItem.appendChild(journalDateElement);
    journalItem.appendChild(journalContent);

    journalList.appendChild(journalItem);
    };

    // ========================================
    // Event Listener untuk Transaksi
    // ========================================
    addTransactionBtn.addEventListener('click', () => {
    const type = transactionType.value;
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Masukkan jumlah yang valid!');
        return;
    }

    if (type === 'income') {
        income += amount;
        balance += amount;
    } else if (type === 'expense') {
        expense += amount;
        balance -= amount;
    }

    addTransactionToHistory(type, amount, description);
    updateSummary();

    amountInput.value = '';
    descriptionInput.value = '';
    });

    // ========================================
    // Event Listener untuk Jurnal
    // ========================================
    addJournalButton.addEventListener('click', () => {
    const date = journalDate.value.trim();
    const entry = journalEntry.value.trim();

    if (!date || !entry) {
        alert('Harap isi tanggal dan catatan sebelum menyimpan!');
        return;
    }

    addJournalToHistory(date, entry);

    journalDate.value = '';
    journalEntry.value = '';
    });

    // ========================================
    // Initial Update
    // ========================================
    updateSummary();
