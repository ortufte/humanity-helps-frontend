endPoint = ('http://localhost:3000/api/v1/users')

document.addEventListener('DOMContentLoaded', () => {
    getUsers()
})

function getUsers() {
    fetch(endPoint)
    .then(response => response.json())
    .then(user => {

        let userDiv = document.querySelector('#users-container')

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
}       

function dayData(data) {
    const userSchedule = 

    data.attributes.days.forEach(day => {

        let div = document.getElementById(`${day.user_id}`)
        
        const dayData = 
        `<p>${day.day_of_week}: ${day.start_time} to ${day.end_time}</p>`;

        div.innerHTML += dayData
    })
}

function itemData(data) {

    data.attributes.items.forEach(item => {

        let div = document.getElementById(`${item.user_id}`)
        const itemData = 
        `<p>${item.quantity} - ${item.description}</p>`;

        div.innerHTML += itemData
    })

}