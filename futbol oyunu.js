let timer;
let timeLeft = 120;
let score = 0;
let pausedTime = 0;
let originalWordsList = [];
let wordsList = [];

const words = {
    'Arsenal': 'rnesaal',
    'Aston Villa': 'Atnos Vialla',
    'Bournemouth': 'houemntborm',
    'Brentford': 'tfodrbeon',
    'Brighton': 'tnibohgr',
    'Chelsea': 'scaehl',
    'Crystal Palace': 'Rctalsy Pcaale',
    'Everton': 'ertnove',
    'Fulham': 'mhaflu',
    'Liverpool': 'iprlvoole',
    'Manchester City': 'Mctseahcr Yitc',
    'Manchester United': 'Mctsaehcr Udtine',
    'Newcastle United': 'Ctnwsaee Utdine',
    'Nottingham Forest': 'Tnighnma Ootrsfe',
    'Sheffield United': 'Sledhfeai Utdine',
    'Tottenham Hotspur': 'otnmpshpr otteau',
    'West Ham United': 'Wtes Ham Udtine',
    'Wolverhampton Wanderers': 'Wovrelmphta Wnraedrs'
};

let currentWord;
let scrambledWord;

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('resume').addEventListener('click', resumeGame);
document.getElementById('submit').addEventListener('click', checkGuess);
document.getElementById('pass').addEventListener('click', showNewWord);
document.getElementById('guess').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Form gönderimini engelle
        checkGuess();
    }
});

function startGame() {
    resetGame();
    wordsList = [...originalWordsList]; // Kelimeleri tekrar sıralı şekilde al
    showNewWord();
    timer = setInterval(updateTimer, 1000);
    enableControls(true); // Kontrolleri etkinleştir
    document.getElementById('resume').style.display = 'none'; // Devam Et butonunu gizle
}

function stopGame() {
    clearInterval(timer);
    pausedTime = timeLeft;
    document.getElementById('message').innerText = `Oyun durduruldu! Toplam skorunuz: ${score}`;
    enableControls(false); // Kontrolleri devre dışı bırak
    document.getElementById('resume').style.display = 'inline-block'; // Devam Et butonunu göster
}

function resumeGame() {
    document.getElementById('message').innerText = '';
    timeLeft = pausedTime;
    timer = setInterval(updateTimer, 1000);
    enableControls(true); // Kontrolleri etkinleştir
    document.getElementById('resume').style.display = 'none'; // Devam Et butonunu gizle
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('message').innerText = 'Süre doldu! Toplam skorunuz: ' + score;
        enableControls(false); // Kontrolleri devre dışı bırak
        document.getElementById('resume').style.display = 'none'; // Devam Et butonunu gizle
    }
}

function resetGame() {
    timeLeft = 120;
    score = 0;
    pausedTime = 0;
    document.getElementById('score-value').innerText = score;
    document.getElementById('message').innerText = '';
    document.getElementById('guess').value = '';
    document.getElementById('time').innerText = timeLeft;
    originalWordsList = Object.keys(words); // Orijinal kelime listesi
    wordsList = [...originalWordsList]; // Kelimeleri sıralı şekilde al
    enableControls(true); // Kontrolleri etkinleştir
}

function showNewWord() {
    if (wordsList.length === 0) {
        document.getElementById('message').innerText = 'Tüm kelimeleri bildiniz! Tebrikler!';
        clearInterval(timer);
        enableControls(false); // Kontrolleri devre dışı bırak
        document.getElementById('resume').style.display = 'none'; // Devam Et butonunu gizle
        return;
    }
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    currentWord = wordsList[randomIndex];
    scrambledWord = words[currentWord];
    document.getElementById('scrambled').innerText = scrambledWord;
    document.getElementById('guess').value = '';
    wordsList.splice(randomIndex, 1); // Bu kelimeyi listeden çıkar
}

function checkGuess() {
    if (timeLeft <= 0) return; // Süre dolduysa tahmin yapmayı engelle
    const guess = document.getElementById('guess').value.trim();
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
        score++;
        document.getElementById('score-value').innerText = score;
        showNewWord();
    } else {
        document.getElementById('message').innerText = 'Yanlış tahmin, tekrar deneyin!';
    }
}

function enableControls(enabled) {
    document.getElementById('guess').disabled = !enabled;
    document.getElementById('submit').disabled = !enabled;
    document.getElementById('pass').disabled = !enabled;
}
