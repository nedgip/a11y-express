import { Collection } from "mongoose";

const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})

const queryString = new URLSearchParams(window.location.search);
const currentQueryString = queryString.get('currentQueryString');

if (currentQueryString === "edit") {
    console.log('edit')
} else {
    console.log('nothing to see here')
}