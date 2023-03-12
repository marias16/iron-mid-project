const SERVER_URL = 'https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects';

window.onload = () => {
    function _getProjectTitleOnURL() {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop)
        })
    }

}