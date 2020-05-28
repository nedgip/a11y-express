import { Collection } from "mongoose";

const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
const edit = "edit"
if (myParam.match(edit)) {
    console.log('edit')
} else {
    console.log('nothing to see here')
}