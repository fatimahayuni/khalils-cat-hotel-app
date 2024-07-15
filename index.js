const prompt = require('prompt-sync')();

function App() {
    let running = true;
    while (running) {
        showMenu();
        const userChoice = getUserInput();

        if (userChoice === "1") {
            console.log("Make a new reservation...");
        } else if (userChoice === "2") {
            console.log("Show all reservations...");
        } else if (userChoice === 3) {
            console.log("Update a reservation...");
        } else if (userChoice === 4) {
            console.log("Delete a reservation...");
        } else if (userChoice === 5) {
            console.log("Exiting...");
        } else {
            console.log("Invalid choice. Please try again.");
        }
     }
}

function showMenu() {
    console.log("==== Cat Hotel Menu ====");
    console.log("1. Make a new reservation");
    console.log("2. Read a reservation");
    console.log("3. Update a reservation");
    console.log("4. Delete a reservation");
    console.log("5. Exit");
}

function getUserInput() {
    return prompt("Enter your choice: ")
}

function makeReservation(){
    pass
}

function showReservation() {
    pass
}

function updateReservation() {
    pass
}

function deleteReservation() {
    pass
}

App()