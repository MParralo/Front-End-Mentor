const buttons = document.querySelectorAll('.buttons')
const submit = document.querySelector('#submit')
const article1 = document.querySelector('#article1')
const article2 = document.querySelector('#article2')
const result = document.querySelector('#result')

let selectedRating = null

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // Remove active state from all buttons
        buttons.forEach(b => b.classList.remove('active'))
        
        // Add active state to clicked button
        btn.classList.add('active')
        
        selectedRating = e.target.innerText
        result.innerHTML = `You selected ${selectedRating} out of 5`
    })
})

submit.addEventListener('click', (e) => {
    if (selectedRating) {
        article1.classList.add('hidden')
        article2.classList.remove('hidden')
    } else {
        alert('Please select a rating before submitting')
    }
})
