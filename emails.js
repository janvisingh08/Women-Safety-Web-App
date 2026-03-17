document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully");

    document.getElementById("addEmailBtn").addEventListener("click", function () {
        console.log("Add Email Button Clicked");
        addEmail();
    });

    loadEmails();
});

function loadEmails() {
    let emails = JSON.parse(localStorage.getItem("emergencyEmails")) || [];
    let emailList = document.getElementById("emailList");
    emailList.innerHTML = "";

    emails.forEach((contact, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${contact.name}</strong>: ${contact.email} 
                        <button onclick="deleteEmail(${index})">Delete</button>`;
        emailList.appendChild(li);
    });
}

function addEmail() {
    let contactName = document.getElementById("contactName").value.trim();
    let emailInput = document.getElementById("emailInput").value.trim();

    if (contactName === "" || emailInput === "") {
        alert("Please enter both Contact Name and Email!");
        return;
    }

    let emails = JSON.parse(localStorage.getItem("emergencyEmails")) || [];
    emails.push({ name: contactName, email: emailInput });
    localStorage.setItem("emergencyEmails", JSON.stringify(emails));

    console.log("Added Contact:", contactName, emailInput);
    document.getElementById("contactName").value = ""; // Clear input fields
    document.getElementById("emailInput").value = "";

    loadEmails();
}

function deleteEmail(index) {
    let emails = JSON.parse(localStorage.getItem("emergencyEmails"));
    emails.splice(index, 1);
    localStorage.setItem("emergencyEmails", JSON.stringify(emails));
    loadEmails();
}
