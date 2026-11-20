
// Toast Notification
function showToast(message) {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// Display Selected Match
function showMatch() {
    let match = document.getElementById("match").value;

    document.getElementById("matchDetails").innerHTML =
        match ? "Selected Match: " + match : "Please select a match";
}

// Booking Confirmation
function bookTicket(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let match = document.getElementById("bookingMatch").value;
    let tickets = document.getElementById("ticket").value;
    let stand = document.getElementById("stand").value;

    showToast("Booking Successful! " + name + " - " + match +
        " - " + tickets + " Tickets - " + stand);
}

// Activity 7: Live Booking Summary
const bookingMatch = document.getElementById("bookingMatch");
const standSelect = document.getElementById("stand");
const ticketCount = document.getElementById("ticket");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

function updateBookingSummary() {
    const match = bookingMatch.value || "Not selected";
    const stand = standSelect.value || "Not selected";
    const quantity = Math.max(1, Number(ticketCount.value) || 1);
    const price = Number(standSelect.selectedOptions[0].dataset.price || 0);

    summaryMatch.textContent = "Match: " + match;
    summaryStand.textContent = "Stand: " + stand;
    summaryQuantity.textContent = "Tickets: " + quantity;
    summaryTotal.textContent = "Total: ₹" + (price * quantity);

    showToast("Booking summary updated!");
}

bookingMatch.addEventListener("change", updateBookingSummary);
standSelect.addEventListener("change", updateBookingSummary);
ticketCount.addEventListener("input", updateBookingSummary);

// Reset Summary
document.getElementById("ticketForm").addEventListener("reset", function() {
    setTimeout(updateBookingSummary, 0);
});
