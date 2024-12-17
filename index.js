// let count = 0

// function generateAdvice (){
//     const target = document.getElementById ('advice')
    
//     const countDisplay=document.getElementById('count')

//     fetch('https://api.adviceslip.com/advice')
//         .then(response=>response.json())
//         .then(data=>{
//             target.innerHTML = `${data.slip.advice}`
//             count++
//             countDisplay.innerHTML = `Advice count :${count} `
// })

// .catch(error => {
//     target.innerHTML = 'Error fetching advice! Please try again'
//     countDisplay.innerHTML= 'Failed to fetch advice'
//     console.log('Error', error)
// })
// }


let count = 0; // Initialize counter

// Function to fetch new advice and update UI
function generateAdvice() {
    const target = document.getElementById('advice'); // Element to display advice
    const countDisplay = document.getElementById('count'); // Element to display count

    // Fetch new advice from the API
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            target.innerHTML = `"${data.slip.advice}"`; // Set the new advice

                const randomNumber = Math.floor(Math.random()*100)+1  

            countDisplay.innerHTML = `Advice Count: ${randomNumber}`; // Update the count display
        })
        .catch(error => {
            target.innerHTML = 'Error fetching advice! Please try again'; // Error handling
            console.log('Error', error);
        });
}

