const writing_text = document.querySelector('.space-of-typing p');
const input_area = document.querySelector('.wrapper-div .input-area');
const error_msg = document.querySelector('.errors span');
const time_msg = document.querySelector('.time span');
const WPM_msg = document.querySelector('.WPM span');
const NWPM_msg = document.querySelector('.NWPM span');
const ACCURACY_msg = document.querySelector('.ACCURACY span');
const button = document.querySelector('button');

let letterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = 0;
let RandomIndex = 0;

function RandomPara() {  // to get random paragraph

    // console.log(paragraph.);

    RandomIndex = Math.floor(Math.random() * paragraph.length); // getting random index of the paragraph
    
    writing_text.innerHTML = "";

    // console.log(writing_text);

    paragraph[RandomIndex].split("").forEach((char) => {

        let spanTag = `<span>${char}</span>`;

        writing_text.innerHTML += spanTag;

        // let spanTag = document.createElement('span');
        //   spanTag.innerText = span;
        //   writing_text.appendChild(spanTag);

       
        
        // console.log(spanTag.length);
    });

    writing_text.querySelectorAll('span')[0].classList.add('active');
      
    document.addEventListener('keydown', () => input_area.focus());

    writing_text.addEventListener('click', () => input_area.focus());

}

RandomPara();

function initTyping() {

    // console.log('input clicked');

    const Letters = writing_text.querySelectorAll('span');

    // console.log(Letters); 

    let typedLetter = input_area.value.split('')[letterIndex];

    // console.log(characterTyped);

    if (letterIndex < Letters.length-1 && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedLetter == null) { // if user has typed backspace then

            letterIndex--;

            if (Letters[letterIndex].classList.contains('incorrect')) {
                errors--;
            }

            Letters[letterIndex].classList.remove('correct', 'incorrect');

        } else {

            if (Letters[letterIndex].innerText === typedLetter) {
                // console.log('correct');
                Letters[letterIndex].classList.add('correct')
            } else {
                // console.log('incorrect')
                errors++;

                Letters[letterIndex].classList.add('incorrect')
            }
            letterIndex++;

        }
        Letters.forEach(span => span.classList.remove('active'));

        Letters[letterIndex].classList.add('active');

        error_msg.innerText = errors;

        NWPM_msg.innerText = letterIndex - errors; // cpm not count errors

        let Wpm = Math.round((((letterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);
    
        Wpm = Wpm < 0 || !Wpm || Wpm === Infinity ? 0 : Wpm;

        WPM_msg.innerText = Wpm;

        let correctCharacters = NWPM_msg.innerText;
        let totalKey_pressed = paragraph[RandomIndex].split('').length;
        
      let  accuracy = Math.round((correctCharacters/totalKey_pressed)*100);
    //   console.log(accuracy);
      ACCURACY_msg.innerText = accuracy;

    } else {
        input_area.value = "";
        clearInterval(timer);
    }
}
input_area.addEventListener('input', initTyping);


function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time_msg.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetTyping(){
    RandomPara()
    input_area.value="";
    clearInterval(timer);
    timeLeft = maxTime;
    letterIndex = 0;
    isTyping = 0;
    time_msg.innerText = timeLeft;
    error_msg.innerText = errors;
    WPM_msg.innerText = 0;
    NWPM_msg.innerText = 0;
    error_msg.innerText = 0;
    ACCURACY_msg.innerText = 0;
}

button.addEventListener('click',resetTyping)



// select part js


// const select = document.getElementById("select");
// select.addEventListener('change',displayMsg);

// function displayMsg(e){
// //  if(e.classList.contains('option')){
//     // console.log(e.target.value);
//     if(e.target.value==='easy'){
//         writing_text.innerHTML = "";

//         function RandomPara() {  // to get random paragraph

//     // console.log(paragraph.);

//     RandomIndex = Math.floor(Math.random() * easy.length);
    
//     writing_text.innerHTML = "";

//     easy[RandomIndex].split('').forEach((span) => {

//         let spanTag = `<span>${span}</span>`;

//         writing_text.innerHTML += spanTag;
        
//         // console.log(spanTag.length);
//     });

//     writing_text.querySelectorAll('span')[0].classList.add('active');

//     document.addEventListener('keydown', () => input_area.focus());

//     writing_text.addEventListener('click', () => input_area.focus());

// }

// RandomPara();
//     }else if(e.target.value === "hard"){
//        writing_text.innerHTML = "";


//     }
// //  }
// }
