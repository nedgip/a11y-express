// Print button
const pBtn = document.querySelector(".print");
pBtn.addEventListener("click", function () {
  window.print();
});

// Sidebar menu
const menuBtn = document.querySelector("#menuBtn");
const body = document.body;
const container = document.querySelector("div.container");
if (container.classList.contains("edit")) {
  const offSiteContainer = body.querySelector(".off-site-container");
  const siteMenu = offSiteContainer.querySelector("#siteMenu");
  const closeSiteMenu = siteMenu.querySelector("#closeSiteMenu");
  const siteMenuListWrapper = siteMenu.querySelector(".menuListWrapper");

  // Menu button event listener
  menuBtn.addEventListener("click", (event) => {
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
  closeSiteMenu.addEventListener("click", (event) => {
    body.classList.remove("is-open");
    offSiteContainer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    // 	Return focus to the menu button
    menuBtn.focus();
  });

  // Add <ul> for good and bad lists
  const gListHeading = document.querySelector(".gl");
  const bListHeading = document.querySelector(".bl");
  const tListHeading = document.querySelector(".tl");
  const sListHeading = document.querySelector(".sl");
  const toListHeading = document.querySelector(".tol");
  const gList = document.createElement("ul");
  const bList = document.createElement("ul");
  const tList = document.createElement("ul");
  const sList = document.createElement("ul");
  const toList = document.createElement("ul");
  gList.classList.add("good-list");
  bList.classList.add("bad-list");
  tList.classList.add("technology-list");
  sList.classList.add("software-list");
  toList.classList.add("tool-list");
  gListHeading.insertAdjacentElement("afterend", gList);
  bListHeading.insertAdjacentElement("afterend", bList);
  tListHeading.insertAdjacentElement("afterend", tList);
  sListHeading.insertAdjacentElement("afterend", sList);
  toListHeading.insertAdjacentElement("afterend", toList);
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

  // Update button
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
        //         populate url link in content
        siteLink();
        getNumberOfSuccessCriteria();
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
  // Clear button
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
  const addListItemBtnArray = [...addListItemBtn];

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
        label.setAttribute("for", `${type}${i}`);
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
      updateButton.setAttribute("aria-label", `Update item ${i}`);
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
      removeButton.setAttribute("aria-label", `Remove item ${i}`);
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
          textarea.parentElement.setAttribute(
            "id",
            `${type}FieldContainer${i}`
          );

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

  addListItemBtnArray.forEach((lBtn) => {
    console.log(lBtn);
    lBtn.addEventListener("click", (btn) => {
      if (btn.target.classList.contains("good")) {
        const addGItem = new AddItem(btn, "good");
      } else if (btn.target.classList.contains("bad")) {
        const addBItem = new AddItem(btn, "bad");
      } else if (btn.target.classList.contains("technology")) {
        const addTItem = new AddItem(btn, "technology");
      } else if (btn.target.classList.contains("software")) {
        const addSItem = new AddItem(btn, "software");
      } else if (btn.target.classList.contains("tool")) {
        const addTOItem = new AddItem(btn, "tool");
      }
    });
  });

  // Accordion code

  const accordionContainer = document.querySelector(".accordion-container");

  accordionContainer.addEventListener("click", function (e) {
    const accordionHeader = e.target.closest(".accordion-header");
    const arrow = e.target.querySelector(".arrow");
    const accordionPanel = e.target.nextElementSibling;

    if (accordionHeader) {
      accordionPanel.classList.toggle("is-open");
      const accordionInner = accordionPanel.querySelector(".accordion-inner");
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
  const saveBtn = document.querySelector(".save");
  const settings = document.querySelector(".config");
  const sidebarBtn = document.querySelector(".sibebar");
  saveBtn.addEventListener("click", (e) => {
    body.classList.remove("is-open");
    sidebarBtn.parentNode.removeChild(sidebarBtn);
    settings.parentNode.removeChild(settings);
    container.classList.remove("edit");
    updateTitleWithProductName();
    body.removeAttribute("aria-disabled");
  });
}
// Table of contents
const headingArray = Array.prototype.slice.call(
  document.querySelectorAll(".h2, .h3, .h4")
);

let id = 0;
const tocContainer = document.querySelector(".toc-container");

function clearContents() {
  return (tocContainer.innerHTML = "");
}
function addContentsHeading() {
  return (tocContainer.innerHTML = '<h2 class="new-page">Contents</h2>');
}

function getPreviousHeading(heading) {
  const headingIndex = headingArray.indexOf(heading);
  const previousHeadingIndex = headingIndex - 1;
  return headingArray[previousHeadingIndex];
}

function getHeadingValue(heading) {
  return heading.textContent;
}

function getHeadingLevel(heading) {
  return heading.getAttribute("data-level");
}

function createNestedUl() {
  return document.createElement("ul");
}

function createListItem() {
  return document.createElement("li");
}
function addUl(parent, nestedUl) {
  return parent.appendChild(nestedUl);
}
function addChildListItemLink(parent, newListItem, textContent, id) {
  newListItem.classList.add("toc-link");
  newListItem.innerHTML = `<a href="#heading${id}">${textContent}</a>`;
  return parent.appendChild(newListItem);
}
function addSiblingListItemLink(sibling, newListItem, textContent, id) {
  newListItem.classList.add("toc-link");
  newListItem.innerHTML = `<a href="#heading${id}">${textContent}</a>`;
  return sibling.insertAdjacentElement("afterend", newListItem);
}
function calculateDifferenceBetweenHeadingLevels(previous, current) {
  return previous - current;
}

function getLastListItem() {
  const tocArray = Array.prototype.slice.call(
    document.querySelectorAll(".toc-link")
  );
  const indexOfPreviousLink = tocArray.length - 1;
  return tocArray[indexOfPreviousLink];
}

function loopThroughHeadingArray() {
  headingArray.forEach(function (heading) {
    id++;
    heading.setAttribute("id", `heading${id}`);
    const headingLevel = getHeadingLevel(heading);
    const previousHeading = getPreviousHeading(heading);

    if (!previousHeading) {
      const newListItemLink = createListItem();
      addChildListItemLink(toc, newListItemLink, getHeadingValue(heading), id);
    } else if (previousHeading) {
      const previousHeadingLevel = getHeadingLevel(previousHeading);

      if (previousHeadingLevel == headingLevel) {
        const newListItemLink = createListItem();
        const lastListItemLink = getLastListItem();
        addSiblingListItemLink(
          lastListItemLink,
          newListItemLink,
          getHeadingValue(heading),
          id
        );
      } else if (previousHeadingLevel < headingLevel) {
        const nestedUl = createNestedUl();
        const lastListItemLink = getLastListItem();
        addUl(lastListItemLink, nestedUl);
        const newListItemLink = createListItem();
        addChildListItemLink(
          nestedUl,
          newListItemLink,
          getHeadingValue(heading),
          id
        );
      } else if (previousHeadingLevel > headingLevel) {
        const difference = calculateDifferenceBetweenHeadingLevels(
          previousHeadingLevel,
          headingLevel
        );
        const newListItemLink = createListItem();
        const lastListItemLink = getLastListItem();
        if (difference > 1) {
          const previousUl = lastListItemLink.parentElement.parentElement.closest(
            "ul"
          );
          addSiblingListItemLink(
            previousUl,
            newListItemLink,
            getHeadingValue(heading),
            id
          );
        } else {
          const previousUl = lastListItemLink.parentElement.closest("ul");
          addSiblingListItemLink(
            previousUl,
            newListItemLink,
            getHeadingValue(heading),
            id
          );
        }
      }
    }
  });
}

clearContents();
addContentsHeading();
const tocUl = createNestedUl();
tocUl.setAttribute("id", "toc");
addUl(tocContainer, tocUl);
loopThroughHeadingArray();

// Filter
const searchField = document.querySelector("#issueFilter");
const resultStatus = document.querySelector("#resultStatus");
resultStatus.setAttribute("role", "status");
function searchFilter() {
  let filter = searchField.value.toLowerCase();
  const ul = document.querySelector(".issue-list");
  let li = document.querySelectorAll(".issue");
  let liArray = [...li];
  let noLi = liArray.length;

  liArray.forEach((issue) => {
    let query = issue.textContent;
    if (query.toLowerCase().indexOf(filter) > -1) {
      issue.style.display = "";
    } else {
      issue.style.display = "none";
      noLi--;
    }
    resultStatus.textContent = `${noLi} issues found for ${filter}`;
    if (filter === "") {
      resultStatus.textContent = "";
    }
  });
}

searchField.addEventListener("keyup", (event) => {
  searchFilter();
});

// Add an empty alt attribute to <img> tags to make them decorative.
const screenshots = document.querySelectorAll("img");
const screenshotArray = [...screenshots];
screenshotArray.forEach((screenshot) => {
  if (screenshot.hasAttribute("alt")) {
    return;
  }
  screenshot.setAttribute("alt", "");
});

// Update the page title
function updateTitleWithProductName() {
  const product = document.querySelector(".product").textContent;
  document.title = `Accessibility review of ${product}`;
}

/**
 * Handler to set multiple attributes
 * @param {HTMLElement} element to set attributes on
 * @param {HTMLObject} attributes as key value pairs e.g. setAttributes(textField,{"a":"b", x":"y"})
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (attribute) {
    element.setAttribute(attribute, attributes[attribute]);
  });
}

/**
 * Handler to remove multiple attributes
 * @param {HTMLElement} element to set attributes on
 * @param {HTMLObject} attributes
 */
function removeAttributes(element, attributes) {
  attributes.forEach(function (attribute) {
    element.removeAttribute(attribute);
  });
}

// Adds the href on page load to avoid internal link issues when saving file locally
document
  .querySelector("#skipToContentsHeading")
  .setAttribute("href", "#contentsHeading");
document.querySelector("#skipToTOC").setAttribute("href", "#toc10");
// Set focus on skip link targets
const skipLinks = Array.prototype.slice.call(
  document.querySelectorAll(".skip-link")
);
skipLinks.forEach(function (skipLink) {
  skipLink.addEventListener("click", function () {
    const skipTarget = skipLink.getAttribute("href");
    skipTarget.focus();
  });
});

// Updates the URL link href in page content when the URL field is populated.
function siteLink() {
  const siteURL = document.querySelector("#url").value;
  const siteLink = document.querySelector("#siteLink");
  if (siteURL.value !== "") {
    siteLink.setAttribute("href", siteURL);
  }
}

// Returns the total number of issues by type
function getNumberOfIssues() {
  // variables
  const issueArray = Array.prototype.slice.call(
    document.querySelectorAll(".issue")
  );
  const severityArray = Array.prototype.slice.call(
    document.querySelectorAll(".severity")
  );
  const typeArray = Array.prototype.slice.call(
    document.querySelectorAll(".type")
  );
  console.log(typeArray);
  // Functions

  /**
   * Gets the total number of issues
   * @return {Number} Number of issues in the report
   */
  function getTotalNumberOfIssues() {
    return issueArray.length;
  }

  /**
   * Displays the total number of issues
   * @param {Function} gets total number of issues
   */
  function displayTotalNumberOfIssuesReported(getTotalNumberOfIssues) {
    const total = document.querySelector(".total");
    total.textContent = getTotalNumberOfIssues();
  }

  /**
   * Adds a class to the issue detail li which is used to identify it to generate an array e.g. critical.
   * @param {Array} array of li which have specific class.
   * @return {String} Adds a class to the issue detail li, replaces any blank space with a - and makes it lower case.
   */
  function addDetailClassToIssue(array, detailValue) {
    array.forEach(function (detail) {
      if (detail.textContent === detailValue) {
        return detail.classList.add(
          detailValue.replace(/\s+/g, "-").toLowerCase()
        );
      }
    });
  }

  /**
   * Counts how many items in the array that have a specific class e.g. critical.
   * @param {String} the class which is used to identify the li.
   * @return {Number} Number of issues which have the class passed in the param.
   */
  function countDetail(detailClass) {
    let detailArray = Array.prototype.slice.call(
      document.querySelectorAll(`.${detailClass}`)
    );
    return detailArray.length;
  }

  /**
   * Displays the total number of issues with a specific detail e.g. critical.
   * @param {String} the class which is used to identify the li.
   * @param {Function} Function which counts how many issues are in the array.
   */
  function displayTotalNumberOfDetail(detailClass, countDetail) {
    const detailValue = document.querySelector(`.${detailClass}-issues`);
    console.log(`.${detailClass}-issues`);
    console.log(detailClass);
    console.log(detailValue);
    detailValue.textContent = countDetail(detailClass);
  }

  /**
   * Gets the total number of issues from the issue detail e.g severity.
   * @param {Array} The array to search for the specified class.
   * @param {String} The text value of the li.
   * @param {String} The class used to identify the li.
   */
  function getTotalNumberFromDetail(array, detailValue, detailClass) {
    addDetailClassToIssue(array, detailValue);
    displayTotalNumberOfDetail(detailClass, countDetail);
  }

  displayTotalNumberOfIssuesReported(getTotalNumberOfIssues);
  getTotalNumberFromDetail(typeArray, "WCAG 2", "wcag-2");
  getTotalNumberFromDetail(
    typeArray,
    "Expert observation",
    "expert-observation"
  );
  getTotalNumberFromDetail(severityArray, "Critical", "critical");
  getTotalNumberFromDetail(severityArray, "High", "high");
  getTotalNumberFromDetail(severityArray, "Medium", "medium");
  getTotalNumberFromDetail(severityArray, "Low", "low");
}
getNumberOfIssues();

// Gets the number of SC tested dependent on WCAG version and level selected.
function getNumberOfSuccessCriteria() {
  //   variables
  const wcagVersion = document.querySelector("#wcag");
  const wcagLevel = document.querySelector("#level");
  const numberOfSC = document.querySelector(".number-of-sc");

  //   Functions set the number of Success Criteria that were tested.
  function numberOfSuccessCriteriaTestedForWCAG21AA() {
    return 50;
  }
  function numberOfSuccessCriteriaTestedForWCAG21A() {
    return 30;
  }
  function numberOfSuccessCriteriaTestedForWCAG20AA() {
    return 38;
  }
  function numberOfSuccessCriteriaTestedForWCAG20A() {
    return 25;
  }
  function numberOfSuccessCriteriaTestedForWCAG20AAA() {
    return 61;
  }
  function numberOfSuccessCriteriaTestedForWCAG21AAA() {
    return 78;
  }

  //   Functions which display the success crtieria that were tested.
  function resetSuccessCriteriaInSummaryOfFinding() {
    let arrayOfSC = Array.prototype.slice.call(
      document.querySelectorAll(".summary-of-findings tr")
    );
    arrayOfSC.forEach(function (row) {
      row.classList.remove("hidden");
    });
  }
  function hideSuccessCriteria(sc) {
    resetSuccessCriteriaInSummaryOfFinding();
    let arrayOfSC = Array.prototype.slice.call(document.querySelectorAll(sc));
    arrayOfSC.forEach(function (row) {
      return row.classList.add("hidden");
    });
  }

  numberOfSC.classList.remove("editable");

  if (wcagVersion.value === "WCAG 2.1" && wcagLevel.value === "A & AA") {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG21AA();
    let wcagVersionLevelClass = ".AAA";
    hideSuccessCriteria(wcagVersionLevelClass);
  } else if (wcagVersion.value === "WCAG 2.1" && wcagLevel.value === "A") {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG21A();
    let wcagVersionLevelClass = ".AA , .AAA";
    hideSuccessCriteria(wcagVersionLevelClass);
  } else if (wcagVersion.value === "WCAG 2.0" && wcagLevel.value === "A & AA") {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG20AA();
    let wcagVersionLevelClass = ".wcag-21, .AAA";
    hideSuccessCriteria(wcagVersionLevelClass);
  } else if (wcagVersion.value === "WCAG 2.0" && wcagLevel.value === "A") {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG20A();
    let wcagVersionLevelClass = ".wcag-21 , .AA , .AAA";
    hideSuccessCriteria(wcagVersionLevelClass);
  } else if (
    wcagVersion.value === "WCAG 2.1" &&
    wcagLevel.value === "A & AA & AAA"
  ) {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG21AAA();
    resetSuccessCriteriaInSummaryOfFinding();
  } else if (
    wcagVersion.value === "WCAG 2.0" &&
    wcagLevel.value === "A & AA & AAA"
  ) {
    numberOfSC.textContent = numberOfSuccessCriteriaTestedForWCAG20AAA();
    let wcagVersionLevelClass = ".wcag-21";
    hideSuccessCriteria(wcagVersionLevelClass);
  }
}

// Check for Success Criteria in issue list
const successCriteriaArray = Array.prototype.slice.call(
  document.querySelectorAll(".success-criteria")
);
successCriteriaArray.forEach(function (sc) {
  let scValue = sc.textContent;
  loopThroughSummaryOfFindings(scValue);
});

function loopThroughSummaryOfFindings(scValue) {
  let arrayOfSC = Array.prototype.slice.call(
    document.querySelectorAll(".summary-of-findings tr")
  );
  arrayOfSC.forEach(function (row) {
    let rowSC = row.firstElementChild;
    let rowTextValue = rowSC.textContent;
    if (scValue.indexOf(rowTextValue) !== -1) {
      return (row.querySelector(".res").textContent = "Fail");
    }
  });
}
