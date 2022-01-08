export default class WorldCupFootball {
   
    constructor(name, teams, config = {}) {
        
        this.name = name;
        this.setupTeams(teams);
        this.setup(config);

        // Planificación del torneo
        this.matchDaySchedule = [];
        this.summaries = [];
    };

    // Configuracion del Torneo
    setup(config = {}) {

        const defaultConfig = { rounds: 1 };
        this.config = Object.assign(defaultConfig, config);

    };

    setupTeams(teams) {
        this.teams = [];

        for (let teamName of teams) {
            let teamObj = this.customizeTeam(teamName);
            this.teams.push(teamObj)
        };
    };

    // Añadimos algunos parametros al equipo.
    customizeTeam(teamName) {

        return {
            name: teamName,
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        };
    };

    // Comenzar Jornada
    start() {

        for(const matchDay of this.matchDaySchedule) {
            
            const matchDaySummary = {
                results: [],
                standings: undefined
            };
            
            for(const match of matchDay) { 

                if(match.home === null || match.away === null) {
                    continue;
                }

                const result = this.play(match);

                this.updateTeams(result);

                matchDaySummary.results.push(result);
            };

            matchDaySummary.standings = this.getStandings().map(team => Object.assign({}, team));

            this.summaries.push(matchDaySummary);
        };
    };

    // Jugar Partido
    play(match){
        throw new Error('Play method must be implemented at child class');
    };

    // Actualizar Equipos
    updateTeams(result) {
        throw new Error('UpdateTeams method must be implemented at child class');
    };

    getStandings() {
        throw new Error('getStandings method must be implemented at child class');
    };
    
    // Crear ronda
    createRound() {
        const round = [];
        this.initSchedule(round);
        this.setLocalTeams(round);
        this.setAwayTeams(round);
        this.fixLastTeamSchedule(round);

        return round;
    };
    
    // Crear la planificación de jornadas y partidos de cada jornada.
    scheduleMatchDays(){

        for(let i = 0; i < this.config.rounds; i++) {

            const round = this.createRound();

            // Si la jornada es impar, giramos los partidos par
            if(i % 2 === 1) {
                this.swapTeamsWithinMatches(round);
            };

            this.matchDaySchedule = this.matchDaySchedule.concat(round);
        }
        
    };

    getTeamNames() { return this.teams.map(team => team.name) };

    getTeamNamesForSchedule() {

        const teamNames = this.getTeamNames();

        if (teamNames.length % 2 === 0) {
            return teamNames;
        } else {
            return [...teamNames, null]; // ['A', 'B', 'C', null]
        };
    }

    swapTeamsWithinMatches(round) {

        for(const matchDay of round) {

            for(const match of matchDay){

                const localTeam = match.home;
                match.home = match.away;
                match.away = localTeam;

            };
        };
    };

    fixLastTeamSchedule(round) {

        round.forEach((matchDay, matchDayIndex) => {

            // si la jornada es impar, le damos la vuelta al primer partido de la jornada
            if (matchDayIndex % 2 === 1) {

                // ej: {home: 'D', away: 'F'} => {home: 'F', away: 'D'}
                const firstMatch = matchDay[0]; // primer partido de la jornada
                const temp = firstMatch.home;   // temp = 'D'

                firstMatch.home = firstMatch.away; // firstMatch.home = 'F' => {home: 'F', away:'F'}
                firstMatch.away = temp;     // firstMatch.away = temp = 'D' => {home: 'F', away: 'D'}
            };
        });
    };

    initSchedule(round) {
        // planificación es un conjunto de jornadas // planificacion = [j1, j2, j3, j4, ...]
        // jornada es un conjunto de partidos // jornada = [p1, p2, p3, p4, ...]
        // partido tiene local y visitante // partido = {local: 'Local', visitante: 'Visitante'}

        const numberOfMatchDays = this.getTeamNamesForSchedule().length - 1; // numero de jornadas
        const numberOfMatchesPerMatchDay = this.getTeamNamesForSchedule().length / 2; // numero de partidos por jornada

        // recorremos para componer las jornadas
        for (let i = 0; i < numberOfMatchDays; i++) {
            // jornada vacía
            const matchDay = []
            // recorremos todos los partidos de una jornada
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                // generamos un template de partido: match
                let match = { home: 'home', away: 'away' }
                // llenamos la jornada (matchDay) de partidos
                matchDay.push(match);
            }
            // jornada llena, la ponemos en la planificación
            round.push(matchDay);
        }
    }

    setLocalTeams(round) {

        const teamNames = this.getTeamNamesForSchedule(); // teamNames = ['A', 'B', 'C', 'D'] posiciones: 0,1,2,3
        let teamIndex = 0;
        const teamIndexMaxValue = teamNames.length - 1 - 1;  // teamNames.length === 4

        round.forEach(matchDay => {

            matchDay.forEach(match => {

                // asignamos al equipo local el equipo correspondiente
                match.home = teamNames[teamIndex];
                teamIndex++

                if (teamIndex > teamIndexMaxValue) {
                    teamIndex = 0;
                };
            });
        });
    };

    setAwayTeams(round) {

        const teamNames = this.getTeamNamesForSchedule(); // array de nombres de equipo
        const maxAwayTeams = teamNames.length - 1; // ultima posicion del array
        let teamIndex = maxAwayTeams - 1; // penultima posicion del array = ultimaPos - 1

        round.forEach(matchDay => {

            matchDay.forEach(function (match, matchIndex) {

                // los arrays empiezan las posiciones en 0
                if (matchIndex === 0) {
                    match.away = teamNames[maxAwayTeams]
                } else {
                    // para el resto de partidos que no son el primero
                    match.away = teamNames[teamIndex];
                    teamIndex--;

                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams - 1;
                    };
                };
            });
        });
    };
}