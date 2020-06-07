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

// Add <ul> for good and bad lists
const gListHeading = document.querySelector('.gl')
const bListHeading = document.querySelector('.bl')
const gList = document.createElement('ul')
const bList = document.createElement('ul')
gList.classList.add('good-list')
bList.classList.add('bad-list')
gListHeading.insertAdjacentElement("afterend", gList)
bListHeading.insertAdjacentElement("afterend", bList)

// Report details section
const updateReportDetailsBtn = document.querySelector(".update-report-details");
updateReportDetailsBtn.addEventListener("click", (e) => {
    const detail = document.querySelectorAll(".detail");
    const detailArray = [...detail];
    detailArray.forEach((event) => {
        const field = event.value;
        const name = event.name;
        const originalValue = event.dataset.value;

        AddContent(name, field, originalValue);
    });
});

function AddContent(variable, value, originalValue) {
    const content = document.querySelectorAll(`.${variable}`);
    const contentArray = [...content];
    contentArray.forEach((e) => {
        if (value === "") {
            e.textContent = originalValue;
            e.classList.add("editable");

        } else {
            e.textContent = value;
            e.classList.remove("editable");
            console.log(variable)
            let v = variable
            localStorage.v = `"${value}"`
        }
    });
}

const clearReportDetailsBtn = document.querySelector(".clear-report-details");
clearReportDetailsBtn.addEventListener("click", (e) => {
    let detail = document.querySelectorAll(".detail");
    let detailArray = [...detail];
    detailArray.forEach((event) => {
        event.value = "";
        const field = event.value;
        const name = event.name;
        const originalValue = event.dataset.value;

        AddContent(name, field, originalValue);
    });
});






// Add list item
const addListItemBtn = document.querySelectorAll(".add");
const addListItemBtnArray = [...addListItemBtn]


class AddItem {
    constructor(event, type) {

        const addItemButton = event.target;
        const parent = event.target.parentElement;
        let previousField = addItemButton.previousElementSibling.querySelector(
            "textarea"
        );
        // //   Find all text areas and create an array
        let listItem = document.querySelectorAll(`.${type}-list-item`);
        let listItemArray = [...listItem];

        //   If the field is empty don't do anything
        //   To do: add some validation and return an error
        if (previousField.value == "") {
            return;
        }

        //   If the field has text then do the following.
        //   Loop through array and add 1 to i. This is used to identify the text area.
        let i = 0;
        listItemArray.forEach((textarea) => {
            i++;

            //     Set some variables
            const label = textarea.previousElementSibling;
            const fieldContainer = textarea.parentElement;
            //    Add ID's and label for new field.
            label.setAttribute('for', `${type}${i}`)
            label.textContent = `Item ${i}`;
            textarea.setAttribute("id", `${type}${i}`);
            textarea.setAttribute("data-target", `${type}ListItem${i}`);
            fieldContainer.setAttribute("id", `${type}FieldContainer${i}`);
        });
        // Create the new field and label
        const div = document.createElement("div");
        div.setAttribute("id", `${type}FieldContainer${i + 1}`);
        div.innerHTML = `
<label>Item ${i + 1}</label>
<textarea id='${type}${i + 1}' class='${type}-list-item ff'></textarea>
`;
        parent.insertBefore(div, addItemButton);

        //   Build update button
        const updateButton = document.createElement("button");
        updateButton.innerHTML = `<span aria-hidden="true" class="fas fa-sync-alt"></span>`;
        parent.insertBefore(updateButton, div);
        updateButton.setAttribute("id", `update${type}${i}`);
        updateButton.setAttribute('aria-label', `Update item ${i}`)
        updateButton.classList.add("update", "btn");

        //   Add event listener to the update button
        updateButton.addEventListener("click", (e) => {
            const updateField = updateButton.previousElementSibling;
            const target = updateField.querySelector("textarea").dataset.target;
            const value = updateField.querySelector("textarea").value;
            console.log(value);
            let typeList = document.querySelector(`.${type}-list`);
            const item = typeList.querySelector(`#${target}`);
            item.innerHTML = `
<span class='editable'>${value}</span>
  `;
        });
        //   Build remove button
        const removeButton = document.createElement("button");
        removeButton.innerHTML = `<span aria-hidden="true" class="fas fa-trash"></span>`;
        parent.insertBefore(removeButton, div);
        removeButton.setAttribute("id", `removeGood${i}`);
        removeButton.setAttribute('aria-label', `Remove item ${i}`)
        removeButton.classList.add("remove", "btn");
        const removeBtnID = removeButton.getAttribute("id");

        // Add eventListener for remove button
        removeButton.addEventListener("click", (e) => {
            const removeField =
                removeButton.previousElementSibling.previousElementSibling;
            const target = removeField.querySelector("textarea").dataset.target;
            let typeList = document.querySelector(`.${type}-list`);
            const removeItem = typeList.querySelector(`#${target}`);
            removeItem.parentNode.removeChild(removeItem);
            removeButton.parentNode.removeChild(removeField);
            removeButton.parentNode.removeChild(updateButton);
            removeButton.parentNode.removeChild(removeButton);

            const listContent = typeList.querySelectorAll("li");
            const listContentArray = [...listContent];
            console.log(listContentArray);
            let n = 0;
            listContentArray.forEach((lItem) => {
                n++;
                lItem.setAttribute("id", `${type}ListItem${n}`);
            });
            //  Reset numbering for elements
            let listItem = document.querySelectorAll(`.${type}-list-item`);
            let listItemArray = [...listItem];

            let i = 0;
            console.log(listItemArray);

            const numberofItemsInArray = listItemArray.length;
            console.log(numberofItemsInArray);
            listItemArray.forEach((textarea) => {
                //     To do:  Fix bug with assigning new id values to elements that don't exist on the last array item
                i++;
                textarea.previousElementSibling.textContent = `Item ${i}`;
                textarea.setAttribute("id", `${type}${i}`);
                textarea.setAttribute("data-target", `${type}ListItem${i}`);
                textarea.parentElement.setAttribute("id", `${type}FieldContainer${i}`);

                //      If textarea is the last item in the array don't update the id's for the update and remove buttons
                if (textarea == listItemArray.slice(-1)[0]) {
                    return;
                }
                textarea.parentElement.nextElementSibling.setAttribute(
                    "id",
                    `update${type}${i}`
                );
                textarea.parentElement.nextElementSibling.nextElementSibling.setAttribute(
                    "id",
                    `remove${type}${i}`
                );
            });
        });

        //  Reassign previous field variable to the new previous field.
        previousField = addItemButton.previousElementSibling.querySelector(
            "textarea"
        );
        previousField.focus();

        //   Add a new list item to the list in content.
        let typeList = document.querySelector(`.${type}-list`);
        const newListItem = document.createElement("li");
        newListItem.setAttribute("id", `${type}ListItem${i}`);
        const value = parent.querySelector(`#${type}${i}`).value;
        newListItem.innerHTML = `
<span class='editable'>${value}</span>
  `;
        typeList.appendChild(newListItem);
    }
}


addListItemBtnArray.forEach(lBtn => {
    console.log(lBtn)
    lBtn.addEventListener("click", btn => {
        if (btn.target.classList.contains('good')) {
            const addGItem = new AddItem(btn, 'good')
        } else {
            const addBItem = new AddItem(btn, 'bad')
        }
    });

})

