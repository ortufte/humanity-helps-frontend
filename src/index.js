endPointSites = ('http://localhost:3000/api/v1/sites')
endPointItems = ('http://localhost:3000/api/v1/items')
endPointDays = ('http://localhost:3000/api/v1/days')


document.addEventListener('DOMContentLoaded', () => {
    findSitesForm()
    createSiteForm()
    findSitesButton()
    createSiteButton()
});

// find sites by zipcode form, appears on DOM Load
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

// find sites button event listener
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

// list sites that match zipcode etered in form
function getSites(zip) {
    fetch(endPointSites)
    .then(response => response.json())
    .then(sites => {
        sites.data.forEach(data => {
     
            if(zip === data.attributes.zipcode) {
                let newSite = new Site(data.id, data.attributes)
                let siteDiv = document.querySelector(`#site-container`);
                siteDiv.innerHTML = newSite.renderSiteData()
                renderDayData(data);
                renderItemData(data);
            }
       
            document.querySelector('#zipcode').value = " "

        });  
    })
}     

// list the days that belong to the site
function renderDayData(data) {
    data.attributes.days.forEach(day => {
        let newDay = new Day(day)
        let div = document.querySelector('#schedule');
        div.innerHTML += newDay.renderDayData()
    })
};

// list the items that belong to the site
function renderItemData(data) {
    data.attributes.items.forEach(item => {
        let newItem = new Item(item)
        let div = document.querySelector('#items');
        div.innerHTML += newItem.renderItemData()
    })
};

// create a new site form, appears on DOM Load
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

// create site button add event listener
function createSiteButton() {
    let siteForm = document.getElementById("create-site")

    siteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createSite(e)
    })
};

// create a new donation site
function createSite(e) {
    let name = e.target.name.value;
    let streetAddress = e.target.street.value;
    let city = e.target.city.value;
    let state = e.target.state.value;
    let zipcode = e.target.zip.value;

    fetch(endPointSites, {
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
        let newSite = new Site(site.data.id, site.data.attributes)
        let siteDiv = document.querySelector(`#site-container`);
        siteDiv.innerHTML = newSite.renderSiteData()
        let itemsDiv = document.querySelector(`#items`)
        itemsDiv.innerHTML += newSite.newSiteItem(site.id)
        let scheduleDiv = document.querySelector(`#schedule`)
        scheduleDiv.innerHTML += newSite.newSiteDay(site.id)
        createItemButton();
        createDayButton();
    })
    document.querySelector('#name').value = " "
    document.querySelector('#street').value = " "
    document.querySelector('#city').value = " "
    document.querySelector('#state').value = " "
    document.querySelector('#zip').value = " "
};

// createItem event listener
function createItemButton() {
    let itemForm = document.getElementById("create-item")
    itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createItems(e)
    })
};

//createDay event listener
function createDayButton() {
    let dayForm = document.getElementById("create-day")
    dayForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createSchedule(e)
    })
};

//-----------------------------------------------------------------------------------------------------------

function createItems(e) {
    let site_id = e.target.name;
    let description = e.target.description.value;
    let quantity = e.target.quantity.value;
    debugger
        fetch(endPointItems, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                site_id: site_id,
                quantity: quantity,
                description: description,
              })
        })
        .then(response => response.json())
        .then(item => {
            debugger
            let itemsDiv = document.querySelector(`#items`);
            let itemData = document.createElement("li");
           
            itemData.innerHTML =`${item.data.attributes.quantity} - ${item.data.attributes.description}`;
            itemsDiv.append(itemData)
        })

    document.querySelector('#item-box').value = " "
    document.querySelector('#qty').value = " "
}


function createSchedule(e) {
    let site_id = e.target.name;
    let day_of_week = e.target.day.value;
    let start_time = e.target.start.value;
    let end_time = e.target.end.value;
    debugger
  
    fetch(endPointDays, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                  site_id: site_id,
                  day_of_week: day_of_week,
                  start_time: start_time, 
                  end_time: end_time,
              })
        })
        .then(response => response.json())
        .then(day => {
            let daysDiv = document.querySelector(`#schedule`);
            let dayData = document.createElement("li");

            dayData.innerHTML =`${day.data.attributes.day_of_week}` + " from " + `${day.data.attributes.start_time}` + " to " + `${day.data.attributes.end_time}`;
            daysDiv.append(dayData)

        })

        // document.querySelector('#day-box').value = " ";
        // document.querySelector('#start-time').value = " ";
        // document.querySelector('#end-time').value = " ";
}




