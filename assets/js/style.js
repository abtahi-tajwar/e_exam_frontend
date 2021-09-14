// To create matching height and width of element
var match_height = document.querySelectorAll(".match_height");
if(match_height.length !== 0) {
    match_height.forEach(elem => {
        elem.style.height = elem.clientWidth + "px"
    })
}
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
var leftSlideInDoms = document.querySelectorAll(".left-slide-in, .right-slide-in")
var rectTop = []  
leftSlideInDoms.forEach(item => {
    customOffset = item.getAttribute('data-animation-offset-top')
    if(customOffset !== null) {
        rectTop.push(offset(item).top - customOffset + 50)
    } else {
        rectTop.push(offset(item).top - window.innerHeight + 50)
    }
    
})  
window.addEventListener('scroll', () => {
    leftSlideInDoms.forEach((item, index) => {
        // console.log(rectTop, window.scrollY)
        if(window.scrollY >= rectTop[index]) {
            item.classList.remove('hide')
        } else if(window.scrollY < rectTop[index] && !item.classList.contains('hide') ){
            item.classList.add('hide')
        }
    })
    
    
})

////////////////////