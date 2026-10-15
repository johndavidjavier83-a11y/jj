
/* =========================================
   ACADEMIC WORKS
   =========================================
   Put your files inside the "files" folder.
   Add each file to the academicWorks array.
   This version does not use a database.
========================================= */

const academicWorks = [
    // QUIZ
    {
        category: "quiz",
        title: "Quiz 1",
        description: "My first quiz for this subject.",
        file: "files/quiz1.jpeg.JPG",
        type: "image"
    },
    {
        category: "quiz",
        title: "Quiz 2",
        description: "My second quiz.",
        file: "files/QUIZ2.jpeg.JPG",
        type: "image"
    },
    {
        category: "quiz",
        title: "Quiz 3",
        description: "My third quiz for this subject.",
        file: "files/Quiz3.jpeg.jpg",
        type: "image"
    },

    // LONG QUIZ
    {
        category: "longquiz",
        title: "Long Quiz 1",
        description: "My long quiz.",
        file: "files/LongQuiz1.jpg.jpg",
        type: "image"
    },

    // MIDTERMS
    {
        category: "midterms",
        title: "Midterm Examination",
        description: "My midterm examination.",
        file: "files/Midterms.jpg",
        type: "image"
    },

    // FINALS
    {
        category: "finals",
        title: "Final Examination",
        description: "My final examination.",
        file: "files/finals.jpg",
        type: "image"
    },

    // ACTIVITIES
    {
        category: "activities",
        title: "Activity 1",
        description: "My academic activity.",
        file: "files/DCIT 26_ Activity 1.docx (1).pdf",
        type: "pdf"
    },
    {
        category: "activities",
        title: "Activity 2",
        description: "My academic activity.",
        file: "files/DCIT26_ Act 2.docx (1).pdf",
        type: "pdf"
    },

    // PROJECTS
    {
        category: "projects",
        title: "Project 1",
        description: "My academic project.",
        file: "files/project1.jpg",
        type: "image"
    },
    {
        category: "projects",
        title: "Project Documentation",
        description: "My project documentation.",
        file: "files/project1.pdf",
        type: "pdf"
    }
];


/* =========================================
   HTML ELEMENTS
========================================= */

const container = document.getElementById("works-container");
const buttons = document.querySelectorAll(".category");

const viewer = document.getElementById("viewer");
const viewerBody = document.getElementById("viewerBody");
const closeViewerButton =
    document.getElementById("closeViewer");


/* =========================================
   DISPLAY ACADEMIC WORKS
========================================= */

function displayWorks(category) {
    if (!container) {
        console.error(
            'Missing HTML element: id="works-container".'
        );
        return;
    }

    container.innerHTML = "";

    const filteredWorks = academicWorks.filter(
        work => work.category === category
    );

    if (filteredWorks.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty";

        const heading = document.createElement("h3");
        heading.textContent = "No works yet";

        const message = document.createElement("p");
        message.textContent =
            "No academic works are available in this category.";

        empty.append(heading, message);
        container.appendChild(empty);
        return;
    }

    filteredWorks.forEach(work => {
        const card = document.createElement("div");
        card.className = "work-card";

        // FILE PREVIEW
        const preview = document.createElement("div");
        preview.className = "work-preview";

        if (work.type === "image") {
            const img = document.createElement("img");

            img.src = work.file;
            img.alt = work.title;
            img.loading = "lazy";

            img.addEventListener("click", () => {
                openViewer(work.file, work.type);
            });

            img.addEventListener("error", () => {
                img.style.display = "none";

                const error = document.createElement("p");
                error.className = "file-label";
                error.textContent =
                    "Image not found. Check the file path.";

                preview.appendChild(error);
            });

            preview.appendChild(img);

        } else if (work.type === "pdf") {
            const icon = document.createElement("div");
            icon.className = "file-icon";
            icon.textContent = "📄";

            const label = document.createElement("p");
            label.className = "file-label";
            label.textContent = "PDF Document";

            preview.append(icon, label);
            preview.style.cursor = "pointer";

            preview.addEventListener("click", () => {
                openViewer(work.file, work.type);
            });

        } else {
            const icon = document.createElement("div");
            icon.className = "file-icon";
            icon.textContent = "📁";

            const label = document.createElement("p");
            label.className = "file-label";
            label.textContent = "File attachment";

            preview.append(icon, label);
        }

        // WORK INFORMATION
        const info = document.createElement("div");
        info.className = "work-info";

        const title = document.createElement("h3");
        title.textContent = work.title;

        const description = document.createElement("p");
        description.textContent = work.description;

        const viewButton = document.createElement("button");
        viewButton.className = "view-button";
        viewButton.type = "button";
        viewButton.textContent = "View Work";

        viewButton.addEventListener("click", () => {
            openViewer(work.file, work.type);
        });

        const downloadLink = document.createElement("a");
        downloadLink.href = work.file;
        downloadLink.download = "";
        downloadLink.className = "download-button";
        downloadLink.textContent = "Download File";

        // Check whether the file exists when clicked.
        downloadLink.addEventListener("click", event => {
            if (!work.file) {
                event.preventDefault();
                console.error("The file path is missing.");
            }
        });

        info.append(
            title,
            description,
            viewButton,
            downloadLink
        );

        card.append(preview, info);
        container.appendChild(card);
    });
}


