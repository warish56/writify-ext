


const injectStylesheet = () => {
    // Inject styles
    const styleElement = document.createElement('style')
    styleElement.textContent = AppStyles;
    document.head.appendChild(styleElement)
}




window.addEventListener('load',() => {
    injectStylesheet();
})
