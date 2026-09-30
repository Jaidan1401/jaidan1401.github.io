const projectList = document.getElementById("projectShowcase");
const template = document.getElementById("projectTemplate");

const filterText = document.getElementById("filterText");

let filter = "";

function SetFilter(toSet) {
    filter = toSet;
    
    if (filter === "") {
        filterText.textContent = "Filter: None";
    } else {
        filterText.textContent = "Filter: " + toSet;
    }
    
    DisplayProjects();
}

// Split off so both DisplayProjects and DisplayFeaturedProjects can use this code
function CreatePreview(data, canClick) {
    // Set up the project preview
    const projectDisplay = template.content.cloneNode(true);
    projectDisplay.querySelector(".projectPreviewName").textContent = data.name;
    projectDisplay.querySelector(".projectPreviewButton").href = data.link;
    projectDisplay.querySelector(".projectPreviewImage").src = data.preview;
    projectDisplay.querySelector(".projectPreviewImage").poster = data.poster;

    // Set up tags & listeners for said tags
    const tagEngine = projectDisplay.querySelector(".projectPreviewEngine")
    tagEngine.textContent = data.tags[0];
    if (canClick) tagEngine.addEventListener("click",() => SetFilter(tagEngine.textContent));
    const tagLanguage = projectDisplay.querySelector(".projectPreviewLanguage");
    tagLanguage.textContent = data.tags[1];
    if (canClick) tagLanguage.addEventListener("click",() => SetFilter(tagLanguage.textContent));
    const tagDimension = projectDisplay.querySelector(".projectPreviewDimension");
    tagDimension.textContent = data.tags[2];
    if (canClick) tagDimension.addEventListener("click",() => SetFilter(tagDimension.textContent));

    // Autoplay the preview videos when hovering over theme
    const video = projectDisplay.querySelector("video");
    video.addEventListener("mouseenter", () => {
        video.play();
    });
    video.addEventListener("mouseleave", () => {
        video.pause();
    });

    projectList.appendChild(projectDisplay);
}

// Displays ALL projects with filtering capabilities, intended for the main projects page
function DisplayProjects() {
    // Clear out the showcase container of any existing projects
    for (const project of [...projectList.children]) {
        if (project.classList.contains("projectPreview")) {
            project.remove();
        }
    }
    
    // Grab the projects that need displaying and create a preview for them
    let projectCount = 0;
    for (const id in projects) {
        const data = projects[id];
        
        if (filter === "" || (data.tags.includes(filter))) {
            CreatePreview(data, true);
            projectCount++;
        }
    }
    filterText.textContent = filterText.textContent + " (" + projectCount + ")";
}
// Displays manually selected FEATURED projects with NO filtering capabilities, intended for the home page
function DisplayFeaturedProjects() {
    // Clear out the showcase container of any existing projects
    const projectsToDisplay = projectList.querySelectorAll("[data-project]");

    // Grab the projects that need displaying and create a preview for them
    for (const project of projectsToDisplay) {
        const id = project.dataset.project;
        const data = projects[id];
        CreatePreview(data, false);
        
        project.remove();
    }
}

// Rough fix to get both featured projects and all projects to work, might be redone later
if (document.getElementById("resetFilter") == null) {
    DisplayFeaturedProjects();
} else {
    document.getElementById("resetFilter").addEventListener("click", () => SetFilter(""));
    DisplayProjects();
}