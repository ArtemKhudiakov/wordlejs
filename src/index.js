const dictionary = ['arena,arrow,abuse,acute,agile,alloy,angle,ankle,athlete,award,balls,beach,bikes,black,blade,bleed,block,board,boxing,brawl,break,bucks,bulky,bungee,bunts,camps,catch,cheer,climb,coast,crack,crush,curve,darts,dives,drill,duels,eager,elbow,elite,equip,fight,flair,fleet,flips,focus,frisk,gains,games,gears,glide,golfs,grasp,greet,grips,group,gusty,halos,haste,heart,hikes,hooks,hoops,hurry,hydra,icing,joint,joust,jumps,junks,kayak,kicks,knock,kudos,lance,leaps,limbs,links,lofty,loops,magic,march,match,merry,might,motoc,niche,odds,ounce,owned,pitch,pluck,prize,punch,quick,rally,reels,rides,rings,rocks,route,scram,score,sharp,shove,skate,speed,spike,sport,squat,stage,stick,stunt,surge,swift,swing,tacks,teams,throw,track,trail,tweak,vault,winds,wraps,zones']

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
        }
    }
    container.appendChild(grid)
}

function registerKeyboardEvents() {
    document.body.onkeydown = (event) => {
        const key = event.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0
                } else {
                    alert('Not a valid word');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key)
        }
        updateGrid()
    }
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce(((prev, curr) => prev + curr));
}

function isWordValid(word) {
    return dictionary.includes(word)
}

function revealWord(guess) {
    const row = state.currentRow;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        if (letter === state.secret[i]) {
            box.classList.add('right');
        } else if (state.secret.includes(letter)) {
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }
    }
}

function startup() {
    const game = document.getElementById('game');
    drawGrid(game)

    registerKeyboardEvents()

    // state.grid = Array(6)
    //     .fill()
    //     .map(() => Array(5).fill('A'))
    // updateGrid()
}

startup();