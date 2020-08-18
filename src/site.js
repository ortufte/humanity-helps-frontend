let allSites = []

class Site {
    constructor(siteId, siteAttributes) {
        this.id = siteId
        this.name = siteAttributes.name
        this.street_address = siteAttributes.street_address
        this.city = siteAttributes.city
        this.state = siteAttributes.state
        this.zipcode = siteAttributes.zipcode
        allSites.push(this)
    }

    renderSiteData() {
        return `
            <container id=${this.id}>
                <h3>${this.name}</h3>
                <p>${this.street_address}</p>
                <p>${this.city}, ${this.state}, ${this.zipcode}</p>
                <div id="schedule">
                    <h4>Schedule</h4>
                </div> 
                <div id="items">
                    <h4>Items</h4>
                </div>
            </container>`;
    }

    newSiteItem() {
        return `
            <br><form id="create-item">
            <input id="item-box" type="text" name="description" placeholder="Description"/>
             <input id="qty" type="integer" name="quantity" placeholder="Quantity">
            <input id="create-button" type="submit" name="submit" value="Add Item" class="submit">
            </form><br>`;
    };



    static findById(id) {
        this.all.find(site => site.id === id)
    }

    static get all() {
        return allSites
    }

}


