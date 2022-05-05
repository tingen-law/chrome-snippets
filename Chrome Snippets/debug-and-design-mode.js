// Edit the website in a "hot" setting without links and with design mode on.

// Disable anchor links
window.addEventListener('click', event => event.preventDefault(), false)
// Disable click eventlisteners
window.addEventListener("click", event => event.stopPropagation(), true)
// Enable design mode
document.designMode = "on"
