class User {
    constructor(siteId, siteAttributes) {
        this.id = siteId
        this.name = siteAttributes.name
        this.street_address = siteAttributes.street_address
        this.city = siteAttributes.city
        this.state = siteAttributes.state
        this.zipcode = siteAttributes.zipcode
        User.all.push(this)

    }

    renderSiteData() {
        return `
            <div id=${this.id}>
            <h3>${this.name}</h3>
            <p>${this.street_address}</p>
            <p>${this.city}, ${this.state}, ${this.zipcode}</p><br>
            </div><br>`;
        }
    }

//data.attributes.days
//data.attributes.items


User.all = []
