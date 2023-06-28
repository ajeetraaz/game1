'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
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

const displayMovements = function(acc,sort = false){
  //for remove all inner element of the movements;
  containerMovements.innerHTML = '';

  const movs= sort ? movements.slice().sort((a,b) =>a - b): movements;
  
  movs.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}💶</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin',html);
  });
};



//CREATING USERSNAME

/* const user = 'Steven Thomas williams';//stw
const username = user.toLowerCase()
.split('')
.map(function(name){
  return name[0];
  
})
.join(''); */

//USING REDUCE METHOD FOR CALCULATING BALANCE OF ACCOUNT:1

const calcDisplayBalance= function(acc){
  acc.balance = acc.movements.reduce(function(acc,mov){
      return acc + mov;
  },0);
   
  labelBalance.textContent = `${acc.balance} 💶`;
};

 
const calcDisplaySummary = function(acc){

  //1.FOR INCOME
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc,mov)=> acc + mov,0);
  labelSumIn.textContent = `${incomes}💶`;

  //2.FOR OUTCOME

  const outcomes = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc,mov)=> acc + mov,0);
  labelSumOut.textContent = `${outcomes}💶`;

  //3.FOR INTEREST USING CHAINING MAPPING METHOD

  const interest = acc.movements
  .filter((mov => mov>0))
  .map(deposit => (deposit * acc.interestRate)/100)
  .filter((int ,i ,arr) => {
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc , mov) => acc + mov,0);
  labelSumInterest.textContent = `${interest}💶`;

};




//CREATING USERNAME
const CreatUsersnames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(function(name){
      return name[0];
     }).join('');
  });
};

CreatUsersnames(accounts);
console.log(accounts);

//CREATING A FUNCTION TO STORE ALL THREE FUNCTION
const updateUI = function(acc){
   //Display movements
   displayMovements(acc);

   //Display balance
   calcDisplayBalance(acc);

   //Display summary
   calcDisplaySummary(acc);

};

//EVENTLISTENR
let currentaccount;

