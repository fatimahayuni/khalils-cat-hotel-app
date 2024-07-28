document.addEventListener("DOMContentLoaded", function() {

    function main() {
        let reservations = []; // store all the reservations

        // event listeners
        const form = document.querySelector("#reservationForm");
        form.addEventListener('submit', function(event){
            event.preventDefault();

            let petNameInput = document.querySelector("#petName");
            let petName = petNameInput.value;

            let roomTypeSelected = document.querySelector(".roomType:checked");
            let roomType = roomTypeSelected.value;

            let checkInDateInput = document.querySelector("#checkInDate");
            let checkInDate = checkInDateInput.value;

            let checkOutDateInput = document.querySelector("#checkOutDate");
            let checkOutDate = checkOutDateInput.value;

            if (petName && roomType && checkInDate && checkOutDate) {
                addReservation(reservations, petName, roomType, checkInDate, checkOutDate);
                renderReservations(reservations);
                form.reset();
            } else {
                alert("Please fill in all the fields.")
            }
        });

        // Using event bubbling for the Edit and Delete buttons
        const reservationList = document.querySelector("#reservationList");
        reservationList.addEventListener('click', function(event) {
            // Check if the clicked element has the 'edit-btn' class
            if (event.target.classList.contains('edit-btn')) {

                // get the taskId embedded in the button
                const reservationId = parseInt(event.target.dataset.reservationId);
                const reservation = reservations.find(r => r.id ===reservationId);

                // Select the edit button
                const accordionHtml = `
                <div class="accordion" id="modifyReservation">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Edit Reservation
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <label>Pet name:</label>
                                    <input type="text" id="editPetName" required><br><br>
                                    
                                    <label>Room type:</label>
                                    <label for="editRoomA">Room A</label>
                                    <input type="radio" id="editRoomA" name="editRoomType" class="roomType" value="Room A">
                                    <label for="editRoomB">Room B</label>
                                    <input type="radio" id="editRoomB" name="editRoomType" class="roomType" value="Room B">
                                    <label for="editRoomC">Room C</label>
                                    <input type="radio" id="editRoomC" name="editRoomType" class="roomType" value="Room C"><br><br>
                                    
                                    <label for="editCheckInDate">Check-in Date:</label>
                                    <input type="date" id="editCheckInDate" name="edit-checkin-date"><br><br>
                                    
                                    <label for="editCheckOutDate">Check-out Date:</label>
                                    <input type="date" id="editCheckOutDate" name="edit-checkout-date"><br><br>
                                    
                                    <button id="saveEditBtn">Save Changes</button><br><br>
                                </div>
                            </div>
                        </div>
                    </div>`;

                    const existingAccordion = document.querySelector('#modifyReservation');
                    if (existingAccordion) {
                        existingAccordion.remove();
                    }

                    // Insert the accordion HTML after the reservation list
                    event.target.closest('li').insertAdjacentHTML('afterend', accordionHtml);

                    const editPetName = document.querySelector('#editPetName');
                    const editRoomType = document.querySelectorAll('#editRoomType');
                    const editCheckInDate = document.querySelector('#editCheckInDate');
                    const editCheckOutDate = document.querySelector('#editCheckOutDate');

                    // Prefill the form with the selected reservation's data
                    editPetName.value = reservation.petName;
                    editRoomType.forEach(room => {
                        if (room.value === reservation.roomType) {
                            room.check = true;
                        }
                    });
                    editCheckInDate.value = reservation.checkInDate;
                    editCheckOutDate.value = reservation.checkOutDate;

                    // Scroll to the accordion
                    const accordionElement = document.querySelector('#modifyReservation');
                    accordionElement.scrollIntoView({behavior: 'smooth' });

                    // Save button functionality
                    const saveEditButton = document.querySelector('#saveEditBtn');
                    saveEditButton.addEventListener('click', function() {
                        // Save the changes
                        reservation.petName = editPetName.value;
                        reservation.roomType = document.querySelector('input[name="editRoomType"]:checked').value;
                        reservation.checkInDate = editCheckInDate.value;
                        reservation.checkOutDate = editCheckOutDate.value;

                        // Re-render the reservations
                        renderReservations(reservations);

                        // Remove the accordion
                        accordionElement.remove()
                    });
            }

            if (event.target.classList.contains('delete-btn')) {
                const reservationId = parseInt(event.target.dataset.taskId);
                const reservation = reservations.find(r => r.id === reservationId);

                const toDelete = confirm("Are you sure you want to delete?");
                if (toDelete) {
                    deleteReservation(reservations, id);
                    renderReservations(reservation);
                }
            }
        })
            
        // add three reservations
        addReservation(reservations, "Meowie", "Room A", "23rd August 2024", "24th August 2024");
        addReservation(reservations, "Billy", "Room B", "23rd July 2024", "24th July 2024");
        addReservation(reservations, "Chickaboo", "Room C", "23rd June 2024", "24th June 2024");
        renderReservations(reservations);
    }


    function renderReservations(reservations) {
        const reservationList = document.querySelector("#reservationList");
        reservationList.innerHTML = '';
        
        for (let reservation of reservations){
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${reservation.petName}, ${reservation.roomType}, ${reservation.checkInDate} - ${reservation.checkOutDate}
            <button data-reservation-id=${reservation.id} class="btn btn-warning btn-sm edit-btn">Edit</button>
            <button data-reservation-id=${reservation.id} class="btn btn-danger btn-sm delete-btn">Delete</button>
        `;

            reservationList.appendChild(li);
                
  
            // Allow deleting
            li.querySelector(".delete-btn").addEventListener('click', function() {
                console.log("Button clicked");
                const confirmation = confirm("Do you want to delete the reservation for " + reservation.petName + "?");
                if (confirmation) {
                    deleteReservation(reservations, reservation.id);
                    renderReservations(reservations);
                }
            }); 
        }
    };

    main()
});

//todo make it ordered list