// PRINT BTN
const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})


// EDIT REPORT
const params = new URLSearchParams(window.location.search);
const edit = document.querySelectorAll('.editable');
const editArray = [...edit];
const config = document.querySelector('.config')
config.setAttribute('ng-app', "")
// const product = document.querySelector('.product')
// product.setAttribute('ng-model', "product")
// const client = document.querySelector('.client')
// client.setAttribute('ng-model', "client")
// const wcag = document.querySelector('.wcag')
// client.setAttribute('ng-model', "wcag")
// const level = document.querySelector('.level')
// client.setAttribute('ng-model', "level")


// if (params.has('edit')) {
// const script = document.querySelector('#script');
// console.log(script)
// script.textContent = `<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>`;
const sidebar = document.querySelector('.off-site-container');
sidebar.innerHTML = `<div>
    <label>Client</label>
    <input type="text" ng-model="client">
  </div>
  <div>
    <label>Product</label>
    <input ng-model="product" type="text">
  </div>
<div>
    <label>WCAG</label>
  <select ng-model="wcag">
    <option>WCAG 2.1</option>
    <option>WCAG 2.0</option>
  </select>
  </div>
  <div>
    <label>Start date</label>
    <input type="date" ng-model="start-date">
</div>
   <div>
    <label>End date</label>
    <input type="date" ng-model="end-date">
</div>
    `

    // editArray.forEach((element) => {
    //     element.classList.add('editLive');
    // element.setAttribute('contenteditable', true);
    // element.setAttribute('tabindex', 0);
    // element.setAttribute('role', 'textarea');


    // })
// }