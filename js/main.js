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
    "colorSix",
    "colorOne",
    "colorTwo",
    "colorThree",
    "colorFour",
    "colorFive",
    "colorSix"
];
let table = [];
let pairs = 0;

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

    let startBtn = document.getElementById("start");
    startBtn.remove();
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


// play();
