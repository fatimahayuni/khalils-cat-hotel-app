const prompt = require('prompt-sync')();
let reservations = [];

function App() {
    let running = true;
    while (running) {
        showMenu();
        const userChoice = getUserInput();

        if (userChoice === "1") {
            showAllReservationsInterface();
        } else if (userChoice === "2") {
            addNewReservationInterface();
        } else if (userChoice === "3") {
            updateReservationInterface();
        } else if (userChoice === "4") {
            deleteReservationInterface();
        } else if (userChoice === "5") {
            console.log("Exiting...👋🏻");
            running = false;
        } else {
            console.log("Invalid choice. Please try again.");
        }
     }
}

function showMenu() {
    console.log();
    console.log("🐱🐱🐱 Cat Hotel Menu 🐱🐱🐱");
    console.log("1. Show all reservations");
    console.log("2. Make a new reservation");
    console.log("3. Update a reservation");
    console.log("4. Delete a reservation");
    console.log("5. Exit");
    console.log();
}

function getUserInput() {
    return prompt("Enter your choice: ")
}

// 4 CRUD FUNCTIONS FOR THE INTERFACE

function showAllReservationsInterface() {
    if (reservations.length === 0) {
        console.log("😢 There are no reservations to display.");
        return;
    }
    console.log("==== Tasks ====");
    for (let reservation of reservations) {
        console.log(`ID: ${reservation.id}, roomType: ${reservation.roomType}, Check-in Date: ${reservation.checkInDate}, Check-out date: ${reservation.checkOutDate}`);
    }
}

function addNewReservationInterface(){
    let roomType = prompt("Enter room type that you want (A-C): ");
    let checkInDate = prompt("Enter your check-in date: ");
    let checkOutDate = prompt("Enter your check-out date: ")
    addReservationModeling(reservations, roomType, checkInDate, checkOutDate)
    console.log("🌟🌟 New reservation added successfully!🌟🌟");
}

function updateReservationInterface() {
   let id = parseInt(prompt("Enter the reservation ID: "));
   let updatedRoomType = prompt("Enter new room type: ");
   let updatedCheckInDate = prompt("Enter new check-in date: ");
   let updatedCheckOutDate = prompt("Enter new check-out date: ");
   updateReservationModeling(reservations, id, updatedRoomType, updatedCheckInDate, updatedCheckOutDate)
   console.log("📝 Reservation amended!");
}

function deleteReservationInterface() {
    id = prompt("Enter the reservation ID to delete: ");
    deleteReservationModeling(reservations, id);
    return id
}

// 3 functions for data modeling
function addReservationModeling(reservations, roomType, checkInDate, checkOutDate) {
    let newReservation = {
        id: Math.floor(Math.random() * 1000 + 1),
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };
    reservations.push(newReservation);
}

function updateReservationModeling(reservations, id, updatedRoomType, updatedCheckInDate, updatedCheckOutDate) {
    let reservation = null;
    for (let r of reservations) {
        if (r.id == id) {
            reservation = r;
        }
    }
    if (reservation) {
        reservation.roomType = updatedRoomType;
        reservation.checkInDate = updatedCheckInDate;
        reservation.checkOutDate = updatedCheckOutDate;
    } else {
        console.log("Reservation is not found")
    }
}

function deleteReservationModeling(reservations, id) {
    let indexToDelete = null;
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].id == id) {
            indexToDelete = i;
            break;
        }
    }
    if (indexToDelete !== null) {
        reservations.splice(indexToDelete, 1);
        console.log("Reservation sadly deleted. 😢");
    } else {
        console.log("Reservation not found");
    }
}
App()