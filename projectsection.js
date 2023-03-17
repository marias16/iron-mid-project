  // randomize project section 
  async function fetchProjectsSection() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects');
        let data = await response.json();
        data.sort((a, b) => 0.5 - Math.random());

        //select dom elements
        const projectImg = document.querySelectorAll('.projectsCardImg');
        const projectTitle = document.querySelectorAll('.projectTitle');
        const projectDescription = document.querySelectorAll('.projectDescription');
        const projectURL = document.querySelectorAll('.projectsCard a');

        //assign each data element to DOM elements, just three elements have to show up
        for(let i=0; i<=2; i++) {
            projectImg[i].src = data[i].image;
            projectTitle[i].innerHTML = data[i].name;
            projectDescription[i].innerHTML = data[i].description;
            projectURL[i].href = `/projects/projects.html?uuid=${data[i].uuid}`;
        }
    } catch(err) {
        console.error(err)
    }
}

fetchProjectsSection()
