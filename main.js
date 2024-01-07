const $arenas = document.querySelector('.arenas');
class PlayerModel {
    constructor(id, name, hp, img, weapon) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
    }

    attack() {
        console.log(this.name + 'Fight...');
    }
}

initGame($arenas);
function initGame(arena) {
    const playerModel1 = new PlayerModel(
        1,
        'Player 1',
        100,
        './assets/players/subzero.gif',
        ['katana']
    );

    const playerModel2 = new PlayerModel(
        2,
        'Player 2',
        100,
        './assets/players/scorpion.gif',
        ['sword']
    );

    const $player1 = createPlayer(playerModel1);
    const $player2 = createPlayer(playerModel2);
    arena.appendChild($player1);
    arena.appendChild($player2);

    const $gameButton = document.querySelector('.button');

    $gameButton.addEventListener('click', () => {
        onChangeHP(playerModel1);
        onChangeHP(playerModel2);

        const $fightTitle = getFightTitle(playerModel1, playerModel2);
        if ($fightTitle) {
            $gameButton.disabled = true;
            arena.appendChild($fightTitle);
        }
    });
}

function createPlayer(playerModel){
    const $progressBar = createElement('div', 'progressbar');

    const $lifeBar = createElement('div', 'life');
    $lifeBar.style.width = `${playerModel.hp}%`;

    const $playerName = createElement('div', 'name');
    $playerName.textContent = playerModel.name;

    $progressBar.appendChild($lifeBar);
    $progressBar.appendChild($playerName);

    const $character = createElement('div', 'character');

    const $characterImg = createElement('img');
    $characterImg.src = playerModel.img;

    $character.appendChild($characterImg);

    const $player = createElement('div', `player${playerModel.id}`);
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

function getFightTitle(playerModel1, playerModel2) {
    if (playerModel1.hp > 0 && playerModel2.hp > 0) {
        return;
    }

    const $fightTitle = createElement('div', 'roundTitle');
    if (playerModel1.hp === 0 && playerModel2.hp === 0) {
        $fightTitle.innerText = 'Double kill';
    }
    else if (playerModel1.hp === 0) {
        $fightTitle.innerText = playerModel2.name + ' Win';
    }
    else {
        $fightTitle.innerText = playerModel1.name + ' Win';
    }

    return $fightTitle;
}

function onChangeHP(playerModel){
    playerModel.hp -= getDamage();

    if (playerModel.hp <= 0) {
        playerModel.hp = 0;
    }

    const $lifeBar = document.querySelector(`.player${playerModel.id} .progressbar .life`);
    $lifeBar.style.width = `${playerModel.hp}%`;
}