btnLogin.addEventListener('click',function(e){
  //prevent form from submittiang
  e.preventDefault();
  currentaccount =accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentaccount);

  if(currentaccount?.pin === Number(inputLoginPin.value)){

    //Display UI and message
    labelWelcome.textContent = `WELCOME BACK , ${currentaccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentaccount);

   
  }
});


//IMPLEMENTING TRANSFER AMMOUNT

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(amount,receiverAcc);

  if(
    amount > 0 &&
    receiverAcc &&
    currentaccount.balance >= amount &&
    receiverAcc?.username !== currentaccount.username
  ){
    //doing the transfer
    currentaccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  
    //Updated UI
    updateUI(currentaccount);
  }
});

//IMPLEMENTING  FOR LOAN
btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount =  Number(inputLoanAmount.value);
  if(amount >0 && currentaccount.movements.some(mov => mov>= amount * 0.1))
  {
    currentaccount.movements.push(amount);

    // update UI
   updateUI(currentaccount);

  }
  inputLoanAmount.value= '';

}) ;


 
//IMPLETING THE CLOSE ACCOUNT

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  console.log('Delete');

  if( inputCloseUsername.value === currentaccount.username && Number(inputClosePin.value) === currentaccount.pin )
  {
    const index = accounts.findIndex(acc => acc.username === currentaccount.username);
    console.log(index);

    //Delete acc
    accounts.splice(index,1);

    //Hide UI
    containerApp.style.opacity = 0;
    
}
 inputCloseUsername.value = inputClosePin.value = '';
});

//IMPLEMENTING SORT 
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});








//FILTER METHOD

const movements= [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposites = movements.filter(function(mov){
  return mov>0;
});
console.log(deposites);

const withdrawal = movements.filter(function(mov){
  return mov<0;
})

console.log(withdrawal);

//THE REDUCE METHOD
//acc = ACCUMULATOR FOR STORING VALUE AFTER EVERY ITERATION

 //EXAMPLE 1
const balance = movements.reduce(function(acc,current,i,arr){
  console.log(`Iteration ${i}: ${acc}`);
  return acc + current;
},0);
console.log(balance);

let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

//EXAMPLE 2:
//FOR MAXIMUM VALUE
const max = movements.reduce(function(acc,mov){
  if(acc > mov) return acc;
  else
  {
    return mov;
  }
},movements[0]);
console.log(max);

// THE FIND METHOD
const firstWithdrawal= movements.find(mov => mov<0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account=accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


//FLAT AND FLATMAP METHOD

const arr = [[1,2,3], [4,5,6],  7,8];
console.log(arr.flat());

const arrDeep = [[[1,2] ,3], [4,[5,6]],  7,8];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc =>acc.movements);
console.log(accountMovements);

//flat
const allmovements = accountMovements.flat();
console.log(allmovements);
const overalBalance = allmovements.reduce((acc,mov) => acc + mov,0);
console.log(overalBalance);

//flatmap 
const overalBalance2 = accounts
.flatMap(acc =>acc.movements)
.reduce((acc,mov) => acc + mov,0);
console.log(overalBalance2);



//USING FOR OF LOOPING METHOD
/* for(const account of accounts){
  if(account.owner == 'Jessica Davis')
  console.log(account);
} */









/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); */

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//let arr = ['a','b','c','d','e'];

//SLICE
/* console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));
console.log(arr.slice());
console.log([...arr]);
 */
//SPLICE
//console.log(arr.splice(2));
/* arr.splice(-1);
console.log(arr);
arr.splice(1,2);
console.log(arr);
 */
//REVERSE
/* arr = ['a','b','c','d','e'];
const arr2 = ['j','i','h','g','f'];
console.log(arr2.reverse());
console.log(arr2);
 */
//CONTACT
/* const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);
 */

//NEW METHOD

/* const arr1 = [23,11,64];
console.log(arr[0]);
console.log(arr.at(0));
 */


//getting last array element
/* console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
 */
//console.log('ajeet'.at(0));


//

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for(const movement of movements)
/* for(const[i,movement] of movements.entries()){
  if(movement> 0){
    console.log(`movement ${i +1}:You deposited ${movement}`);
  }
  else{
    console.log(`movement ${i +1}:You withdraw ${Math.abs(movement)}`);
  }
}
 */
//console.log('-----FOREACH-----');
//movements.forEach(function(movement)
//movements.forEach(function(mov,i,arr)

/* {
  if(mov> 0){
    console.log(`movement ${i +1}:You deposited ${mov}`);
  }
  else{
    console.log(`movement ${i +1}:You withdraw ${Math.abs(mov)}`);
  }
}); */
//0:function(200)
//0:function(450)
//0:function(400)
//..

//forEach with Maps and sets
/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map)
{
  console.log(`${key}: ${value}`);
}
);

//set
const currenciesUnique = new Set( ['USD', 'USD', 'EUR', 'EUR','GBP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value,_,map){
  console.log(`${value}: ${value}`);
}); */


//THE MAP METHOD METHOD
 /* const movement=[200, -200, 340, -300, -20, 50, 400, -460]
 const euroToUsd = 1.1;
 const movementsUSD = movement.map(function(mov){
  return mov* euroToUsd;
 });
 console.log(movementsUSD);
  // WITH FOR OF
  const movementsUSDfor = [];
  for(const  mov of movement) movementsUSD.push(mov *euroToUsd);
  console.log(movementsUSDfor)
 */

  //Some and every method
  //1)
  //EQUALITY
  console.log(movements.includes(-130));

  //SOME METHOD
  console.log(movements.some(mov => mov === -130));

  const anyDeposits = movements.some(mov => mov > 0);
  console.log(anyDeposits);

  //EVERY METHOD
  console.log(movements.every(mov => mov>0));
  console.log(account4.movements.every(mov => mov>0));

  //seperate callback
  const deposit = mov => mov>0;
  console.log(movements.some(deposit));
  console.log(movements.every(deposit));
  console.log(movements.filter(deposit));
  