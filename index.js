const target = document.getElementById ('advice')
const paragraph = document.querySelector( '.main p')
let adviceCount = 1
// const targetDiv = document.getElementById('movieDetails'); 
fetch('https://api.adviceslip.com/advice')
.then(response=>response.json())
.then(data=>{
    target.innerHTML = `${data.slip.advice}`
    paragraph.innerHTML = `Advice # ${adviceCount++}`
})
.catch(error => {
    target.innerHTML = 'Error fetching advice! Please try again'
    paragraph.innerHTML= 'Failed to fetch advice'
    console.log('Error', error)
})