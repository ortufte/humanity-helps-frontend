

class Day {
    constructor(day) {
        this.id = day.id
        this.dayOfWeek = day.day_of_week
        this.startTime = day.start_time
        this.endTime = day.end_time
        this.siteId= day.site_id
    }

    renderDayData() {
        return `
        <p>${this.dayOfWeek}: ${this.startTime} to ${this.endTime}</p>`;
    }
}

