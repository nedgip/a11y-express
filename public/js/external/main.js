const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})

const params = new URLSearchParams(window.location.search)

if (params.has('edit')) {
    console.log('yes')
}