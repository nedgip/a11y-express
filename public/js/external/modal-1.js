// Variables
const main = document.querySelector("#main");
const modalButton = main.querySelector("#modalBtn");
const modal = document.querySelector("#modal");
const modalWrapper = document.querySelector("#modalWrapper");
const closeButton = modal.querySelector("#closeBtn");
const focusableElements = Array.prototype.slice.call(
    main.querySelectorAll("button,a[href]")
);

// Open modal
modalButton.addEventListener("click", function () {
    modal.classList.remove("hidden");
    modalWrapper.classList.remove("hidden");
    main.setAttribute('aria-hidden', 'true')
    trapFocus();
    modal.focus();
});

// Close modal
function close() {
    modal.classList.add("hidden");
    modalWrapper.classList.add("hidden");
    main.removeAttribute('aria-hidden')
    releaseFocus();
    modalButton.focus();

}

// Trap focus inside modal
function trapFocus() {
    focusableElements.forEach(function (e) {
        e.setAttribute('tabindex', '-1');
    });
}

// Release focus from modal
function releaseFocus() {
    focusableElements.forEach(function (e) {
        e.removeAttribute('tabindex');
    });
}

// Close modal button 
closeButton.addEventListener("click", function () {
    close();
});

// Close when click outside of modal
modalWrapper.addEventListener("click", function () {
    close();
});
