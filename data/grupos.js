import { teams, group } from "../data/equipos.js";
import { setupArrays } from "../helpers/index.js";
import { FootballLeague } from "../classes/FootballLeague.js";

// Mezclar todos los equipos

setupArrays();
teams.shuffle();

// Dividir los equipos en 8 groups de 4

function devideTeams(arr, len) {

    let pedazos = [],
        i = 0,
        n = arr.length;

    while (i < n) {

        pedazos.push(arr.slice(i, (i += len)));
    };

    return pedazos;
}

export let groups = devideTeams(teams, 4);

export let teamsQualified = [];


for (let i = 0; i < groups.length; i++) {

    let footballLeague = new FootballLeague("Football", groups[i], { rounds: 1 });

    footballLeague.scheduleMatchDays();

    // DONE: Mostrar los equipos inscritos por pantalla.

    const teamNames = footballLeague.getTeamNames();
    console.log("\nGrupos y Equipos");
    console.log("====================================\n");
    console.log(`GRUPO ${group[i]}`);
    console.log("------------------------------------");

    teamNames.forEach(function (team) {
        console.log(team);
    });

    console.log("\n");

    // Mostrar la planificación por pantalla.
    footballLeague.matchDaySchedule.forEach((matchDay, matchDayIndex) => {

        console.log(`Jornada ${matchDayIndex + 1}:`);

        matchDay.forEach((match) => {
            if (match.home === null || match.away === null) {

                const teamName = match.home || match.away;
                console.log(`${teamName} DESCANSA`);

            } else {
                console.log(`${match.home} vs ${match.away}`);
            };
        });
        
        console.log();
    });

    console.log("************************************");

    // Jugar los partidos de todas las jornadas.
    footballLeague.start();

    // Una vez terminada cada jornada, se deberá mostrar cómo queda la clasificación de la misma.

    footballLeague.summaries.forEach((summary, matchDayIndex) => {

        console.log("\n");
        console.log(`Grupo ${group[i]} - Jornada ${matchDayIndex + 1}:`);
        console.log("------------------------------------");

        summary.results.forEach((result) => {
            console.log(`-${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName}`)
        });

        console.table(summary.standings)
        console.log('\n');
    });

    teamsQualified.push(footballLeague.summaries[2].standings[0].name);
    teamsQualified.push(footballLeague.summaries[2].standings[1].name);
}