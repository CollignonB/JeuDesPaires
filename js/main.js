let divRow = document.getElementById("divRow");
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

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

for (let i = 0; i < nbCards; i++){
    let cardC = document.createElement("div");   
    cardC.classList.add("col-3","col-sm-4","col-lg-2");
    let card = document.createElement("div");
    card.classList.add("playingCard","baseColor");

    cardC.appendChild(card);
    divRow.appendChild(cardC);
}

let randomColor = shuffle(colorTable);

let nbPlayingCards = document.getElementsByClassName("playingCard");

// for (let i = 0; i < nbPlayingCards.length; i++){
//     nbPlayingCards[i].classList.add(randomColor[i]);
// }

console.log(randomColor);

let table = [];

for (let i = 0; i < nbPlayingCards.length; i++){
    nbPlayingCards[i].addEventListener("click", function() {
        this.classList.add(randomColor[i]);
        compareTable.push(randomColor[i]);

        table.push(this);

        if (compareTable.length === 2 ){
            if (compareTable[0] === compareTable[1]){
                compareTable = [];
                table = [];
            } else {
                table[0].classList.remove("colorOne", "colorTwo", "colorThree", "colorFour", "colorFive", "colorSix");
                table[1].classList.remove("colorOne", "colorTwo", "colorThree", "colorFour", "colorFive", "colorSix");
                
                table[0].classList.add("baseColor");
                table[1].classList.add("baseColor");
                
                compareTable = [];
                table = [];
            }
        }
    });
    
}



// console.log(shuffle(colorTable));