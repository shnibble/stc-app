export function scrollMainToTop() {
    const main = document.getElementsByTagName('main')[0]
    const c = main.scrollTop
    if (c > 0) {
        window.requestAnimationFrame(scrollMainToTop)
        main.scrollTo(0, c - c / 8)
    }
}