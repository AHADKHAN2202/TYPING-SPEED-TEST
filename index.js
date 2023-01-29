const writing_text = document.querySelector('.space-of-typing p');
const input_area = document.querySelector('.wrapper-div .input-area');
const error_msg = document.querySelector('.errors span');
const time_msg = document.querySelector('.time span');
const WPM_msg = document.querySelector('.WPM span');
const CPM_msg = document.querySelector('.CPM span');
const NWPM_msg = document.querySelector('NWPM span');
const ACCURACY_msg = document.querySelector('.ACCURACY span')
const button = document.querySelector('button');

let letterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = 0;


function RandomPara() {

    // console.log(paragraph.);

    let RandomIndex = Math.floor(Math.random() * paragraph.length);

    //    console.log(RandomIndex);

    writing_text.innerHTML = "";

    paragraph[RandomIndex].split("").forEach((span) => {

        // console.log(span.length);

        let spanTag = `<span>${span}</span>`;

        writing_text.innerHTML += spanTag;
        console.log(spanTag.length);
    });

    writing_text.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => input_area.focus());

    writing_text.addEventListener('click', () => input_area.focus());

}

RandomPara();

function initTyping() {

    // console.log('input clicked');

    const Letters = writing_text.querySelectorAll('span');

    // console.log(letters); 

    let typedLetter = input_area.value.split('')[letterIndex];

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

        CPM_msg.innerText = letterIndex - errors; // cpm not count errors
        let Wpm = Math.round((((letterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);
    
        Wpm = Wpm < 0 || !Wpm || Wpm === Infinity ? 0 : Wpm;

        WPM_msg.innerText = Wpm;

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
    CPM_msg.innerText = 0;

}

button.addEventListener('click',resetTyping)