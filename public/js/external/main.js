// Print button
const pBtn = document.querySelector('.print');
pBtn.addEventListener('click', () => {
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

// Add attributes to elements
class AddAttr {
    constructor(selector, attr, value) {
        const s = document.querySelector(selector);
        s.setAttribute(attr, value)
    }
}
// Add Angular to file and inputs
const ngApp = new AddAttr('.config', 'ng-app', '')
const product = new AddAttr('.product', 'ng-model', 'product')
const client = new AddAttr('.client', 'ng-model', 'client')
const wcag = new AddAttr('.wcag', 'ng-model', 'wcag')
const level = new AddAttr('.level', 'ng-model', 'level')
const start = new AddAttr('.start', 'ng-model', 'start')
const end = new AddAttr('.end', 'ng-model', 'end')
const how = new AddAttr('.how', 'ng-model', 'how')

// Binds fields using Angular
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
const howBind = new BindFields('how', '.how-hl');

const tiny = document.querySelector('.script')
tiny.textContent = `tinymce.init({selector:'textarea'});`