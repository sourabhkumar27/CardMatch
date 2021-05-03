const cards = document.querySelector('#cards');
const nextCard = document.querySelector('#next-card');
const cardSign = document.querySelectorAll('li i');
const restart = document.querySelector('.restart');
const scoreCount = document.querySelector('#score');

let matchCardArray;
let count = 0;


//Shuffle Function//

function shuffle(array) {
  let arrayIndex = array.length,
    indexValue, randomIndex;

  while (arrayIndex !== 0) {
    randomIndex = Math.floor(Math.random() * arrayIndex);
    arrayIndex -= 1;

    indexValue = array[arrayIndex];
    array[arrayIndex] = array[randomIndex];
    array[randomIndex] = indexValue;
  }

  return array;
}

//Start Game


function start() {
  count = 0;
  scoreCount.innerHTML = count;
  matchCardArray = [];
  for (let card of cardSign) {
    card.parentElement.classList.remove('matched', 'show');
    matchCardArray.push(card.className);
  }
  matchCardArray = shuffle(matchCardArray);
  for (let i = 0; i < matchCardArray.length; i++) {
    cardSign[i].className = matchCardArray[i];
  }
  nextCard.innerHTML = `<i class="${matchCardArray[nextCardIndexes(matchCardArray.length)]}"></i>`;
}

start();

restart.addEventListener('click', start);

function nextCardIndexes(n) {
  return Math.floor(Math.random() * n);
}

// Event Listeners

cards.addEventListener('click', function (e) {
  if (e.target.className === 'card' && !e.target.classList.contains('matched')) {
    count++;
    scoreCount.innerHTML = count;

    if (e.target.children[0].className === nextCard.children[0].className) {
      e.target.classList.add('matched');
      matchCardArray = matchCardArray.filter(element => (element !== e.target.children[0].className))
      nextCard.innerHTML = `<i class="${matchCardArray[nextCardIndexes(matchCardArray.length)]}"></i>`;
      if (matchCardArray.length === 0) {
        alert(`Congratulations! You win and your score is ${count}!`);
        start();
        count = 0;
      }
    } else {
      e.target.classList.add('show');
    }
    
    setTimeout(() => {
      e.target.classList.remove('show')
    }, 700)
  }
});