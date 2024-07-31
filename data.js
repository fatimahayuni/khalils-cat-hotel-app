const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "66a863b0e41b4d34e41905ce";
const MASTER_KEY = "$2a$10$hizbF/WWO7aCi8N9hdKNKuDWhS.ADUD.qn6O4zhWBRRdlOa8ls7t6"

let reservations = [];

// 3 FUNCTIONS FOR DATA MODELING
function addReservation(reservations, petName, roomType, checkInDate, checkOutDate) {
    let newReservation = {
        id: Math.floor(Math.random() * 1000 + 1),
        petName: petName,
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };
    reservations.push(newReservation);
}

function updateReservation(reservations, id, updatedPetName, updatedRoomType, updatedCheckInDate, updatedCheckOutDate) {
    let reservation = null;
    for (let r of reservations) {
        if (r.id == id) {
            reservation = r;
        }
    }
    if (reservation) {
        reservation.petName = updatedPetName;
        reservation.roomType = updatedRoomType;
        reservation.checkInDate = updatedCheckInDate;
        reservation.checkOutDate = updatedCheckOutDate;
    } else {
        console.log("Reservation is not found")
    }
}

function deleteReservation(reservations, id) {
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

async function loadReservations() {
    const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
    return response.data.record;
}

async function saveReservations(reservations) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, reservations, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY
        }
    });
    console.log("This is response.data", response.data);
    return response.data;
}