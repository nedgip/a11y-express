const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})

const queryString = new URLSearchParams(window.location.search);
const currentQueryString = queryString.get('currentQueryString');

console.log(myParam)