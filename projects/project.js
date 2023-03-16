const SERVER_URL = 'https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects';

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

            //assign project values to DOM elements
            $projectTitle.textContent = project.name; 
            $projectType.textContent = project.description;
            $projectDate.textContent = project.completed_on;
            $projectImg.src = project.image;
            $projectImgBlur.src = project.image;
            $projectDescription.innerHTML = project.content;
            document.title = `Circle - ${project.name}`;

        } catch(err) {
            console.log(err);
        }
    }

    fetchProjects();

    // randomize project section 
    async function fetchProjectsSection() {
        try {
            const response = await fetch(SERVER_URL);
            let data = await response.json();
            data.sort((a, b) => 0.5 - Math.random());
            //select dom elements
            const $projectImg = document.querySelectorAll('.projectsCardImg');
            const $projectTitle = document.querySelectorAll('.projectTitle');
            const $projectDescription = document.querySelectorAll('.projectDescription');
            const $projectURL = document.querySelectorAll('.projectsCard a');
            console.log(data);

            //assign each data element to DOM elements, just three elements have to show up
            //for the project page, the project cant show up in the section 'Other Projects'
            const dataFiltered = data.filter(project => project.uuid !== _getProjectId())
            console.log(dataFiltered)
            for(let i=0; i<= (dataFiltered.length-1); i++) {
                $projectImg[i].src = dataFiltered[i].image;
                $projectTitle[i].innerHTML = dataFiltered[i].name;
                $projectDescription[i].innerHTML = dataFiltered[i].description;
                $projectURL[i].href = `/projects/projects.html?uuid=${dataFiltered[i].uuid}`;

            }
        } catch(err) {
            console.error(err)
        }
    }

    fetchProjectsSection()









