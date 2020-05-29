// PRINT BTN
const printBtn = document.querySelector('.print');

printBtn.addEventListener('click', () => {
    window.print()
})
// Sidebar menu
const menuBtn = document.querySelector(".sidebar");
const offSiteContainer = document.querySelector(".off-site-container");
const siteMenu = offSiteContainer.querySelector("#siteMenu");
const closeSiteMenu = siteMenu.querySelector("#closeSiteMenu");
const siteMenuListWrapper = siteMenu.querySelector(".menuListWrapper");

// Menu button event listener
menuBtn.addEventListener("click", event => {
    body.classList.toggle("is-open");
    if (body.classList.contains("is-open")) {
        offSiteContainer.removeAttribute("aria-hidden");
        siteMenuListWrapper.classList.remove("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
        // 	 Set focus on the labelled menu container
        closeSiteMenu.focus();
    } else {
        offSiteContainer.setAttribute("aria-hidden", "true");
        siteMenuListWrapper.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});

// Close menu button event listener
closeSiteMenu.addEventListener("click", event => {
    body.classList.remove("is-open");
    offSiteContainer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    // 	Return focus to the menu button
    menuBtn.focus();
});





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