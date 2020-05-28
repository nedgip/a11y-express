const printBtn = document.querySelector('.print')

printBtn.addEventListener('click', () => {
    window.print()
})

var paramsString = "edit=true";
var searchParams = new URLSearchParams(paramsString);


if (searchParams.has("edit") === true) {
    console.log = "yay"
} else {
    console.log("nay")
}