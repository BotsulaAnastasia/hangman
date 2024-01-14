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

// Play area section markup
const secretWord = document.createElement('div');
const question = document.createElement('h2');
const counterDescript = document.createElement('h3');
const counterRecord = document.createElement('span');
const keyboard = document.createElement('div');

secretWord.className = 'secret-word';
question.className = 'question';
question.innerText = 'Hint: ';

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
let word = 'ADDRESS';

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
modalWord.innerText = word;

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

function winGame() {
  if (document.querySelectorAll('.underscore.--hidden').length === word.length) {
    modalMessage.innerText = 'You win!'
    showModal();
  }
}

function loseGame() {
  if (counter === 6) {
    modalMessage.innerText = 'You lose!'
    showModal();
  }
}