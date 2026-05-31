const audio = document.getElementById("miraiAudio");
const receiveBtn = document.getElementById("receiveBtn");
const messageArea = document.getElementById("messageArea");
const progressBar = document.getElementById("progressBar");
const timer = document.getElementById("timer");
const systemState = document.getElementById("systemState");
const alertLevel = document.getElementById("alertLevel");

const timeline = [
{
time: 0,
text: "جاري ربط قناة البث المركزية..."
},
{
time: 2,
text: "بث طارئ من نظام ميراي."
},
{
time: 5,
text: "إلى جميع المواطنين..."
},
{
time: 8,
text: "تم إعلان حالة احتواء من المستوى الأحمر."
},
{
time: 12,
text: "برج ميراي المركزي يتعرض للهجوم."
},
{
time: 16,
text: "أي وجود بشري قرب المنطقة سيتم التعامل معه كتهديد مباشر."
},
{
time: 19,
text: "ابقوا في الملاجئ ولا تغادروا أماكنكم."
}
];

let shown = [];

receiveBtn.addEventListener("click", () => {

receiveBtn.style.display = "none";

systemState.textContent = "حرج";
systemState.style.color = "#ff2d55";

alertLevel.textContent = "أحمر";
alertLevel.style.color = "#ff2d55";

messageArea.innerHTML = "";

audio.play();

});

audio.addEventListener("timeupdate", () => {

const current = audio.currentTime;

const percent = (current / audio.duration) * 100;
progressBar.style.width = percent + "%";

const currentSeconds = Math.floor(current);
const totalSeconds = 21;

timer.textContent =
`${String(currentSeconds).padStart(2,"0")}:00 / ${String(totalSeconds).padStart(2,"0")}:00`;

timeline.forEach((event, index) => {

if(current >= event.time && !shown.includes(index)){

const line = document.createElement("p");

line.style.marginBottom = "20px";
line.style.opacity = "0";
line.style.transition = "1s";

line.textContent = event.text;

messageArea.appendChild(line);

setTimeout(() => {
line.style.opacity = "1";
},100);

shown.push(index);

}

});

});

audio.addEventListener("ended", () => {

messageArea.innerHTML = `

<div style="
font-size:2rem;
color:#ff2d55;
text-shadow:0 0 20px #ff2d55;
">
انتهى البث
</div>

<br>

<div style="
color:#aaa;
">
تم قطع الاتصال بالقناة المركزية
</div>

`;

});