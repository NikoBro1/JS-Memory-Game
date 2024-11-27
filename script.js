document.addEventListener('DOMContentLoaded', () => {
  const startForm = document.getElementById('start-form');
  const playerNameInput = document.getElementById('player-name');
  const cardPairsInput = document.getElementById('card-pairs');
  const gameContainer = document.getElementById('game-container');
  const playerHeader = document.getElementById('player-header');
  const timerDisplay = document.getElementById('timer');
  const board = document.getElementById('board');
  const restartButton = document.getElementById('restart-btn');

  let playerName = '';
  let cardPairs = 0;
  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let timer = 0;
  let timerInterval;

  const images = [
    'images/BEDROCK.png',
    'images/BOOKSHELF.png',
    'images/CACTUS.png',
    'images/DIAMOND.png',
    'images/DISBLCK.png',
    'images/EMERLDBLCK.png',
    'images/ERRORBLOCK.png',
    'images/GRASS.png',
    'images/IRNBLCK.png',
    'images/OBSDNBLCK.png',
    'images/PUMPKIN.png',
    'images/TNT.png',
    'images/LVSBLCK.png',
    'images/CRLBLCK.png',
  ];

  startForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playerName = playerNameInput.value;
    cardPairs = parseInt(cardPairsInput.value, 10);
    if (cardPairs > images.length) cardPairs = images.length;
    startGame();
  });

  restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    resetGame();
  });

  function startGame() {
    startForm.classList.add('d-none');
    gameContainer.classList.remove('d-none');
    playerHeader.textContent = `שחקן: ${playerName}`;
    timerDisplay.textContent = 'זמן: 0 שניות';
    generateCards();
    startTimer();
  }

  function generateCards() {
    cards = [];
    flippedCards = [];
    matchedCards = 0;

    const selectedImages = images.slice(0, cardPairs);
    selectedImages.forEach((img) => {
      cards.push({ img, id: `${img}-1` });
      cards.push({ img, id: `${img}-2` });
    });

    shuffle(cards);

    board.innerHTML = '';
    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card hidden';
      cardElement.dataset.id = card.id;

      const imgElement = document.createElement('img');
      imgElement.src = card.img;
      imgElement.alt = 'Card Image';
      imgElement.className = 'card-image';
      imgElement.style.display = 'none';

      cardElement.appendChild(imgElement);
      cardElement.addEventListener('click', () => handleCardClick(cardElement));
      board.appendChild(cardElement);
    });
  }

  function handleCardClick(card) {
    if (!card.classList.contains('hidden') || flippedCards.length >= 2) return;

    card.classList.remove('hidden');
    const img = card.querySelector('.card-image');
    img.style.display = 'block';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    const [first, second] = flippedCards;

    if (first.dataset.id.split('-')[0] === second.dataset.id.split('-')[0]) {
      first.classList.add('matched');
      second.classList.add('matched');
      flippedCards = [];
      matchedCards += 2;

      if (matchedCards === cards.length) {
        endGame();
      }
    } else {
      setTimeout(() => {
        first.classList.add('hidden');
        second.classList.add('hidden');
        first.querySelector('.card-image').style.display = 'none';
        second.querySelector('.card-image').style.display = 'none';
        flippedCards = [];
      }, 1000);
    }
  }

  function endGame() {
    clearInterval(timerInterval);
    alert(`כל הכבוד, ${playerName}! סיימת את המשחק ב-${timer} שניות.`);
    restartButton.classList.remove('d-none');
  }

  function resetGame() {
    startForm.classList.remove('d-none');
    gameContainer.classList.add('d-none');
    restartButton.classList.add('d-none');
    timer = 0;
    timerDisplay.textContent = 'זמן: 0 שניות';
  }

  function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = `זמן: ${timer} שניות`;
    }, 1000);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
