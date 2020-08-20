const endPointSites = ('http://localhost:3000/api/v1/sites')
const endPointItems = ('http://localhost:3000/api/v1/items')
const endPointDays = ('http://localhost:3000/api/v1/days')


document.addEventListener('DOMContentLoaded', () => {
    findSitesForm()
    findSitesButton()
    addSiteButton()
});


// find sites by zipcode form, appears on DOM Load
function findSitesForm() {
    const findByZipcode = document.createElement("div")
    findByZipcode.setAttribute("id","find-by-zipcode")
    const mainDiv = document.getElementById("main")
    mainDiv.prepend(findByZipcode)

    const findSites = 
    `<form id="get-sites">
    <h3>FIND DONATION SITES</h3>
    <input id="zipcode" type="text" name="zipcode" placeholder="Enter Zipcode">
    <input id="find-button" type="submit" name="submit" value="Search" class="submit">
    </form>`;

    findByZipcode.innerHTML += findSites
};

// find sites button event listener
function findSitesButton() {
    findForm = document.querySelector("#get-sites")
    
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

                const main = document.querySelector("#main")

                let siteDiv = document.createElement("div")
                siteDiv.setAttribute("id", "site-container");
                siteDiv.innerHTML += newSite.renderSiteData()

                main.appendChild(siteDiv)

                renderDayData(data);
                renderItemData(data);
            }
            // else {
            // alert(`There are no donation sites in the ${zip} area currently.`)
            // }
        });  

        let backBtn = document.createElement("BUTTON")
        backBtn.setAttribute("id", "save-and-exit")
        backBtn.innerHTML = "Back to Home"
        main.appendChild(backBtn)
        saveAndExit()

        const findByZipcode = document.querySelector('#find-by-zipcode')
        findByZipcode.remove()
        const buttonDiv = document.querySelector("#button-div")
        buttonDiv.remove()
    })
    .catch(error => {
        console.log(error)
    })
}     

// list the days that belong to the site
function renderDayData(data) {
    data.attributes.days.forEach(day => {
        let newDay = new Day(day)
        let div = document.getElementById(`${data.id} schedule`);
        div.innerHTML += newDay.renderDayData()
    })
};

// list the items that belong to the site
function renderItemData(data) {
    data.attributes.items.forEach(item => {
        let newItem = new Item(item)
        let div = document.getElementById(`${data.id} items`);
        div.innerHTML += newItem.renderItemData()
    })
};


// create add site button - called on DOM load event listener
function addSiteButton() {

    const addSiteButton = document.createElement("BUTTON");
    addSiteButton.setAttribute("id","#add-site");
    addSiteButton.setAttribute("class", "btn btn-secondary btn-lg btn-block")
    addSiteButton.innerHTML = " Are you accepting emergency donations? Click here!"
   
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "button-div")
    buttonDiv.appendChild(addSiteButton);

    const footerDiv = document.getElementById("footer-div")
    footerDiv.appendChild(buttonDiv)

    getSiteForm(addSiteButton)
}

//add eventlistener to the add site button
function getSiteForm(addSiteButton) {

    addSiteButton.addEventListener("click", function(e) {
        e.preventDefault(); 
        createSiteForm()
})
}

// create a new site form, appears on click of add site button
function createSiteForm() {
    const main = document.querySelector("#main")
    const siteFormDiv = document.createElement("div")
    siteFormDiv.setAttribute("id", "site-form-div")
    main.appendChild(siteFormDiv)

    const createSiteForm = 
    `<form id="create-site">
    <h3>CREATE A NEW DONATION SITE</h3>
    <input id="name" type="text" name="name" placeholder="Name">
    <input id="street" type="text" name="street" placeholder="Street Address">
    <input id="city" type="text" name="city" placeholder="City">
    <input id="state" type="text" name="state" placeholder="State">
    <input id="zip" type="text" name="zipcode" placeholder="Zipcode">
    <input id="create-button" type="submit" name="submit" value="Create" class="submit">
    </form><br>`;
 
    siteFormDiv.innerHTML += createSiteForm
    createSiteButton();
    
    const findByZipcode = document.querySelector('#get-sites')
    findByZipcode.remove()

    const buttonDiv = document.querySelector("#button-div")
    buttonDiv.remove()

};

// create site button add event listener
function createSiteButton() {
    let siteForm = document.getElementById("create-site")
    siteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        createSite(e);
    });

}


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
        const main = document.querySelector("#main")

        let siteDiv = document.createElement("div")
        siteDiv.setAttribute("id", "site-container");

        main.appendChild(siteDiv)

        siteDiv.innerHTML = newSite.renderSiteData()
 
        let itemsDiv = document.getElementById(`${site.data.id} items`)
        itemsDiv.innerHTML += newSite.newSiteItem(site.id)

        let scheduleDiv = document.getElementById(`${site.data.id} schedule`)
        scheduleDiv.innerHTML += newSite.newSiteDay(site.id)

        let saveAndExitButton = document.createElement("BUTTON");
        saveAndExitButton.setAttribute("id", "save-and-exit")
        saveAndExitButton.innerHTML = "Save and Exit"
        siteDiv.appendChild(saveAndExitButton)

        createItemButton();
        createDayButton();
        saveAndExit();
        
    })

    let siteFormDiv = document.querySelector("#site-form-div")
    siteFormDiv.remove()

};

function saveAndExit() {
    let saveAndExitButton = document.getElementById("save-and-exit")
    saveAndExitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let main = document.getElementById("main");
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
 
        findSitesForm();
        findSitesButton();
        addSiteButton();
    })
}

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


//creates new days and lists them on page
function createSchedule(e) {
    let site_id = e.target.name;
    let day_of_week = e.target.day.value;
    let start_time = e.target.start.value;
    let end_time = e.target.end.value;
  
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

            let scheduleDiv = document.getElementById(`${day.data.attributes.site_id} schedule`)
            let dayData = document.createElement("li");

            dayData.innerHTML =`${day.data.attributes.day_of_week}` + " from " + `${day.data.attributes.start_time}` + " to " + `${day.data.attributes.end_time}`;
            scheduleDiv.prepend(dayData)
        })

        let site = Site.findById(e.target.name);
        let dayForm = document.getElementById("create-day");
        dayForm.innerHTML = site.newSiteDay();
        createDayButton(e);
}

//creates new items and lists them on page
function createItems(e) {
    let site_id = e.target.name;
    let description = e.target.description.value;
    let quantity = e.target.quantity.value;
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
            let itemsDiv = document.getElementById(`${item.data.attributes.site_id} items`)
            let itemData = document.createElement("li");
           
            itemData.innerHTML =`${item.data.attributes.quantity} - ${item.data.attributes.description}`;
            itemsDiv.prepend(itemData)

        })

        let site = Site.findById(e.target.name);
            let itemsForm = document.getElementById("create-item");
            itemsForm.innerHTML = site.newSiteItem();
            createItemButton(e);
}




