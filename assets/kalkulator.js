// menerapkan JS pada web kalkulator 
// buat variabel dengan nilai semua kosong dulu 
const calculator = {
    displayNumber : '0',    // angka awal yyg muncul di web
    operator : null,    // operator yg akan di input pengguna (+ / - / *)
    firstNumber : null, // angka pertama yg akan di input pengguna
    waitingForSecondNumber : false // kalkulator sedang menunggu pengguna menentukkan angka kedua
};

// mengupdate pada display (layar)
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
 }

 // menghapus atau clear kalkulator menjadi 0, null, null, dan false
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// fungsi untuk memasukan angka pada displayNumber
function inputDigit(digit) {
        if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
            calculator.displayNumber = digit;
        } else {
            if (calculator.displayNumber === '0') {     // ini artinya jika nomor awal display = '0' maka... 
            calculator.displayNumber = digit;   // diganti dengan digit yang di klik
        } else {
            calculator.displayNumber += digit; // jika digit di klik akan tampil lagi dan lagi
        }
    }
}
    

// fungsi untuk mengubah angka menjadi negatif atau menjadi positif lagi
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1; // artinya angka yg ada di display akan dikali "-1" 
}                                                              // itu akan menjadi angka negatif pada display

// fungsi untuk operator nya
function handleOperator(operator) {     // Nilai operator tersebut bersumber dari innerText tombol operator yang menjadi event target
    if(!calculator.waitingForSecondNumber) {    // jika waitingforsecond nya true maka...
        calculator.operator = operator;         // operator dapat dijalankan
        calculator.waitingForSecondNumber = true; 
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }
}

// Fungsi ini digunakan untuk melakukan kalkulasi terhadap nilai - nilai yang terdapat pada objek calculator
function performCalculation() {
//  jika firstNumber        itu  kosong atau        operator  itu kosong .... maka      
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator"); // tampilkan ini
        return;
    }
    
// proses operator
    let result = 0; // buat variabel kosong untuk menampung angka hasil akhir
    if (calculator.operator === "+") {  // jika operator itu adalah plus (+)
// Kita menggunakan 'parseInt()' untuk mengubah nilai string menjadi number karena semua ini adalah str
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber); // maka jalankan ini
    } else {                                                        // jika operator bukan (+) maka ...
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber) // jalankan ini
    }




// objek yang akan dikirimkan sebagai argumen fungsi putHistory()
const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
}
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();          // dan ini hasil yg akan ditampilkan
}

// kita buat variabel buttons dengan menginisialisasikan nilai seluruh elemen button yang ada
const buttons = document.querySelectorAll(".button");
// kemudian kita looping nilainya
for (let button of buttons) {  
    button.addEventListener('click', function(event) {  // dan berikan event click pada tiap itemnya        
        const target = event.target;    // mendapatkan objek elemen yang diklik
        
// Kita bisa memanfaatkan "event.classList" untuk melihat nilai class apa saja dalam bentuk array yang ada pada element target
// kemudian menggunakan "contains()" yang merupakan method dari array yang berguna untuk memastikan nilai yang terkandung di dalam array tersebut      
        if (target.classList.contains('clear')) {   // artinya jika clear/"CE" di click maka..
            clearCalculator();                  // kalkulator akan clear atau dihapus dan..
            updateDisplay();                // display di update
            return;             // kita return agar kembali ke '0' atau agar fungsi event handler terhenti
        }                       // jika tidak kata 'CE' muncul di display atau kode yang ada di bawahnya ikut tereksekusi

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);   // menginput angkanya dan...
        updateDisplay()             // menampilkannya pada display
    });
}