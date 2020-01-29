

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph1 = document.querySelector('#message1')
const paragraph2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    paragraph1.textContent = 'Loading...'
    paragraph2.textContent = ''

    fetch('/weather?adress=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            paragraph1.textContent = data.error
            paragraph2.textContent = ''
        } else {
            paragraph1.textContent = data.location
            paragraph2.textContent = data.forecastData
        }
    })
})
})