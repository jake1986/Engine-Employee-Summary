const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employee = [];
const employeeQuestions = [
    {
        type: "input",
        name: "employeeName",
        message: "What is your name?",

    },

    {
        type: "input",
        name: "employeeId",
        message: "What is your ID?",
    },

    {
        type: "input",
        name: "employeeEmail",
        message: "What is your e-mail?",
    }
]

const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is your name?",

    },

    {
        type: "input",
        name: "managerId",
        message: "What is your ID?",
    },

    {
        type: "input",
        name: "managerEmail",
        message: "What is your e-mail?",
    },

    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your office number?",
    }

];

const teamMembers = [
    {
        type: "list",
        name: "teamMembers",
        choices: ["Engineer", "Intern", "Done"]
    }
]



const engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is your name?"

    },

    {
        type: "input",
        name: "engineerId",
        message: "What is your ID?"

    },

    {
        type: "input",
        name: "engineerEmail",
        message: "What is your e-mail?",
    },


    {
        type: "input",
        name: "engineerGitHub",
        message: "What is your  GitHub name?",
    }

]

const internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is your name?"

    },

    {
        type: "input",
        name: "internId",
        message: "What is your ID?"

    },

    {
        type: "input",
        name: "internEmail",
        message: "What is your e-mail?",
    },


    {
        type: "input",
        name: "internSchool",
        message: "Where did you go to school?",
    }

]

function createEngineer() {
    inquirer.prompt(engineerQuestions).then(function (engineerResponse) {
        console.log(engineerResponse);
        const teamEngineer = new Engineer(engineerResponse.engineerName, engineerResponse.engineerId,
        engineerResponse.engineerEmail, engineerResponse.engineerGitHub);
        promptTeam();
        employee.push(teamEngineer)

    })


}

function createIntern() {
    inquirer.prompt(internQuestions).then(function (internResponse) {
        const teamIntern = new Intern (internResponse.internName, internResponse.internId,
        internResponse.internEmail, internResponse.internSchool);
        console.log(internResponse);
        promptTeam();
        employee.push(teamIntern)
    })
}

function buildTeam() {
    console.log(employee);
    fs.writeFileSync(outputPath, render(employee));
    
}

function createManager() {
    inquirer.prompt(managerQuestions).then(managerResponse => {
        console.log(managerResponse);
        const teamManager = new Manager (managerResponse.managerName, managerResponse.managerId,
        managerResponse.managerEmail, managerResponse.managerOfficeNumber);
        promptTeam();
        employee.push(teamManager);
    })
}

function promptTeam() {
    inquirer.prompt(teamMembers).then(function (member) {
        console.log(member.teamMembers);
        if (member.teamMembers === "Engineer") {
            console.log("you chose engineer");
            createEngineer();
        } else if (member.teamMembers === "Intern") {
            createIntern();
        } else {
            buildTeam();
        }
    })
}



createManager();