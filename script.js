'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jai Vishwakarma',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');





const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';//kind of similar to text content diff is textcontent return text only and thi return everything including html
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}



const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map
      (name => name[0]).join('');//return stw using arrow func
  });
};
createUsernames(accounts);

const calPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`
};


const calcDisplayBalance = function (acc) { //calcsiplay bal summary
  const incomes = acc.movements.filter(mov => mov > 0).
    reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).
    map(deposit => (deposit * acc.interestRate) / 100).
    filter((int, i, arr) => {
      return int >= 1;
    }).
    reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calPrintBalance(acc);
  calcDisplayBalance(acc);
}

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();//prevent from reload

  currentAccount = accounts.find
    (acc => acc.username === inputLoginUsername.value);

  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recevierAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, recevierAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && recevierAcc && currentAccount.balance >= amount &&
    recevierAcc?.username !== currentAccount.username) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    recevierAcc.movements.push(amount);
    //update ui
    updateUI(currentAccount);
    console.log('transfer valid');
  }
  else {
    alert('transfer INvalid');
  }
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    //delete acc
    accounts.splice(index, 1);
    //hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ' ';
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {//some checks the range 
    //addmovements

    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  else {
    alert('Itna Lene ka aukaat nai be ')
  }
  inputLoanAmount.value = '';
})

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})







// const eurtousd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurtousd;
// });
////this one is by using arrow function same result
// const movementsUSD = movements.map(mov =>
//   mov * eurtousd);
// console.log(movements);
// console.log(movementsUS);



















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// })
// console.log(movements);
// console.log(deposits); // prints only +ve value

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce((acc, curr) => acc + curr
//   , 0)
// console.log(balance);

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));//do not mutate the original array
// console.log(arr.slice(2, 3));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(...arr);

// // // splice
// // console.log(arr.splice(2));//muate th original array
// // console.log(arr);
// let arr2 = ['m', 'n', 'o'];
// let letters = arr.concat(arr2);
// console.log(letters);
// console.log(...arr, ...arr2);//abobe 2 are same 
// console.log(letters.join('-'));

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));
// console.log(arr[arr.length - 1]);

// //for of loop 
// const move = [200, 450, -400, 3000];
// for (const [i, movements] of move.entries()) {
//   if (movements > 0) {
//     console.log(`MOvemet ${i + 1} : you deposited ${movements}`);
//   }
//   else {
//     console.log(`MOvemet ${i + 1} you withdraw ${Math.abs(movements)}`);
//   }
// }
// //for each
// console.log('========================')
// move.forEach(function (movements, i, arr) {
//   if (movements > 0)
//     console.log(`MOvemet ${i + 1} : you deposited ${movements}`);
//   else
//     console.log(` MOvemet ${i + 1} :  you withdraw ${Math.abs(movements)}`);
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`)
// })

// const eurtoude = 1.1;
// const totalDepositstoUSD = movements.filter(mov => mov > 0).
//   map(mov => mov * eurtoude).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositstoUSD);

// const firstwi = movements.find(mov => mov < 0)
// console.log(movements);
// console.log(firstwi);
// //find is some kind of similar as filter but filter returns new array and find only returns 1st elemnt of array

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// //flat method
// console.log(arr.flat());

// const arrdeep = [[1, [2, 3]], [4, 5, 6], 7, 8];
// console.log(arrdeep.flat(2));//2 id depth of nesting

// const accountmove = accounts.map(acc => acc.movements);
// console.log(accountmove);
// const all = accountmove.flat();
// console.log(all);
//flat map only go one level deep

// sorting in js of array is aa.sort()
//this mutates the original array
//this sort in the form of strings not in form of number
//sorting of numbers
// ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);
// movements.sort((a, b) => a - b);
// console.log(movements);
// //descending order
// // movements.sort((a, b) => {
// //   if (a < b) return 1;
// //   if (b < a) return -1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);
// // console.log(movements); 


// // creating a variable array

// const x = new Array(7);//empty array of 7 size
// x.fill(1);//fill entire array
// console.log(x);
