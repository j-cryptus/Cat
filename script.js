
/* ============================== */
/* CONFIG SOBRES */
/* ============================== */

const sobres = [

    {
        id:"sobre1",
        audio:"Pablo Alboran Solamente tu.mp3",
        emoji:"❤️"
    },

    {
        id:"sobre2",
        audio:"Melendi - La promesa.mp3",
        emoji:"💙"
    },

    {
        id:"sobre3",
        audio:null,
        emoji:"💜"
    }
];

/* ============================== */
/* CORAZONES */
/* ============================== */

function crearCorazon(emoji){

    const corazon = document.createElement("div");

    corazon.className = "corazon-flotante";

    corazon.innerHTML = emoji;

    corazon.style.left =
        Math.random()*100 + "vw";

    corazon.style.fontSize =
        (Math.random()*20 + 20) + "px";

    corazon.style.animationDuration =
        (Math.random()*3 + 3) + "s";

    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    },6000);

}
/* ================================= */
/* CREAR ROSAS */
/* ================================= */

function crearRosa(sobre){

    const rosa = document.createElement("div");

    rosa.classList.add("rosa-flotante");

    rosa.innerHTML = "🌹🌷🪻";

    /* Posición inicial desde el centro */

    rosa.style.left = "50%";

    rosa.style.top = "70%";

    /* Movimiento aleatorio */

    const desplazamiento =
        (Math.random() * 300 - 150) + "px";

    rosa.style.setProperty("--x", desplazamiento);

    /* Tamaño aleatorio */

    rosa.style.fontSize =
        (Math.random()*20 + 25) + "px";

    sobre.appendChild(rosa);

    setTimeout(()=>{

        rosa.remove();

    },4000);

}
/* ============================== */
/* FUNCIONAMIENTO */
/* ============================== */
sobres.forEach(config=>{

    const sobre =
        document.getElementById(config.id);

    const botonCorazon =
        sobre.querySelector(".corazon");

    const botonAudio =
        sobre.querySelector(".audio-toggle");

    const audio =
        config.audio
            ? new Audio(config.audio)
            : null;

    let intervalo;

    /* ========================= */
    /* ABRIR SOBRE */
    /* ========================= */

    botonCorazon.addEventListener("click",()=>{

        sobre.classList.toggle("abierto");

        /* ========================= */
        /* ABIERTO */
        /* ========================= */

        if(sobre.classList.contains("abierto")){

            /* AUDIO */

            if(audio){

                audio.play();

                if(botonAudio){

                    botonAudio.innerHTML = "⏸";

                }

            }

            /* CORAZONES */

            intervalo = setInterval(()=>{

                for(let i=0;i<4;i++){

                    crearCorazon(config.emoji);

                }

            },400);

            /* ROSAS */

            for(let i=0;i<12;i++){

                setTimeout(()=>{

                    crearRosa(sobre);

                }, i * 120);

            }

        }

        /* ========================= */
        /* CERRADO */
        /* ========================= */

        else{

            clearInterval(intervalo);

            if(audio){

                audio.pause();

                audio.currentTime = 0;

            }

        }

    });

    /* ========================= */
    /* PAUSAR / REANUDAR */
    /* ========================= */

    if(botonAudio && audio){

        botonAudio.addEventListener("click",(e)=>{

            e.stopPropagation();

            if(audio.paused){

                audio.play();

                botonAudio.innerHTML = "⏸";

            }

            else{

                audio.pause();

                botonAudio.innerHTML = "▶";

            }

        });

    }

});
/**/
/* ================================= */
/* AUDIO DENTRO DE LA CARTA 3 */
/* ================================= */

const botonCarta3 =
    document.getElementById("playCarta3");

const audioCarta3 =
    new Audio("Melendi - La promesa.mp3");

let reproduciendo = false;

botonCarta3.addEventListener("click",()=>{

    if(!reproduciendo){

        audioCarta3.play();

        botonCarta3.innerHTML =
            "⏸ Pausar mensaje";

        reproduciendo = true;

    }else{

        audioCarta3.pause();

        botonCarta3.innerHTML =
            "▶ Reproducir mensaje";

        reproduciendo = false;
    }

});

/* Cuando termine */

audioCarta3.addEventListener("ended",()=>{

    botonCarta3.innerHTML =
        "▶ Reproducir mensaje";

    reproduciendo = false;

});