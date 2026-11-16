
function showToast(message) {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// Display selected match
function showMatch() {
    let match = document.getElementById("match").value;

    document.getElementById("matchDetails").innerHTML =
        match ? "Selected Match: " + match : "Please select a match";
}

// Booking confirmation
function bookTicket(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let match = document.getElementById("bookingMatch").value;
    let tickets = document.getElementById("ticket").value;
    let stand = document.getElementById("stand").value;

    showToast("Booking Successful! " + name + " - " + match +
        " - " + tickets + " Tickets - " + stand);
}
