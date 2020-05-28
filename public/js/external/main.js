// PRINT BTN
const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})


// EDIT REPORT
const params = new URLSearchParams(window.location.search);
const edit = document.querySelectorAll('.editable');
const editArray = [...edit]

if (params.has('edit')) {
    editArray.forEach((element) => {
        element.classList.add('editLive');
        element.setAttribute('contenteditable', true)
    })
}