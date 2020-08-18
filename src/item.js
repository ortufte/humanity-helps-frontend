class Item {
    constructor(item) {
        this.id = item.id
        this.description = item.description
        this.quantity = item.quantity
        this.siteId = item.site_id
    }

    renderItemData() {
        return `
        <p>${this.quantity} - ${this.description}</p>
        <br>`;
    }

}
