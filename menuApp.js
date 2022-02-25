class Player {
    constructor (name, position) {
        this.name = name;
        this.position = position;
    }
    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.players=[];
    }
    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of Player. Arugment is not a player: ${player}`);
        }
    }

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}


class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam= null;
    }
    
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection){
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeams();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
        `);
    }

//team info will print out descriptions and return user input
    showTeamMenuOptions(teamInfo){
        return prompt(`
        0) back
        1) create player
        2) delete player
        -------------------
        ${teamInfo}
        `);
    }

//this will create blank string and iterate through all teams, then get name for specific team. Then add a new line. All teams will show up with index number with them. AKA this is team one this is team two, etc
    displayTeams(){
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++){
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString); //outside of loop... this will show all team strings
    }

    createTeam(){
        let name = prompt('Enter name for new team:'); //name is the argument in class Team. 
        this.teams.push(new Team(name)); //creating a new instance of object/class. this will be pushed to team array
    }
    viewTeams(){
        let index = prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.teams.length){ //validate user input to avoid crashing and errors
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n'; //now add all descriptions of players to team
            
            for(let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description); //pass in description to showTeamMenu options so it displays all teams and options
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }


    deleteTeam() {
        let index = prompt ('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createPlayer (){
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player');
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer (){
        let index = prompt('Enter the index of the player you wish to delete');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }


}



//need to create instance of our menu

let menu = new Menu();
menu.start();
