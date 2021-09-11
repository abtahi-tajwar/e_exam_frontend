// To create matching height and width of element
var match_height = document.querySelectorAll(".match_height");
if(match_height.length !== 0) {
    match_height.forEach(elem => {
        elem.style.height = elem.clientWidth + "px"
    })
}
////////////////////