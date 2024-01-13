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
  hangmanPart.className = `hangman__${imgName}-img hangman-part-img`;
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

// Keyboard
const keyboardLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

function createKeyboard(letter) {
  const keyboardBtn = document.createElement('button');
  keyboardBtn.className = 'keyboard__btn btn';
  keyboardBtn.innerText = `${letter}`;

  keyboard.appendChild(keyboardBtn);
}

keyboardLetters.forEach(letter => createKeyboard(letter));

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