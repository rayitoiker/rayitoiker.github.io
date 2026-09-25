const questions = [
  ["Te dicen: “Haz lo que quieras”. ¿Qué haces?", ["Lo que me dé la gana.", "Pregunto: “¿Pero qué quieres que haga?”", "Me quedo quieto hasta recibir instrucciones.", "Hago algo y espero que salga bien."]],
  ["Son las 02:13 y mañana tienes clase. Tu cerebro:", ["Se duerme mágicamente.", "Recuerda una conversación de 2018.", "Decide que es buen momento para organizar mi vida.", "Abre TikTok."]],
  ["Te quedan 12€ hasta final de semana. Ves una oferta.", ["La necesito. Técnicamente.", "La compro y ya veremos.", "No la compro. Soy responsable.", "Pregunto si alguien me deja 10€."]],
  ["Un amigo dice “tenemos que hablar”.", ["Respondo “¿qué ha pasado?” 0,2 segundos después.", "Finjo normalidad durante 48 horas.", "Ya imagino 17 escenarios.", "Le mando un meme."]],
  ["Tu nivel de planificación:", ["Calendario, alarmas y Excel.", "Improviso con confianza.", "Improviso con miedo.", "¿Planificación? ¿Eso se come?"]]
];

let q = 0, score = 0;
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const numberEl = document.querySelector("#questionNumber");
const progress = document.querySelector("#progress");

function renderQuestion(){
  const [question, answers] = questions[q];
  questionEl.textContent = question;
  numberEl.textContent = `${q+1} / ${questions.length}`;
  progress.style.width = `${((q)/questions.length)*100 + 20}%`;
  answersEl.innerHTML = answers.map((a,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("");
  document.querySelectorAll(".answer").forEach(btn => btn.addEventListener("click", () => {
    score += Number(btn.dataset.i) + 1;
    if(q < questions.length-1){ q++; renderQuestion(); }
    else showResult();
  }));
}
function showResult(){
  const max = questions.length * 4;
  const pct = Math.round(score/max*100);
  let result = pct < 45 ? "NPC FUNCIONAL: sorprendentemente estable." :
               pct < 70 ? "CAOS CONTROLADO: vas tirando y cuenta." :
               pct < 88 ? "PROTAGONISTA: demasiadas tramas abiertas." :
               "BOSS FINAL: nadie sabe cómo sigues operativo.";
  questionEl.textContent = result;
  answersEl.innerHTML = `<p style="color:#aaa;line-height:1.8">Diagnóstico completado: ${pct}% de energía sospechosa.<br>Comparte este resultado bajo tu propia responsabilidad.</p><button class="cta" id="restart">REPETIR TEST →</button>`;
  numberEl.textContent = "RESULTADO";
  progress.style.width = "100%";
  document.querySelector("#restart").onclick = () => {q=0;score=0;renderQuestion()};
}
renderQuestion();

const toast = document.querySelector("#toast");
function showToast(msg){
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2600);
}
document.querySelectorAll(".tip").forEach(btn => btn.addEventListener("click",()=>showToast(btn.dataset.tip)));
document.querySelector("#panicBtn").onclick = ()=>document.querySelector("#panicOverlay").classList.add("show");
document.querySelector("#closePanic").onclick = ()=>document.querySelector("#panicOverlay").classList.remove("show");

document.querySelector("#randomBtn").onclick = ()=>{
  const messages = [
    "Tu navegador tiene 14 pestañas abiertas. Cierra una. No, esa no.",
    "Dato científico: decir “5 minutos más” nunca dura 5 minutos.",
    "Has sobrevivido otro día sin saber dónde dejaste las llaves.",
    "Tu batería está al 3%. Tu confianza también.",
    "El universo no tiene respuestas. Pero sí esta web."
  ];
  showToast(messages[Math.floor(Math.random()*messages.length)]);
};

document.querySelector("#shareBtn").onclick = async ()=>{
  const text = "He sobrevivido al diagnóstico de NEON//SURVIVAL. ¿Tú qué nivel de caos tienes?";
  try{
    await navigator.clipboard.writeText(text);
    document.querySelector("#shareResult").textContent = "✓ Texto copiado. Ahora ve y molesta a tus amigos.";
  }catch{
    document.querySelector("#shareResult").textContent = text;
  }
};

let money = 17.42;
setInterval(()=>{
  money = Math.max(0, money - Math.random()*0.03);
  document.querySelector("#money").textContent = money.toFixed(2)+"€";
},3000);
