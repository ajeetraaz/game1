'use strict';
/* console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🔢correctNumber!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.guess').value = 13;
console.log(document.querySelector('.guess').value);

document.querySelector('.score').textContent= 15;
console.log(document.querySelector('.score').textContent);


document.querySelector('.number').textContent = 10;
console.log(document.querySelector('.number').textContent);

 */
let secretnumber = Math.trunc(Math.random() *20) + 1;


  let score = 20;
  let highscore = 0;

  const displaymessage = function(message){
    document.querySelector('.message').textContent = message;
  }



  document.querySelector('.check').addEventListener('click',function(){
   const guess= Number( document.querySelector('.guess').value);
   console.log( guess,typeof guess);

if(!guess)
   {
    //document.querySelector('.message').textContent = '🚫NoNumber!';
         displaymessage('🚫NoNumber!');
   }

   //when player win the game
else if (guess === secretnumber )
{
    //document.querySelector('.message').textContent = '👏CorrectNumber!';
    displaymessage('👏CorrectNumber!');
    document.querySelector('.number').textContent = secretnumber ;
   
    document.querySelector('.score').textContent= score;
      
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.widht = '30rem';

    if(score > highscore)
    {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }
}
    //when the guess is diferent i.e greater or smaller than seceretnumber
     else if (guess != secretnumber  )
    {

        if(score > 1)
        {
            //document.querySelector('.message').textContent = guess > secretnumber ?'📈To high' :'📉To low';
            displaymessage(guess > secretnumber ?'📈To high' :'📉To low');
            score--;
            document.querySelector('.score').textContent= score;
        }
        else
        {
            //document.querySelector('.message').textContent = '😱🔥You lost the game';
            displaymessage('😱🔥You lost the game');
            document.querySelector('.score').textContent= 0;
        }
 }
  } 
)

 // when the entered number is greater than the number
/* else if (guess > secretnumber )
{  
    if(score > 1)
    {
        document.querySelector('.message').textContent = '📈To high';
        score--;
        document.querySelector('.score').textContent= score;
    }
    else
    {
        document.querySelector('.message').textContent = '😱🔥You lost the game';
        document.querySelector('.score').textContent= 0;
    }
}
    // when the entered number is greater than the number
else if(guess < secretnumber)
{
   if(score > 1)
  {
    document.querySelector('.message').textContent = '📉To low';
    score--;
    document.querySelector('.score').textContent= score;
}
else
{
    document.querySelector('.message').textContent = '😱🔥You lost the game';
    document.querySelector('.score').textContent= 0;
    
}

   } 
 } 
)*/

document.querySelector('.again').addEventListener('click',function(){
    score = 20;
    secretnumber = Math.trunc(Math.random() *20) + 1;
    //document.querySelector('.message').textContent = 'Start guessing...';
    displaymessage('Start guessing...');
    document.querySelector('.score').textContent= score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = ' ';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.widht = '15rem';
}
)



