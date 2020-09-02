let main = document.getElementsByTagName("main")[0];
let divRow = document.createElement("div");
divRow.classList.add("row");
main.appendChild(divRow);
let nbCards = 12;
let compareTable = [];
let colorTable = [
    "colorOne",
    "colorTwo",
    "colorThree",
    "colorFour",
    "colorFive",
    "colorSix"
];
let tableToShuffle = [];
let table = [];
let pairs = 0;


for (let i = 0; i < nbCards/2; i ++){
    tableToShuffle.push(colorTable[i]);
    tableToShuffle.push(colorTable[i]);
}

function diplayDifficultyMenu(){

    let btnStart = document.getElementById("start");
    btnStart.remove();

    let dRow = document.createElement("div");
    dRow.classList.add("row");
    dRow.id="dRow";

    let tittle = document.createElement("h2");
    tittle.classList.add("text-center", "col-12", "text-danger");
    tittle.innerText = "Choix de la difficulté";

    dRow.appendChild(tittle);
    main.appendChild(dRow);

    let form = document.createElement("form");

    let divDiff = document.createElement("div");
    divDiff.classList.add("col-6");
    //~~~~~~~~~~~~~~~ first radio button ~~~~~~~~~~~~~~~ 
    divDiff.innerHTML ='<label class="container" > <input type="radio" name="difficulty" id="easy"> Facile <span class="checkmark" name="difficulty"></span></label>';

    //~~~~~~~~~~~~~~~ second radio button ~~~~~~~~~~~~~~~ 
    divDiff.innerHTML +='<label class="container"> <input type="radio" name="difficulty"  id="normal" checked="checked"> Normal <span class="checkmark" name="difficulty"></span></label>';

    //~~~~~~~~~~~~~~~ third radio button ~~~~~~~~~~~~~~~ 
    divDiff.innerHTML +='<label class="container"> <input type="radio" name="difficulty" id="hard"> Difficile <span class="checkmark" name="difficulty"></span></label>';

    //~~~~~~~~~~~~~~~ last radio button ~~~~~~~~~~~~~~~ 
    divDiff.innerHTML +='<label class="container"> <input type="radio" name="difficulty" id="custom"> Personalisé <span class="checkmark" name="difficulty"></span></label>';

    form.appendChild(divDiff);

    dRow.appendChild(form);

    let divNumber = document.createElement("div");
    divNumber.classList.add("col-6");

    divNumber.innerHTML = '<div> <label for="#">Nombre de coups</label> <input type="number" class="form-control" id="nbCoups" min="16" max="32"> </div>';
    divNumber.innerHTML += '<div> <label for="#">Nombre de cartes</label> <input type="number" class="form-control" id="nbCards" min="10" max="20"> </div> </div>';
    dRow.appendChild(divNumber);

    // document.getElementById("nbCoups").disabled = true;
    // document.getElementById("nbCards").disabled = true;

    let btn = document.createElement("button");
    dRow.appendChild(btn);
    btn.classList.add("btn", "btn-outline-danger", "col-12", "col-sm-10", "col-lg-6");
    btn.id = "play";

    btn.onclick = play;
    btn.innerText = "Jouer";

    chooseDifficulty();
}

function chooseDifficulty(){
    let easy = document.getElementById("easy");
    let normal = document.getElementById("normal");
    let hard = document.getElementById("hard");
    let custom = document.getElementById("custom");

    let radios = document.getElementsByName("difficulty");

    let nbCoups = document.getElementById("nbCoups");
    let nbCards = document.getElementById("nbCards");

    console.log(radios);

    for (let radio of radios){
        radio.addEventListener('click', function(){
            nbCards.value = "12";
            nbCoups.value = "20";
            console.log(this.id);
        });
    }
    // for (let i=0; i<radios.length; i++ ){
    //     easy.addEventListener('change', function() {
    //         if(this.checked === true){
    //             nbCoups.value = 20;
    //             nbCards.value = 10;
    //         }else {
    //             nbCoups.value = 16;
    //             nbCards.value = 12;
    //         }
    //     });
    //     normal.addEventListener('change', function() {
    //         if(this.checked === true){
    //             nbCoups.value = 16;
    //             nbCards.value = 12;
    //         }
    //     });
    //     hard.addEventListener('change', function(){
    //         if(this.checked === true){
    //             nbCoups.value = 16;
    //             nbCards.value = 14;
    //         }
    //     });
    // }
}
function createCards () {

    let divRow = document.createElement("div");
    divRow.classList.add("row");
    main.appendChild(divRow);

    for (let i = 0; i < nbCards; i++){
        let cardC = document.createElement("div");   
        cardC.classList.add("col-3","col-sm-4","col-lg-2");
        let card = document.createElement("div");
        card.classList.add("playingCard","baseColor");
    
        cardC.appendChild(card);
        divRow.appendChild(cardC);
    }
}

function shuffle(tab) {
    let tl = tab.length, temp, index;

// While there are elements in the array
    while (tl > 0) {
// Pick a random index
        index = Math.floor(Math.random() * tl);
// Decrease tl by 1
        tl--;
// And swap the last element with it
        temp = tab[tl];
        tab[tl] = tab[index];
        tab[index] = temp;
    }
    return tab;
}

function resetCard (table){

    table[0].classList.remove("colorOne", "colorTwo", "colorThree", "colorFour", "colorFive", "colorSix");
    table[1].classList.remove("colorOne", "colorTwo", "colorThree", "colorFour", "colorFive", "colorSix");
    
    table[0].classList.add("baseColor");
    table[1].classList.add("baseColor");
}

function stopGame(errorText) {
    main.style.pointerEvents="none";
    let stop = confirm(errorText);
    if(stop){
        main.style.pointerEvents="auto";
    } else {
        stopGame();
    }
}

function checkCards (compareTable, table) {
    let pairOfCards = 0;
    if (compareTable.length === 2 ){
        if(table[0] === table[1]){
            stopGame("ne cliquez pas deux foissur le même carte svp");
            resetCard(table);
        }else{
            if (compareTable[0] !== compareTable[1]){
                resetCard(table);
            } else {
                pairOfCards ++;
            }
        }
        compareTable = [];
        table = [];
   }
   return [compareTable,table,pairOfCards];
}

function endGame(msg) {
    let replay = confirm(msg);
    if(replay){
        document.location.reload(true);
    }else {
        alert("aurevoir");
    }
}

function play() {

    let startBtn = document.getElementById("play");
    startBtn.remove();
    let dRow = document.getElementById("dRow");
    dRow.remove();
    var nbCoups = 20;
    let life = document.createElement("div");
    main.appendChild(life);

    createCards();

    let nbPlayingCards = document.getElementsByClassName("playingCard");
    let randomColor = shuffle(colorTable);

    for (let i = 0; i < nbPlayingCards.length; i++){
        life.innerHTML = `Nombre de coups restant : ${nbCoups}`;
        nbPlayingCards[i].addEventListener("click", function() {
            nbCoups--;
            life.innerHTML = `Nombre de coups restant : ${nbCoups}`;
            this.classList.add(randomColor[i]);
            compareTable.push(randomColor[i]);
            table.push(this);
            main.style.pointerEvents = "none";
            setTimeout(function(){
                [compareTable,table,pairOfCards] = checkCards(compareTable,table);
                pairs += pairOfCards;
                main.style.pointerEvents = "auto";  
                if (pairs === nbCards/2){
                    endGame("GG, voulez-vous rejouer ?")
                }else if (nbCoups === 0) {
                    endGame("Dommage voaus avez perdu, voulez-vous rejouer ?")
                }         
            }, 1000);     
        });
    }
}


