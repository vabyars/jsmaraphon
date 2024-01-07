function createPlayer(playerPosition, playerModel){
    const $player = document.createElement('div');
    $player.classList.add(playerPosition);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');

    const $lifeBar = document.createElement('div');
    $lifeBar.style.width = `${playerModel.hp}%`;
    $lifeBar.classList.add('life');

    const $playerName = document.createElement('div');
    $playerName.textContent = playerModel.name;
    $playerName.classList.add('name');

    $progressBar.appendChild($lifeBar);
    $progressBar.appendChild($playerName);

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $characterImg = document.createElement('img');
    $characterImg.src = playerModel.img;

    $character.appendChild($characterImg);

    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

class PlayerModel {
    name = '';
    hp = 0;
    img = '';
    weapon= [];

    constructor(name, hp, img, weapon) {
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
    }

    attack() {
        console.log(this.name + 'Fight...');
    }
}

const playerModel1 = new PlayerModel(
    'Player 1',
    100,
    './assets/players/subzero.gif',
    ['katana']
);

const playerModel2 = new PlayerModel(
    'Player 2',
    100,
    './assets/players/scorpion.gif',
    ['sword']
);

const $player1 = createPlayer('player1', playerModel1);
const $player2 = createPlayer('player2', playerModel2);

const $arenas = document.querySelector('.arenas');
$arenas.appendChild($player1);
$arenas.appendChild($player2);
