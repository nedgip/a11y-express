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



// Binding fields using Angular
class BindFields {
    constructor(value, selector) {
        const v = document.querySelectorAll(selector);
        const vArray = [...v];
        vArray.forEach(e => {
            e.textContent = `{{${value}}}`
        })
    }
}

const clientBind = new BindFields('client', '.client-hl');
const productBind = new BindFields('product', '.product-hl');
const wcagBind = new BindFields('wcag', '.wcag-hl');
const levelBind = new BindFields('level', '.level-hl');
const startBind = new BindFields('start', '.start-hl');
const endBind = new BindFields('end', '.end-hl');
