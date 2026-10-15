
/* =========================================
   ACADEMIC WORKS
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
        description: "Long Quiz academic work.",
        file: "files/LongQuiz1.jpg.jpg",
        type: "image"
    },

    // MIDTERMS
    {
        category: "midterms",
        title: "Midterm Examination",
        description: "My Midterm Examination.",
        file: "files/Midterms.jpg",
        type: "image"
    },

    // FINALS
    {
        category: "finals",
        title: "Final Examination",
        description: "My Final Examination.",
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
        description: "Project documentation.",
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
const closeViewerButton = document.getElementById("closeViewer");


/* =========================================
   DISPLAY WORKS
========================================= */

function displayWorks(category) {

    if (!container) {
        console.error('Missing element: works-container');
        return;
    }

    container.innerHTML = "";

    const filteredWorks = academicWorks.filter(
        work => work.category === category
    );

    if (filteredWorks.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h3>No works yet</h3>
                <p>Add your academic work in script.js.</p>
            </div>
        `;
        return;
    }

    filteredWorks.forEach(work => {

        const card = document.createElement("div");
        card.className = "work-card";

        const preview = document.createElement("div");
        preview.className = "work-preview";

        if (work.type === "image") {

            const img = document.createElement("img");
            img.src = work.file;
            img.alt = work.title;
            img.loading = "lazy";

            img.onerror = () => {
                img.style.display = "none";

                const error = document.createElement("p");
                error.className = "file-label";
                error.textContent = "Image not found. Check the file path.";

                preview.appendChild(error);
            };

            img.addEventListener("click", () => {
                openViewer(work.file, work.type);
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

        const info = document.createElement("div");
        info.className = "work-info";

        const title = document.createElement("h3");
        title.textContent = work.title;

        const description = document.createElement("p");
        description.textContent = work.description;

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.className = "view-button";
        viewButton.textContent = "View Work";

        viewButton.addEventListener("click", () => {
            openViewer(work.file, work.type);
        });

        const downloadLink = document.createElement("a");
        downloadLink.href = work.file;
        downloadLink.download = "";
        downloadLink.className = "download-button";
        downloadLink.textContent = "Download File";

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

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayWorks(button.dataset.category);
    });
});


/* =========================================
   OPEN IMAGE OR PDF VIEWER
========================================= */

function openViewer(file, type) {

    if (!viewer || !viewerBody) return;

    viewerBody.innerHTML = "";

    if (type === "image") {

        const img = document.createElement("img");
        img.src = file;
        img.alt = "Academic work preview";

        img.onerror = () => {
            viewerBody.innerHTML = `
                <p class="viewer-error">
                    Image could not be loaded.
                    Check the filename and file path.
                </p>
            `;
        };

        viewerBody.appendChild(img);

    } else if (type === "pdf") {

        const iframe = document.createElement("iframe");
        iframe.src = file;
        iframe.title = "Academic Document";

        viewerBody.appendChild(iframe);

    } else {

        const link = document.createElement("a");
        link.href = file;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open File";

        viewerBody.appendChild(link);
    }

    viewer.classList.add("show");
    viewer.setAttribute("aria-hidden", "false");
}


/* =========================================
   CLOSE VIEWER
========================================= */

function hideViewer() {

    if (!viewer || !viewerBody) return;

    viewer.classList.remove("show");
    viewer.setAttribute("aria-hidden", "true");
    viewerBody.innerHTML = "";
}

if (closeViewerButton) {
    closeViewerButton.addEventListener("click", hideViewer);
}

/* =========================================
   ACADEMIC WORKS
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
        description: "Long Quiz academic work.",
        file: "files/LongQuiz1.jpg.jpg",
        type: "image"
    },

    // MIDTERMS
    {
        category: "midterms",
        title: "Midterm Examination",
        description: "My Midterm Examination.",
        file: "files/Midterms.jpg",
        type: "image"
    },

    // FINALS
    {
        category: "finals",
        title: "Final Examination",
        description: "My Final Examination.",
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
        description: "Project documentation.",
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
const closeViewerButton = document.getElementById("closeViewer");


/* =========================================
   DISPLAY WORKS
========================================= */

function displayWorks(category) {

    if (!container) {
        console.error('Missing element: works-container');
        return;
    }

    container.innerHTML = "";

    const filteredWorks = academicWorks.filter(
        work => work.category === category
    );

    if (filteredWorks.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h3>No works yet</h3>
                <p>Add your academic work in script.js.</p>
            </div>
        `;
        return;
    }

    filteredWorks.forEach(work => {

        const card = document.createElement("div");
        card.className = "work-card";

        const preview = document.createElement("div");
        preview.className = "work-preview";

        if (work.type === "image") {

            const img = document.createElement("img");
            img.src = work.file;
            img.alt = work.title;
            img.loading = "lazy";

            img.onerror = () => {
                img.style.display = "none";

                const error = document.createElement("p");
                error.className = "file-label";
                error.textContent = "Image not found. Check the file path.";

                preview.appendChild(error);
            };

            img.addEventListener("click", () => {
                openViewer(work.file, work.type);
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

        const info = document.createElement("div");
        info.className = "work-info";

        const title = document.createElement("h3");
        title.textContent = work.title;

        const description = document.createElement("p");
        description.textContent = work.description;

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.className = "view-button";
        viewButton.textContent = "View Work";

        viewButton.addEventListener("click", () => {
            openViewer(work.file, work.type);
        });

        const downloadLink = document.createElement("a");
        downloadLink.href = work.file;
        downloadLink.download = "";
        downloadLink.className = "download-button";
        downloadLink.textContent = "Download File";

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

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayWorks(button.dataset.category);
    });
});


/* =========================================
   OPEN IMAGE OR PDF VIEWER
========================================= */

function openViewer(file, type) {

    if (!viewer || !viewerBody) return;

    viewerBody.innerHTML = "";

    if (type === "image") {

        const img = document.createElement("img");
        img.src = file;
        img.alt = "Academic work preview";

        img.onerror = () => {
            viewerBody.innerHTML = `
                <p class="viewer-error">
                    Image could not be loaded.
                    Check the filename and file path.
                </p>
            `;
        };

        viewerBody.appendChild(img);

    } else if (type === "pdf") {

        const iframe = document.createElement("iframe");
        iframe.src = file;
        iframe.title = "Academic Document";

        viewerBody.appendChild(iframe);

    } else {

        const link = document.createElement("a");
        link.href = file;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open File";

        viewerBody.appendChild(link);
    }

    viewer.classList.add("show");
    viewer.setAttribute("aria-hidden", "false");
}


/* =========================================
   CLOSE VIEWER
========================================= */

function hideViewer() {

    if (!viewer || !viewerBody) return;

    viewer.classList.remove("show");
    viewer.setAttribute("aria-hidden", "true");
    viewerBody.innerHTML = "";
}

if (closeViewerButton) {
    closeViewerButton.addEventListener("click", hideViewer);
}

if (viewer) {

    viewer.addEventListener("click", event => {
        if (event.target === viewer) {
            hideViewer();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideViewer();
    }
});


/* =========================================
   LOAD QUIZ BY DEFAULT
========================================= */

const quizButton = document.querySelector(
    '.category[data-category="quiz"]'
);

if (quizButton) {
    quizButton.classList.add("active");
}

displayWorks("quiz");

if (viewer) {

    viewer.addEventListener("click", event => {
        if (event.target === viewer) {
            hideViewer();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideViewer();
    }
});


/* =========================================
   LOAD QUIZ BY DEFAULT
========================================= */

const quizButton = document.querySelector(
    '.category[data-category="quiz"]'
);

if (quizButton) {
    quizButton.classList.add("active");
}

displayWorks("quiz");
