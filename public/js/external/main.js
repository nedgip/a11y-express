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
// On page load, loop through fields and load data from local storage.
const detail = document.querySelectorAll(".detail");
const how = document.querySelector(".how-field");
const detailArray = [...detail];
detailArray.push(how);
detailArray.forEach((e) => {
    const name = e.name;
    e.value = localStorage.getItem(name);
});

const updateBtn = document.querySelectorAll(".updateBtn");
const updateBtnArray = [...updateBtn];

updateBtnArray.forEach((uBtn) => {
    uBtn.addEventListener("click", (e) => {
        if (uBtn.classList.contains("how-button")) {
            const howField = document.querySelector(".how-field");
            let { name, field, originalValue } = getFieldValue(howField);
            addContent(name, field, originalValue);
        } else {
            const detail = document.querySelectorAll(".detail");
            const detailArray = [...detail];

            detailArray.forEach((event) => {
                //     Use destructuring to get the values from GetFieldValue function
                let { name, field, originalValue } = getFieldValue(event);
                addContent(name, field, originalValue);
            });
        }
    });
});

function getFieldValue(event) {
    const field = event.value;
    const name = event.name;
    const originalValue = event.dataset.value;
    return { field, name, originalValue };
}

function addContent(variable, value, originalValue) {
    const content = document.querySelectorAll(`.${variable}`);
    const contentArray = [...content];
    contentArray.forEach((e) => {
        if (value === "") {
            e.textContent = originalValue;
            e.classList.add("editable");
            localStorage.setItem(variable, value);
        } else {
            e.textContent = value;
            e.classList.remove("editable");
            localStorage.setItem(variable, value);
        }
    });
}

const clearBtn = document.querySelectorAll(".clearBtn");
const clearBtnArray = [...clearBtn];

clearBtnArray.forEach((cBtn) => {
    cBtn.addEventListener("click", (e) => {
        if (e.target.classList.contains("clear-how-button")) {
            const howField = document.querySelector(".how-field");
            howField.value = "";
            let { name, field, originalValue } = getFieldValue(howField);
            addContent(name, field, originalValue);
        } else {
            let detail = document.querySelectorAll(".detail");
            let detailArray = [...detail];
            detailArray.forEach((event) => {
                event.value = "";
                let { name, field, originalValue } = getFieldValue(event);
                addContent(name, field, originalValue);
                localStorage.clear();
            });
        }
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
        updateButton.setAttribute("type", "button");
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
<span>${value}</span>
  `;
        });
        //   Build remove button
        const removeButton = document.createElement("button");
        removeButton.innerHTML = `<span aria-hidden="true" class="fas fa-trash"></span>`;
        parent.insertBefore(removeButton, div);
        removeButton.setAttribute("id", `removeGood${i}`);
        removeButton.setAttribute('aria-label', `Remove item ${i}`)
        removeButton.setAttribute("type", "button");
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
<span>${value}</span>
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


// Accordion code

const accordionContainer = document.querySelector(".accordion-container");

accordionContainer.addEventListener("click", function (e) {
    const accordionHeader = e.target.closest(".accordion-header");
    const arrow = e.target.querySelector(".arrow");
    const accordionPanel = e.target.nextElementSibling;
    const accordionInner = accordionPanel.querySelector(".accordion-inner");
    if (accordionHeader) {
        accordionPanel.classList.toggle("is-open");
        if (accordionPanel.classList.contains("is-open")) {
            accordionHeader.setAttribute("aria-expanded", "true");
            arrow.classList.add("rotate-down");
            arrow.classList.remove("rotate-up");
            accordionInner.classList.remove("hidden");
        } else {
            accordionHeader.setAttribute("aria-expanded", "false");
            arrow.classList.add("rotate-up");
            arrow.classList.remove("rotate-down");
            accordionInner.classList.add("hidden");
        }
    }
});

// Clean file button
const saveBtn = document.querySelector('.save')
const settings = document.querySelector('.config')
const sidebarBtn = document.querySelector('.sibebar')
saveBtn.addEventListener('click', e => {
    body.classList.remove("is-open");
    sidebarBtn.parentNode.removeChild(sidebarBtn)
    settings.parentNode.removeChild(settings)
})

/// Table of contents
const heading2 = document.querySelectorAll("h2");
const heading2Array = [...heading2];
const heading3 = document.querySelectorAll("h3");
const heading3Array = [...heading3];
const firstHeading = heading2Array[0];
const contentsHeading = document.createElement("h2");
contentsHeading.textContent = "Contents";
contentsHeading.setAttribute('id', 'contentsHeading')
contentsHeading.classList.add("new-page");
const nav = document.createElement("nav");
nav.setAttribute("aria-labelledby", "contentsHeading");
const ol = document.createElement("ol");
const nestedOl = document.createElement("ol")
const siteContainer = document.querySelector(".site-container");
siteContainer.insertBefore(nav, firstHeading);
siteContainer.insertBefore(contentsHeading, nav);
nav.appendChild(ol);

let tocID = heading2Array.length;
heading2Array.forEach((heading) => {
    tocID++;
    let li = document.createElement("li");
    let headingValue = heading.textContent;
    ol.appendChild(li);
    li.innerHTML = `<a href="#toc${tocID}">${headingValue}</a>`;
    heading.setAttribute("id", `toc${tocID}`);
    heading.setAttribute("tabindex", "-1");
});
ol.insertAdjacentElement('beforeend', nestedOl);
heading3Array.forEach((heading) => {
    tocID++;
    let li = document.createElement("li");
    let headingValue = heading.textContent;
    nestedOl.appendChild(li)
    li.innerHTML = `<a href="#toc${tocID}">${headingValue}</a>`;
    heading.setAttribute("id", `toc${tocID}`);
    heading.setAttribute("tabindex", "-1");

});



