class User {
    constructor(siteId, siteAttributes) {
        this.id = siteId
        this.name = siteAttributes.name
        this.street_address = siteAttributes.street_address
        this.city = siteAttributes.city
        this.state = siteAttributes.state
        this.zipcode = siteAttributes.zipcode

    }

}
