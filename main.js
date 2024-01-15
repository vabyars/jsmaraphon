const $arenas = document.querySelector('.arenas');

const player1 = {
    id: 1,
    name: 'Player 1',
    hp: 100,
    img: './assets/players/subzero.gif',
    weapon: ['katana'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    getHPElement,
    renderHP,
};

const player2 = {
    id: 2,
    name: 'Player 2',
    hp: 100,
    img: './assets/players/scorpion.gif',
    weapon: ['sword'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    getHPElement,
    renderHP,
}
initGame($arenas);

function initGame(arena) {
    const $player1 = createPlayer(player1);
    const $player2 = createPlayer(player2);
    arena.appendChild($player1);
    arena.appendChild($player2);

    const $gameButton = document.querySelector('.button');

    $gameButton.addEventListener('click', function () {
        handleGameRound(this, arena, player1, player2)
    });
}

function handleGameRound(button, arena, player1, player2) {
    player1.changeHP(getDamage());
    player2.changeHP(getDamage());

    player1.renderHP();
    player2.renderHP();

    const $fightTitle = getFightTitle(player1, player2);
    if ($fightTitle) {
        button.disabled = true;
        arena.appendChild($fightTitle);

        const $reloadButton = createReloadButton();
        const $controls = document.querySelector('.control');
        $controls.appendChild($reloadButton);
    }
}

function createPlayer(player){
    const $progressBar = createElement('div', 'progressbar');

    const $lifeBar = createElement('div', 'life');
    $lifeBar.style.width = `${player.hp}%`;

    const $playerName = createElement('div', 'name');
    $playerName.textContent = player.name;

    $progressBar.appendChild($lifeBar);
    $progressBar.appendChild($playerName);

    const $character = createElement('div', 'character');

    const $characterImg = createElement('img');
    $characterImg.src = player.img;

    $character.appendChild($characterImg);

    const $player = createElement('div', `player${player.id}`);
    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

function createElement(tagName, className) {
    const $element = document.createElement(tagName);
    if (className){
        $element.classList.add(className);
    }

    return $element;
}

function getDamage() {
    return Math.ceil(Math.random() * 20) + 5;
}

function getFightTitle(player1, player2) {
    if (player1.hp > 0 && player2.hp > 0) {
        return;
    }

    const $fightTitle = createElement('div', 'roundTitle');
    if (player1.hp === 0 && player2.hp === 0) {
        $fightTitle.innerText = 'Double kill';
    }
    else if (player1.hp === 0) {
        $fightTitle.innerText = player2.name + ' Win';
    }
    else {
        $fightTitle.innerText = player1.name + ' Win';
    }

    return $fightTitle;
}

function changeHP(damage){
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function getHPElement(){
    return document.querySelector(`.player${this.id} .progressbar .life`);
}

function renderHP(){
    const $lifeBar = this.getHPElement();
    $lifeBar.style.width = `${this.hp}%`;
}

function createReloadButton() {
    const $reloadButton = createElement('button', 'button');
    $reloadButton.textContent = 'Restart';
    $reloadButton.addEventListener('click', () => window.location.reload());

    const $reloadButtonWrapper = createElement('div', 'reloadWrap');
    $reloadButtonWrapper.appendChild($reloadButton);

    return $reloadButtonWrapper;
}
