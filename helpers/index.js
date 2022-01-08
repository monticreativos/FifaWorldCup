import { FootballLeague } from "../classes/FootballLeague.js";

export const groupStage = () => {
    console.log ("\n===============================================================================");
    console.log ("========================== COMIENZA EL MUNDIAL ================================");
    console.log ("===============================================================================\n");
};

export const playOffTeams = () => { console.log("\nEquipos que van a participar en el playoff:\n"); };

export const playOffText = () => {
    console.log("\n============================================");
    console.log("=== COMIENZO DE LA FASE DE ELIMINATORIAS ===");
    console.log("============================================\n");
};

export const roundOf16Text = () => { console.log("\n=========== OCTAVOS DE FINAL ===============\n"); };

export const quarterText = () => { console.log("\n=========== CUARTOS DE FINAL ===============\n"); };

export const semifinalText = () => { console.log("\n============== SEMIFINALES =================\n"); };

export const tercerYCuarto = () => { console.log("\n============ TERCER Y CUARTO ===============\n"); };

export const finalText = () => { console.log("\n================= FINAL ====================\n"); };

export const winnerName = (winner) => {
    console.log("\n============================================");
    console.log(`¡${winner} campeón del mundo!`); 
    console.log("============================================");
};

export const partido_eliminacion = (grupo, ronda, tercer) => {

    let footballLeague = new FootballLeague("Mundial de Futbol", grupo, {
        rounds: 1,
    });

    footballLeague.scheduleMatchDays();
    footballLeague.start();

    // Una vez terminada cada jornada, se deberá mostrar cómo queda la clasificación de la misma.
    footballLeague.summaries.forEach((summary) => {

        summary.results.forEach((result) => {

            let winner = summary.standings[0].name;
            let lose = summary.standings[1].name;

            if (result.homeGoals - result.awayGoals === 0) {

                console.log(`${result.homeTeamName} ${result.homeGoals + 1} - ${result.awayGoals} ${result.awayTeamName} => ${result.homeTeamName}`);

                ronda.push(result.homeTeamName);
            } else {

                console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName} => ${winner}`); 

                ronda.push(winner);   
            };
        });
    });
}

export const setupArrays = () => {

    Array.prototype.shuffle = function() {

        let i = this.length, j, temp;

        if ( i == 0 ) return this;

        while ( --i ) {
           j = Math.floor( Math.random() * ( i + 1 ) );
           temp = this[i];
           this[i] = this[j];
           this[j] = temp;
        };

        return this;
    };
}