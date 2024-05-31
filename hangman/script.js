import questions from "./question-answer.json" assert { type: "json" };

const main = document.createElement('main');
const gallowsSection = document.createElement('section');
const playAreaSection = document.createElement('section');

main.className = 'main';
gallowsSection.className = 'gallows-section';
playAreaSection.className = 'play-area-section';

document.body.appendChild(main);
main.appendChild(gallowsSection);
main.appendChild(playAreaSection);

// Gallows section markup
const imagesWrapper = document.createElement('div');
const gallowsImg = document.createElement('img');
const hangman = document.createElement('div');
const gameName = document.createElement('h1');

imagesWrapper.className = 'images-wrapper';

gallowsImg.className = 'gallows';
gallowsImg.src = './images/gallows.png';

hangman.className = 'hangman';

gameName.className = 'title';
gameName.innerText = 'Hangman Game';

imagesWrapper.appendChild(gallowsImg);
imagesWrapper.appendChild(hangman);
gallowsSection.appendChild(imagesWrapper);
gallowsSection.appendChild(gameName);

function createHangmanPartsImgElement(imgName) {
  const hangmanPart = document.createElement('img');
  hangmanPart.className = `hangman__${imgName}-img hangman-part-img --hidden`;
  hangmanPart.src = `./images/${imgName}.svg`;

  hangman.appendChild(hangmanPart);
}

const hangmanParts = ['head', 'body', 'hand-one', 'hand-two', 'leg-one', 'leg-two'];
hangmanParts.forEach(part => createHangmanPartsImgElement(part));

let word = null;
let hint = null;
getRandomQuestion(1, 10);

// Play area section markup
const secretWord = document.createElement('div');
const question = document.createElement('h2');
const counterDescript = document.createElement('h3');
const counterRecord = document.createElement('span');
const keyboard = document.createElement('div');

secretWord.className = 'secret-word';
question.className = 'question';
question.innerText = `Hint: ${hint}`;

counterDescript.className = 'counter-description';
counterDescript.innerText = 'Incorrect guesses: '
counterRecord.className = 'counter';
counterRecord.innerText = '0 / 6';

keyboard.className = 'keyboard';

counterDescript.appendChild(counterRecord);
playAreaSection.appendChild(secretWord);
playAreaSection.appendChild(question);
playAreaSection.appendChild(counterDescript);
playAreaSection.appendChild(keyboard);

// Secret word
function showSecretWord(letter) {
  const wordLetterWrapper = document.createElement('div');
  const wordLetter = document.createElement('span');
  const letterUnderscore = document.createElement('span');

  wordLetterWrapper.className = 'word-letter-wrapper';

  wordLetter.className = 'word-letter';
  wordLetter.innerText = `${letter}`;

  letterUnderscore.className = 'underscore';
  letterUnderscore.innerText = '_';

  wordLetterWrapper.appendChild(wordLetter);
  wordLetterWrapper.appendChild(letterUnderscore);
  secretWord.appendChild(wordLetterWrapper);
}

word.split('').forEach(letter => showSecretWord(letter));

let counter = 0;

function checkLetter() {
  for (const el of document.querySelectorAll('.word-letter')) {
    if (el.textContent.includes(pressedButton)) {
      el.nextSibling.classList.add('--hidden');
    }
  }

  if (!word.includes(pressedButton)) {
    counter++;
    showCounterValue(counter);
    showHangmanPart();
  }
}

// Keyboard
const keyboardLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

let pressedButton = null;

function createKeyboard(letter) {
  const keyboardBtn = document.createElement('button');
  keyboardBtn.className = 'keyboard__btn btn';
  keyboardBtn.innerText = `${letter}`;

  keyboard.appendChild(keyboardBtn);

  eventsOfClickedKeyboardButton(keyboardBtn);
}

function disablebButton(thisBtn) {
  thisBtn.onclick = null;
  thisBtn.classList.add('keyboard__btn_disabled');
}

function activeBtn() {
  document.querySelectorAll('.keyboard__btn').forEach(btn => {
    eventsOfClickedKeyboardButton(btn);
    btn.classList.remove('keyboard__btn_disabled');
  });
}

function eventsOfClickedKeyboardButton(btn) {
  btn.onclick = function() {
    pressedButton = this.innerText;
    checkLetter();
    disablebButton(this);
    winGame();
    loseGame();
  };
} 

keyboardLetters.forEach(letter => createKeyboard(letter));

// Hangman
const hangmanPartsImg = document.querySelectorAll('.hangman-part-img');

function showHangmanPart() {
  const thisPart = hangmanPartsImg[counter - 1];
  thisPart.classList.remove('--hidden');
}

// Counter
function showCounterValue(value) {
  const counterEl = document.querySelector('.counter');
  counterEl.innerText = `${value} / 6`;
}

// Modal
const modal = document.createElement('section');
const overlay = document.createElement('div');
const modalWrapper = document.createElement('div');
const modalWord = document.createElement('p');
const modalMessage = document.createElement('p');
const modalBtn = document.createElement('button');

modal.className = 'modal';
overlay.className = 'overlay';
modalWrapper.className = 'modal-wrapper';

modalWord.className = 'modal__secret-word';

modalMessage.className = 'modal__message';

modalBtn.className = 'modal__btn btn';
modalBtn.innerText = 'Play again';

modalWrapper.appendChild(modalWord);
modalWrapper.appendChild(modalMessage);
modalWrapper.appendChild(modalBtn);
overlay.appendChild(modalWrapper);
modal.appendChild(overlay);
document.body.appendChild(modal);

function showModal() {
  modal.classList.add('--active');
}

function closeModal() {
  modal.classList.remove('--active');
}

function winGame() {
  if (document.querySelectorAll('.underscore.--hidden').length === word.length) {
    modalWord.innerText = word;
    modalMessage.innerText = 'You win!';
    showModal();
    document.removeEventListener('keydown', checkPressedKey);
  }
}

function loseGame() {
  if (counter === 6) {
    modalWord.innerText = word;
    modalMessage.innerText = 'You lose!';
    showModal();
    document.removeEventListener('keydown', checkPressedKey);
  }
}

function getRandomQuestion(min, max) {
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomObj = questions.find(obj => obj.id === randomId);
  word = randomObj.word;
  hint = randomObj.hint;
  console.log(word);
}

// Play again
function playAgain() {
  getRandomQuestion(1, 10);
  closeModal();
  secretWord.textContent = '';
  word.split('').forEach(letter => showSecretWord(letter));
  question.innerText = `Hint: ${hint}`;
  activeBtn();
  counter = 0;
  showCounterValue(counter);
  hangmanPartsImg.forEach(part => {
    return part.classList.add('--hidden');
  });
  document.addEventListener('keydown', checkPressedKey);
}

modalBtn.onclick = playAgain;

// checkPressedKey
document.addEventListener('keydown', checkPressedKey);
function checkPressedKey(event) {
  if (event.code.includes('Key')) {
    const keyValue = event.code.slice(-1);
    for (const el of document.querySelectorAll('.word-letter')) {
      if (el.textContent === keyValue) {
        el.nextSibling.classList.add('--hidden');
      }
    }

    const virtualBtns = document.querySelectorAll('.keyboard__btn');
    for (let i = 0; i < virtualBtns.length; i++) {
      if (virtualBtns[i].innerText === keyValue &&
        !virtualBtns[i].classList.contains('keyboard__btn_disabled')) {
        disablebButton(virtualBtns[i]);
        if (!word.includes(keyValue)) {
          counter++;
          showCounterValue(counter);
          showHangmanPart();
        }
      }
    }

    winGame();
    loseGame();
  }
}