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

const createHangmanPartsImgElement = function(imgName) {
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