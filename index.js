const writing_text = document.querySelector('.space-of-typing p');
const input_area = document.querySelector('.wrapper-div .input-area');
const error_msg = document.querySelector('.errors span');
const time_msg = document.querySelector('.time span');
const WPM_msg = document.querySelector('.WPM span');
const CPM_msg = document.querySelector('.CPM span');
const button = document.querySelector('button');


function RandomPara() {
    // console.log(paragraph);
    let RandomIndex = Math.floor(Math.random() * paragraph.length);
    //    console.log(RandomIndex);
    paragraph[RandomIndex].split("").forEach((span) => {
        // console.log(span);
        let spanTag = `<span>${span}</span>`;
        writing_text.innerHTML += spanTag;
    });
    document.addEventListener('keydown',()=>input_area.focus());
    writing_text.addEventListener('click',()=>input_area.focus())
}
RandomPara();

function initTyping(){
    console.log('input clicked');
}
input_area.addEventListener('input',initTyping);