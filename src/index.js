endPoint = ('http://localhost:3000/api/v1/users')

document.addEventListener('DOMContentLoaded', () => {
    getUsers()
    findSites()
    addSite()
    findButton()
    createButton()
})

function getUsers() {
    fetch(endPoint)
    .then(response => response.json())
    .then(user => {

        let userDiv = document.querySelector(`#users-container`);
        `<h2>Donation Sites</h2>`
        user.data.forEach(data => {
            const userData = 
            `<div id=${data.id}>
            <h3>${data.attributes.name}</h3>
            <p>${data.attributes.street_address}</p>
            <p>${data.attributes.city}, ${data.attributes.state}, ${data.attributes.zipcode}</p>

            </div><br>`;

            userDiv.innerHTML += userData

            dayData(data);
            itemData(data);

        }) 
    })
};       

function dayData(data) {
    const userSchedule = 

    data.attributes.days.forEach(day => {

        let div = document.getElementById(`${day.user_id}`)
        
        const dayData = 
        `<p>${day.day_of_week}: ${day.start_time} to ${day.end_time}</p>`;

        div.innerHTML += dayData
    })
};

function itemData(data) {

    data.attributes.items.forEach(item => {

        let div = document.getElementById(`${item.user_id}`)
        const itemData = 
        `<p>${item.quantity} - ${item.description}</p>`;

        div.innerHTML += itemData
    })
};


function findSites() {
    const formsDiv = document.querySelector('#forms')

    const findSitesForm = 
    `<form id="get-sites">
    <h3>Find Donation Sites</h3>
    <input id="zipcode" type="text" name="zipcode" placeholder="Enter Zipcode">
    <input id="find-button" type="submit" name="submit" value="Search" class="submit">
    </form>`;

    formsDiv.innerHTML += findSitesForm
};

function findButton() {
    let findForm = document.querySelector("#get-sites")

    findForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(e)
    })
}

function addSite() {
    const formsDiv = document.querySelector('#forms')

    const createSiteForm = 
    `<form id="create-site">
    <h3>Create a New Donation Site</h3>
    <input id="name" type="text" name="name" placeholder="Name">
    <input id="street-address" type="text" name="street-address" placeholder="Street Address">
    <input id="city" type="text" name="city" placeholder="City">
    <input id="state" type="text" name="state" placeholder="State">
    <input id="zipcode" type="text" name="zipcode" placeholder="Zipcode">
    <input id="create-button" type="submit" name="submit" value="Create" class="submit">
    </form>`;
 
    formsDiv.innerHTML += createSiteForm
};

function createButton() {
    let form = document.getElementById("create-site")

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
})
}


