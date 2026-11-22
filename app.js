
// ===============================
// 1. HAMBURGER MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu after clicking a navigation link

document.querySelectorAll("#navMenu a").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ===============================
// 2. TEAM FILTER
// ===============================

const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");
const noMatches = document.getElementById("noMatches");

teamFilter.addEventListener("change", function () {

    const selectedTeam = teamFilter.value;
    let visibleCount = 0;

    matchCards.forEach(function (card) {

        const teams = card.dataset.team.split(" ");

        if (selectedTeam === "all" ||
            teams.includes(selectedTeam)) {

            card.style.display = "";
            visibleCount++;

        } else {

            card.style.display = "none";

        }
    });

    noMatches.hidden = visibleCount !== 0;
});


// ===============================
// 3. GRID AND LIST VIEW
// ===============================

const matchContainer = document.getElementById("matchContainer");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

// Grid View

gridView.addEventListener("click", function () {

    matchContainer.classList.remove("list-view");

    gridView.classList.add("active");
    listView.classList.remove("active");

});

// List View

listView.addEventListener("click", function () {

    matchContainer.classList.add("list-view");

    listView.classList.add("active");
    gridView.classList.remove("active");

});


// ===============================
// 4. BOOK NOW BUTTONS
// ===============================

const bookingMatch = document.getElementById("bookingMatch");

document.querySelectorAll(".book-match").forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedMatch = button.dataset.match;

        bookingMatch.value = selectedMatch;

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Match selected: " + selectedMatch);

        updateSummary();

    });

});


// ===============================
// 5. SHOW MATCH DETAILS
// ===============================

function showMatch() {

    const match = document.getElementById("match").value;
    const details = document.getElementById("matchDetails");

    if (match === "") {

        details.textContent = "Please select a match.";

    } else {

        details.textContent = "You selected: " + match;

    }

}


// ===============================
// 6. BOOKING SUMMARY
// ===============================

const ticketForm = document.getElementById("ticketForm");
const stand = document.getElementById("stand");
const ticket = document.getElementById("ticket");

function updateSummary() {

    const selectedMatch = bookingMatch.value;
    const selectedStand = stand.value;
    const quantity = Number(ticket.value) || 0;

    const selectedOption = stand.options[stand.selectedIndex];

    const price = Number(selectedOption.dataset.price) || 0;

    const total = price * quantity;

    document.getElementById("summaryMatch").textContent =
        "Match: " + (selectedMatch || "Not selected");

    document.getElementById("summaryStand").textContent =
        "Stand: " + (selectedStand || "Not selected");

    document.getElementById("summaryQuantity").textContent =
        "Tickets: " + quantity;

    document.getElementById("summaryTotal").textContent =
        "Total: ₹" + total;
}

// Update summary whenever details change

ticketForm.addEventListener("input", updateSummary);
ticketForm.addEventListener("change", updateSummary);


// ===============================
// 7. TOAST NOTIFICATION
// ===============================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);

}


// ===============================
// 8. BOOK TICKET FUNCTION
// ===============================

function bookTicket(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const selectedMatch = bookingMatch.value;

    if (!selectedMatch || !stand.value) {

        showToast("Please select a match and stand.");
        return;

    }

    showToast("Thank you " + name + "! Booking submitted successfully.");

    updateSummary();

    ticketForm.reset();

    updateSummary();

}


// ===============================
// 9. RESET BOOKING SUMMARY
// ===============================

ticketForm.addEventListener("reset", function () {

    setTimeout(function () {

        updateSummary();

    }, 0);

});


// Initial booking summary

updateSummary();

