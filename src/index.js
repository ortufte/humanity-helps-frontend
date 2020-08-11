endPoint = ('http://localhost:3000/api/v1/users')

document.addEventListener('DOMContentLoaded', () => {
    findSites()
    createSiteForm()
    addItemForm()
    addDayForm()
    findSitesButton()
    createSiteButton()
    addItemButton()
    addDayButton()
});

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

function findSitesButton() {
    let findForm = document.querySelector("#get-sites")
    findForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let zip = e.target.zipcode.value
    getSites(zip)
    })
};

function getSites(zip) {
    fetch(endPoint)
    .then(response => response.json())
    .then(users => {
        let userDiv = document.querySelector(`#users-container`);
        userDiv.innerHTML += `<h2>Donation Sites</h2>`
        users.data.forEach(data => {
            if(zip === data.attributes.zipcode) {
                const userData = 
                `<div id=${data.id}>
                <h3>${data.attributes.name}</h3>
                <p>${data.attributes.street_address}</p>
                <p>${data.attributes.city}, ${data.attributes.state}, ${data.attributes.zipcode}</p>
                </div><br>`;

            userDiv.innerHTML += userData

            dayData(data);
            itemData(data);
            };
        })  
        document.querySelector('#zipcode').value = " "
    });  
}     


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


function createSiteForm() {
    const formsDiv = document.querySelector('#forms')

    const createSiteForm = 
    `<form id="create-site">
    <h3>Create a New Donation Site</h3>
    <input id="name" type="text" name="name" placeholder="Name">
    <input id="street" type="text" name="street" placeholder="Street Address">
    <input id="city" type="text" name="city" placeholder="City">
    <input id="state" type="text" name="state" placeholder="State">
    <input id="zipcode" type="text" name="zipcode" placeholder="Zipcode">
    <input id="create-button" type="submit" name="submit" value="Create" class="submit">
    </form><br>`;
 
    formsDiv.innerHTML += createSiteForm
};

function createSiteButton() {
    let siteForm = document.getElementById("create-site")

    siteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createSite(e)
    })
};

function createSite(e) {
    let name = e.target.name.value;
    let streetAddress = e.target.street.value;
    let city = e.target.city.value;
    let state = e.target.state.value;
    let zipcode = e.target.zipcode.value;

    fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: name,
              street_address: streetAddress,
              city: city,
              state: state,
              zipcode: zipcode,
          })
    })
    .then(response => response.json())
    .then(site => {
        let userDiv = document.querySelector(`#users-container`);
        const siteData = 
        `<div id=${site.data.id}>
        <h3>${site.data.attributes.name}</h3>
        <p>${site.data.attributes.street_address}</p>
        <p>${site.data.attributes.city}, ${site.data.attributes.state}, ${site.data.attributes.zipcode}</p>
        </div><br>`
    .catch(error => window.alert("missing information"));

    userDiv.innerHTML += siteData
    })
};

function addItemForm() {
    const formsDiv = document.querySelector('#forms')

    const createItemForm = 
    `<form id="create-item">
    <h3>Add Items to your List</h3>
    <input id="description" type="text" name="description" placeholder="Description">
    <input id="quantity" type="text" name="quantity" placeholder="Quantity">
    <input id="add-item" type="submit" name="submit" value="Add" class="submit">
    </form>`;

    formsDiv.innerHTML += createItemForm
    
};

function addItemButton() {
    let itemForm = document.getElementById("create-item")

    itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem(e)
    })
};

function addItem(e) {
    let desc = e.target.description.value
    let qty = e.target.quantity.value
    
    fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              description: desc,
              quantity: qty,
          })
    })
    .then(response => response.json())
    .then(item => console.log(item))
}

function addDayForm() {
    const formsDiv = document.querySelector('#forms')

    const createDayForm = 
    `<form id="create-day">
    <h3>Add a Day to your Schedule</h3>
    <input id="date" type="text" name="day-of-week" placeholder="Date">
    <input id="start-time" type="text" name="start" placeholder="Opens">
    <input id="end-time" type="text" name="end" placeholder="Closes">
    <input id="add-day" type="submit" name="submit" value="Add" class="submit">
    </form>`;

    formsDiv.innerHTML += createDayForm
};

function addDayButton() {
    let dayForm = document.getElementById("create-day")

    dayForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e)
     addDay(e)
    })
};

function addDay(e) {
    let date = e.target.date.value
    let start = e.target.start.value
    let end = e.target.end.value
    // debugger

    fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              day_of_week: date,
              start_time: start,
              end_time: end,
          })
    })
    .then(response => response.json())
    .then(day => console.log(day))
};



