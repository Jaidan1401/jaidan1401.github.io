const projectList = document.getElementById("projectShowcase");
const template = document.getElementById("projectTemplate");

const projectsToDisplay = projectList.querySelectorAll("[data-project]");
for (const project of projectsToDisplay) {
    const id = project.dataset.project;
    const data = projects[id];

    const projectDisplay = template.content.cloneNode(true);
    projectDisplay.querySelector(".projectPreviewName").textContent = data.name;
    projectDisplay.querySelector(".projectPreviewButton").href = data.link;
    projectDisplay.querySelector(".projectPreviewImage").src = data.preview;
    projectDisplay.querySelector(".projectPreviewImage").poster = data.poster;
    projectDisplay.querySelector(".projectPreviewEngine").textContent = data.tags[0];
    projectDisplay.querySelector(".projectPreviewLanguage").textContent = data.tags[1];
    projectDisplay.querySelector(".projectPreviewDimension").textContent = data.tags[2];

    const video = projectDisplay.querySelector("video");
    video.addEventListener("mouseenter", () => {
        video.play();
    });
    video.addEventListener("mouseleave", () => {
        video.pause();
    });
    
    projectList.appendChild(projectDisplay);
    project.remove();
}