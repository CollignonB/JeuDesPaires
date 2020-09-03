let main = document.getElementsByTagName("main")[0];
let divRow = document.createElement("div");
divRow.classList.add("row");
main.appendChild(divRow);
let nbCards;
let compareTable = [];
let colorTable = [
    "colorOne",
    "colorTwo",
    "colorThree",
    "colorFour",
    "colorFive",
    "colorSix",
    "colorSeven",
    "colorEight",
    "colorNine",
    "colorTen"
];
let tableToShuffle = [];
let table = [];
let pairs = 0;

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
    divNumber.innerHTML += '<div> <label for="#">Nombre de cartes</label> <input type="number" class="form-control" id="nbCards" min="10" max="20"> </div> <p id="error"></p> </div>';
    dRow.appendChild(divNumber);

    document.getElementById("nbCoups").disabled = true;
    document.getElementById("nbCards").disabled = true;

    let btn = document.createElement("button");
    dRow.appendChild(btn);
    btn.classList.add("btn", "btn-outline-danger", "col-12", "col-sm-10", "col-lg-6");
    btn.id = "play";
    btn.innerText = "Jouer";

    chooseDifficulty();
}

function chooseDifficulty(){
    let radios = document.getElementsByName("difficulty");

    let nbCoups = document.getElementById("nbCoups");
    let nbCards = document.getElementById("nbCards");

    let errorM = document.getElementById("error");
    errorM.classList.add("text-danger");

    let btnPlay = document.getElementById("play");

    nbCoups.value = "20";
    nbCards.value = "12";

    for (let radio of radios){
        radio.addEventListener('click', function(){
            
            if(this.id === "easy"){
                nbCards.disabled = true;
                nbCoups.disabled = true;
                nbCards.value = "10";
                nbCoups.value = "20";
            }
            if(this.id === "normal"){
                nbCards.disabled = true;
                nbCoups.disabled = true;
                nbCards.value = "12";
                nbCoups.value = "20";
            }
            if (this.id === "hard"){
                nbCards.disabled = true;
                nbCoups.disabled = true;
                nbCards.value = "12";
                nbCoups.value = "16";
            }
            if(this.id === "custom"){
                nbCards.disabled = false;
                nbCoups.disabled = false;
                btnPlay.disabled = true;

                nbCards.addEventListener("change", function() {
                    if (nbCards.value %2 !== 0){
                        errorM.innerText = "veuillez rentrer un nombre de carte paires";
                        
                    } else {
                        errorM.innerText="";
                        btnPlay.disabled = false;
                    }
                });
            }

        });
    }

    
    btnPlay.addEventListener("click", function() {
        play(nbCoups.value,nbCards.value);
    })
    
    return [nbCards.value,nbCoups.value];
}

function createCards (nbCards) {

    console.log("je vais créé les cartes");
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
    console.log("j'ai créé les cartes");
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

function play(nbCoup,nbCard) {

    console.log("nombre de coups : "+nbCoup);
    console.log("nombre de cartes : "+nbCard);
    let startBtn = document.getElementById("play");
    startBtn.remove();
    let dRow = document.getElementById("dRow");
    dRow.remove();
    let life = document.createElement("div");
    life.value = nbCoup;
    main.appendChild(life);

    createCards(nbCard);

    let colorTabToShuffle = [];

    for (let i= 0; i < nbCard/2; i ++){
        colorTabToShuffle.push(colorTable[i]);
        colorTabToShuffle.push(colorTable[i]);
    }

    let nbPlayingCards = document.getElementsByClassName("playingCard");
    let randomColor = shuffle(colorTabToShuffle);


    for (let i = 0; i < nbCard; i++){
        life.innerHTML = `Nombre de coups restant : ${life.value}`;
        nbPlayingCards[i].addEventListener("click", function() {
            life.value--;
            life.innerHTML = `Nombre de coups restant : ${life.value}`;
            this.classList.add(randomColor[i]);
            compareTable.push(randomColor[i]);
            table.push(this);
            main.style.pointerEvents = "none";
            setTimeout(function(){
                [compareTable,table,pairOfCards] = checkCards(compareTable,table);
                pairs += pairOfCards;
                main.style.pointerEvents = "auto";  
                if (pairs === nbCard/2){
                    endGame("GG, voulez-vous rejouer ?")
                }else if (life.value === 0) {
                    endGame("Dommage voaus avez perdu, voulez-vous rejouer ?")
                }         
            }, 1000);     
        });
    }
}