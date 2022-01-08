import {groupStage, roundOf16Text, quarterText, semifinalText, finalText, winnerName, playOffTeams, playOffText, partido_eliminacion, tercerYCuarto} from './helpers/index.js';
import {teamsQualified} from './data/grupos.js';

//Declaracion de Variables para formar la fase de final del sorteo
let cuartos = [], semis = [], tercer_cuarto = [], final=[], campeon = [], prueba = [];

// Comenzamos el torneo y la Fase de grupos - Imprimimos en consola toda la fase
groupStage();
playOffTeams();

// Equipos Clasificados - Imprimimos en consola los clasificados
console.log(teamsQualified);
playOffText();

// Ronda de Octavos de Final
roundOf16Text();

for (let i = 0; i < teamsQualified.length; i+=4 ) {

    let cuadroIzquierda = [teamsQualified[i],teamsQualified[i+3]];
    let cuadroDerecha = [teamsQualified[i+1],teamsQualified[i+2]];

    partido_eliminacion(cuadroIzquierda, cuartos);
    partido_eliminacion(cuadroDerecha, cuartos);
}

// Ronda de Cuarto de Final
quarterText();
for (let i= 0; i <cuartos.length; i+=2) {

    partido_eliminacion(cuartos.slice(i,i+2), semis)
};

// Ronda de Semifinales
semifinalText();

for (let i= 0; i <semis.length; i+=2) {

    partido_eliminacion(semis.slice(i,i+2), final)  
};

// Ronda Tercer y Cuarto Puesto
tercerYCuarto();

semis.forEach(team => {

    let result;
    let comprobar = final.includes(team);

    if(comprobar == false){
        prueba.push(team);
    };
})
partido_eliminacion(prueba, tercer_cuarto)


// Partido Final
finalText();
partido_eliminacion(final, campeon);

// Imprimimos el Ganador del Mundial
winnerName(campeon[0]);
console.log();
