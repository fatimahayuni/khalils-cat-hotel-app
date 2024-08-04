
document.addEventListener("DOMContentLoaded", function() {
    async function main() {
        let reservations = await loadReservations(); // store all the reservations

        // event listeners for the form submission
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

        
        // Event listener for edit and delete buttons using event delegation
        const reservationList = document.querySelector("#reservationList");
        reservationList.addEventListener('click', async function(event) {
            console.log('Clicked on reservation list');
            console.log('Clicked element:', event.target);

            const editButton = event.target.closest('.edit-btn');
            const deleteButton = event.target.closest('.delete-btn');

            if (editButton) {
                console.log("Edit button clicked.");
                console.log("Closest edit button:", editButton);
            }

            // Check if the clicked element has the 'edit-btn' class
            if (event.target.closest('.edit-btn')) {
                console.log("Edit button clicked.");
    
                // get the taskId embedded in the button
                const reservationId = parseInt(event.target.closest('.edit-btn').dataset.reservationId);
                console.log("reservationId", reservationId);
                const reservation = reservations.find(r => r.id === reservationId);

                // Select the edit button / Create the accordion when the edit button is clicked.
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
                    const editRoomType = document.querySelectorAll('input[name="editRoomType"]');
                    const editCheckInDate = document.querySelector('#editCheckInDate');
                    const editCheckOutDate = document.querySelector('#editCheckOutDate');

                    // Prefill the form with the selected reservation's data
                    editPetName.value = reservation.petName;
                    editRoomType.forEach(room => {
                        if (room.value === reservation.roomType) {
                            room.checked = true;
                        }
                    });

                    editCheckInDate.value = reservation.checkInDate;
                    editCheckOutDate.value = reservation.checkOutDate;

                    // Scroll to the accordion
                    const accordionElement = document.querySelector('#modifyReservation');
                    accordionElement.scrollIntoView({behavior: 'smooth' });

                    // 'Save changes' button functionality
                    const saveButton = document.querySelector('#saveEditBtn');
                    saveButton.addEventListener('click', function() {

                        // Save the changes
                        reservation.petName = editPetName.value;
                        reservation.roomType = document.querySelector('input[name="editRoomType"]:checked').value;
                        reservation.checkInDate = editCheckInDate.value;
                        reservation.checkOutDate = editCheckOutDate.value;

                        Swal.fire({
                            title: "Your reservation has been updated!",
                            text: `Your reservation for ${reservation.petName}, ${reservation.roomType}, ${reservation.checkInDate} - ${reservation.checkOutDate} has been saved!`
                        })
                      
                        // Re-render the reservations
                        renderReservations(reservations);

                        // Remove the accordion
                        accordionElement.remove()
                    });
            }

            // Delete button functionality
            if (event.target.closest('.delete-btn')) {
                const reservationId = parseInt(event.target.closest('.delete-btn').dataset.reservationId);
                const reservation = reservations.find(r => r.id === reservationId);

                const toDelete = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                });

                if (toDelete.isConfirmed) {
                    deleteReservation(reservations, reservation.id);
                    renderReservations(reservations);
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your booking has been deleted.",
                        icon: "success"
                    });
                }
        }
        })

        const saveButton = document.querySelector("#saveBtn");
        saveButton.addEventListener("click", async function() {
            saveReservations(reservations);
            Swal.fire("The list has been saved to the database!")
        })
            
    
        renderReservations(reservations);
    }


    function renderReservations(reservations) {
        const reservationList = document.querySelector("#reservationList");
        reservationList.innerHTML = '';
        
        for (let reservation of reservations){
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
            <div class="container row">
            <div class="col-8">${reservation.petName}, ${reservation.roomType}, ${reservation.checkInDate} - ${reservation.checkOutDate}</div>
            <div class="col-2"><button data-reservation-id=${reservation.id} class="btn btn-sm edit-btn"><img src="assets/edit.png" width="15px"></button></div>
            <div class="col-2"><button data-reservation-id=${reservation.id} class="btn btn-sm delete-btn"><img src="assets/delete.png" width="15px"</button></div>
            </div>
        `;

            reservationList.appendChild(li);
        }
    };

    main()
});
