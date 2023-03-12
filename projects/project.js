const SERVER_URL = 'https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects';

window.onload = () => {
    //get uuid from project
    function _getProjectId() {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop)
        })

        return params.uuid;
    }

    // select dom elements

    const $projectTitle = document.querySelector('h1');
    const $projectType = document.querySelector('#projectType');
    const $projectDate = document.querySelector('#projectData span');
    const $projectImg = document.querySelector('#projectImg');
    const $projectImgBlur = document.querySelector('#projectImgBlur');
    const $projectDescription = document.querySelector('#projectDescription p');

    // fetch API

    async function fetchProjects () {
        try {
            const response = await fetch(SERVER_URL);
            const data = await response.json();
            const [project] = data.filter(proj => proj.uuid === _getProjectId())
            console.log(project)

            //assign project values to DOM elements
            $projectTitle.textContent = project.name; 
            $projectType.textContent = project.description;
            $projectDate.textContent = project.completed_on;
            $projectImg.src = project.image;
            $projectImgBlur.src = project.image;
            $projectDescription.textContent = project.content;

        } catch(err) {
            console.log(err);
        }
    }

    fetchProjects();

}