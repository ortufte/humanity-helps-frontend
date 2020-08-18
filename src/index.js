endPointUsers = ('http://localhost:3000/api/v1/users')
endPointItems = (`http://localhost:3000/api/v1/items`)
endPointDays = ('http://localhost:3000/api/v1/days')


document.addEventListener('DOMContentLoaded', () => {
    findSitesForm()
    createSiteForm()
    findSitesButton()
    createSiteButton()
});

function findSitesForm() {
    const findByZipcode = document.querySelector('#find-by-zipcode')

    const findSites = 
    `<form id="get-sites">
    <h3>Find Donation Sites</h3>
    <input id="zipcode" type="text" name="zipcode" placeholder="Enter Zipcode">
    <input id="find-button" type="submit" name="submit" value="Search" class="submit">
    </form>`;

    findByZipcode.innerHTML += findSites
};

function findSitesButton() {
    let findForm = document.querySelector("#get-sites")
    
    findForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let zip = e.target.zipcode.value
    
        if(zip) {
        getSites(zip)
        }
    })
};

function getSites(zip) {
    fetch(endPointUsers)
    .then(response => response.json())
    .then(users => {
        let userDiv = document.querySelector(`#search-results`);
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
    const formsDiv = document.querySelector('#new-site-forms')

    const createSiteForm = 
    `<form id="create-site">
    <h3>Create a New Donation Site</h3>
    <input id="name" type="text" name="name" placeholder="Name">
    <input id="street" type="text" name="street" placeholder="Street Address">
    <input id="city" type="text" name="city" placeholder="City">
    <input id="state" type="text" name="state" placeholder="State">
    <input id="zip" type="text" name="zipcode" placeholder="Zipcode">
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
    let zipcode = e.target.zip.value;

    fetch(endPointUsers, {
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
        let newUser = new User(site.data.id, site.data.attributes)
        displaySite(newUser)
    })
  
};

function displaySite(site) {
    const siteDiv = document.querySelector(`#site-container`);

    const siteData = 
    `<div id=${site.id}>
    <h3>${site.name}</h3>
    <p>${site.street_address}</p>
    <p>${site.city}, ${site.state}, ${site.zipcode}</p>

    </div>`

    siteDiv.innerHTML += siteData

    let itemsDiv = document.createElement("div");
    itemsDiv.setAttribute("id","items");
    
    let scheduleDiv = document.createElement("div");
    scheduleDiv.setAttribute("id", "schedule");

    let itemsForm = document.createElement("container");
    itemsForm.setAttribute("id", "items-form")

    let daysForm = document.createElement("container");
    daysForm.setAttribute("id", "days-form");

    siteDiv.appendChild(itemsDiv);
    siteDiv.appendChild(scheduleDiv);
    itemsDiv.appendChild(itemsForm);
    scheduleDiv.appendChild(daysForm);

    addItem(site.id);
    addDay(site.id);
}

function addItem(siteId) {
    let itemsForm = document.getElementById("items-form")
    const itemForm = 
    `<br><form id="create-item" name=${siteId}>
    <input id="item-box" type="text" name="description" placeholder="Description"/>
    <input id="qty" type="integer" name="quantity" placeholder="Quantity">
    <input id="create-button" type="submit" name="submit" value="Add Item" class="submit">
    </form><br>`;
    itemsForm.innerHTML += itemForm
    createItemButton()
};

function createItemButton() {
    let itemForm = document.getElementById("create-item")
    itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createItems(e)
    })
};

function createItems(e) {
    let user_id = e.target.name;
    let description = e.target.description.value;
    let quantity = e.target.quantity.value;

        fetch(endPointItems, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                user_id: user_id,
                quantity: quantity,
                description: description,
              })
        })
        .then(response => response.json())
        .then(item => {
            let itemsDiv = document.querySelector(`#items`);
            let itemData = document.createElement("li");
           
            itemData.innerHTML =`${item.data.attributes.quantity} - ${item.data.attributes.description}`;
            itemsDiv.append(itemData)
        })

    document.querySelector('#item-box').value = " "
    document.querySelector('#qty').value = " "
}

function addDay(siteId) {
    let daysForm = document.getElementById("days-form");
    const dayForm = 
    `<br><form id="create-day" name=${siteId}>
    <input id="day-box" type="text" name="day" placeholder="ex. Monday"/>
    <input id="start-time" type="string" name="start" placeholder="ex. 6:00am"/>
    <input id="end-time" type="string" name="end" placeholder="ex. 5:00pm"/>
    <input id="create-button" type="submit" name="submit" value="Add Day" class="submit">
    </form><br>`;
    daysForm.innerHTML += dayForm
    createDayButton()
};

function createDayButton() {
    let dayForm = document.getElementById("create-day")
    dayForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createSchedule(e)
    })
};


function createSchedule(e) {
    let user_id = e.target.name;
    let day = e.target.day.value;
    let start = e.target.start.value;
    let end = e.target.end.value;

        fetch(endPointDays, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                  user_id: user_id,
                  day_of_week: day,
                  start_time: start, 
                  end_time: end,
              })
        })
        .then(response => response.json())
        .then(day => {
            let daysDiv = document.querySelector(`#schedule`);
            let dayData = document.createElement("li");

            dayData.innerHTML =`${day.data.attributes.day_of_week}` + " from " + `${day.data.attributes.start_time}` + " to " + `${day.data.attributes.end_time}`;
            daysDiv.append(dayData)

        })

        document.querySelector('#day-box').value = " ";
        document.querySelector('#start-time').value = " ";
        document.querySelector('#end-time').value = " ";
}




