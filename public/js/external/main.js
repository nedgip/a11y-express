// Print button
const printBtn = document.querySelector('.print');

printBtn.addEventListener('click', () => {
    window.print()
})
// Sidebar menu
const menuBtn = document.querySelector("#menuBtn");
const body = document.body;
const offSiteContainer = body.querySelector(".off-site-container");
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






// Add Angular to file
const config = document.querySelector('.config')
config.setAttribute('ng-app', "")

const product = document.querySelector('.product')
product.setAttribute('ng-model', "product")
const client = document.querySelector('.client')
client.setAttribute('ng-model', "client")
const wcag = document.querySelector('.wcag')
wcag.setAttribute('ng-model', "wcag")
const level = document.querySelector('.level')
level.setAttribute('ng-model', "level")
const start = document.querySelector('.start')
start.setAttribute('ng-model', "start")
const end = document.querySelector('.end')
end.setAttribute('ng-model', "end")


class bindFields {
    constructor(value, selector) {
        const v = document.querySelectorAll(selector);
        const vArray = [...v];
        vArray.forEach(e => {
            e.textContent = `{{${value}}}`
        })
    }
}

const clientBind = new bindFields('client', '.client-hl');
const productBind = new bindFields('product', '.product-hl');
const productBind = new bindFields('wcag', '.wcag-hl');
const productBind = new bindFields('level', '.level-hl');
const productBind = new bindFields('start', '.start-hl');
const productBind = new bindFields('end', '.end-hl');
// const clientValue = document.querySelectorAll('.client-hl')
// const clientValueArray = [...clientValue]
// clientValueArray.forEach(e => {
//     e.textContent = '{{client}}'
// })

// const productValue = document.querySelectorAll('.product-hl')
// const productValueArray = [...productValue]
// productValueArray.forEach(e => {
//     e.textContent = '{{product}}'
// })


// const wcagValue = document.querySelector('.wcag-hl')
// wcagValue.textContent = '{{wcag}}'

// const levelValue = document.querySelector('.level-hl')
// levelValue.textContent = '{{level}}'

// const startValue = document.querySelector('.start-hl')
// startValue.textContent = '{{start}}'

// const endValue = document.querySelector('.end-hl')
// endValue.textContent = '{{end}}'