/* =========================================
   CATEGORY BUTTONS
========================================= */

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        if (!category) {
            console.warn(
                "Category button is missing data-category:",
                button
            );
            return;
        }

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        displayWorks(category);
    });
});


/* =========================================
   OPEN FILE VIEWER
========================================= */

function openViewer(file, type) {
    if (!viewer || !viewerBody) {
        console.error(
            "Viewer elements are missing from the HTML."
        );
        return;
    }

    viewerBody.innerHTML = "";

    if (type === "image") {
        const img = document.createElement("img");
        img.src = file;
        img.alt = "Academic work preview";

        img.addEventListener("error", () => {
            const error = document.createElement("p");
            error.className = "viewer-error";
            error.textContent =
                "Image could not be loaded. Check the file path.";

            viewerBody.replaceChildren(error);
        });

        viewerBody.appendChild(img);

    } else if (type === "pdf") {
        const iframe = document.createElement("iframe");

        iframe.src = file;
        iframe.title = "Academic Document";
        iframe.loading = "lazy";

        viewerBody.appendChild(iframe);

    } else {
        const message = document.createElement("div");
        message.className = "viewer-file-message";

        const text = document.createElement("p");
        text.textContent =
            "This file may not support browser preview.";

        const link = document.createElement("a");
        link.href = file;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open File";

        message.append(text, link);
        viewerBody.appendChild(message);
    }

    viewer.classList.add("show");
    viewer.setAttribute("aria-hidden", "false");

    if (closeViewerButton) {
        closeViewerButton.focus();
    }
}


/* =========================================
   CLOSE FILE VIEWER
========================================= */

function hideViewer() {
    if (!viewer || !viewerBody) return;

    viewer.classList.remove("show");
    viewer.setAttribute("aria-hidden", "true");
    viewerBody.innerHTML = "";
}

if (closeViewerButton) {
    closeViewerButton.addEventListener(
        "click",
        hideViewer
    );
}

// Close when clicking outside the viewer content.
if (viewer) {
    viewer.addEventListener("click", event => {
        if (event.target === viewer) {
            hideViewer();
        }
    });
}

// Close when pressing Escape.
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideViewer();
    }
});


/* =========================================
   INITIALIZE WEBSITE
========================================= */

const defaultCategoryButton =
    document.querySelector(
        '.category[data-category="quiz"]'
    ) || buttons[0];

if (defaultCategoryButton) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    defaultCategoryButton.classList.add("active");

    displayWorks(
        defaultCategoryButton.dataset.category || "quiz"
    );
} else {
    displayWorks("quiz");
}
