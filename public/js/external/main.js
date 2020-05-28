// PRINT BTN
const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})


// EDIT REPORT
const params = new URLSearchParams(window.location.search);
const edit = document.querySelectorAll('.editable');
const editArray = [...edit]
const script = document.querySelector('#script')

if (params.has('edit')) {
    editArray.forEach((element) => {
        element.classList.add('editLive');
        // element.setAttribute('contenteditable', true);
        // element.setAttribute('tabindex', 0);
        // element.setAttribute('role', 'textarea');
        script.innerHTML = '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>'

    })
}