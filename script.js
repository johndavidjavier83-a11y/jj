
/* =========================================
   ACADEMIC WORKS
   =========================================

   HOW TO ADD YOUR WORK:
   1. Put your files inside the "files" folder.
   2. Add a new object to academicWorks.
   3. Set title, description, file, type, and category.

   IMPORTANT:
   There is NO DATABASE.
   You are the only person who edits this list.
*/


/* =========================================
   ACADEMIC WORKS DATA
========================================= */

const academicWorks = [

    /* ==============================
       QUIZ
    ============================== */

    {
        category: "quiz",
        title: "Quiz 1",
        description: "My first quiz for this subject.",
        file: "quiz1.jpeg.JPG",
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


    /* ==============================
       LONG QUIZ
    ============================== */

    {
        category: "longquiz",
        title: "Long Quiz 1",
        description: "Long Quiz academic work.",
        file: "files/LongQuiz1.jpg.jpg",
        type: "image"
    },


    /* ==============================
       MIDTERMS
    ============================== */

    {
        category: "midterms",
        title: "Midterm Examination",
        description: "My Midterm Examination.",
        file: "files/Midterms.jpg",
        type: "image"
    },


    /* ==============================
       FINALS
    ============================== */

    {
        category: "finals",
        title: "Final Examination",
        description: "My Final Examination.",
        file: "files/finals.jpg",
        type: "image"
    },


    /* ==============================
       ACTIVITIES
    ============================== */

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


    /* ==============================
       PROJECTS
    ============================== */

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
   CHECK REQUIRED HTML ELEMENTS
========================================= */

if (!container) {
    console.error(
        'Missing HTML element: id="works-container".'
    );
}

if (!viewer || !viewerBody || !closeViewerButton) {
    console.error(
        "Viewer elements are missing. Check viewer, viewerBody, and closeViewer in your HTML."
    );
}


/* =========================================
   DISPLAY WORKS
========================================= */

function displayWorks(category) {

    if (!container) return;

    container.innerHTML = "";

    const filteredWorks = academicWorks.filter(
        work => work.category === category
    );

    if (filteredWorks.length === 0) {

        container.innerHTML = `
            <div class="empty">
                <h3>No works yet</h3>
                <p>
                    No academic works are available
                    in this category.
                </p>
            </div>
        `;

        return;
    }

    filteredWorks.forEach(work => {

        const card = document.createElement("div");
        card.className = "work-card";

        /* WORK PREVIEW */

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
                img.alt = "Image could not be loaded";
                img.style.display = "none";

                const errorMessage = document.createElement("p");
                errorMessage.className = "file-label";
                errorMessage.textContent =
                    "Image not found. Check the file path.";

                preview.appendChild(errorMessage);
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


        /* WORK INFORMATION */

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

        const category = button.dataset.category;

        displayWorks(category);

    });

});


/* =========================================
   OPEN VIEWER
========================================= */

function openViewer(file, type) {

    if (!viewer || !viewerBody) return;

    viewerBody.innerHTML = "";

    if (type === "image") {

        const img = document.createElement("img");

        img.src = file;
        img.alt = "Academic work preview";

        img.addEventListener("error", () => {
            viewerBody.innerHTML = `
                <p class="viewer-error">
                    Image could not be loaded.
                    Please check the filename and file path.
                </p>
            `;
        });

        viewerBody.appendChild(img);

    } else if (type === "pdf") {

        const iframe = document.createElement("iframe");

        iframe.src = file;
        iframe.title = "Academic Document";
        iframe.setAttribute("loading", "lazy");

        viewerBody.appendChild(iframe);

    } else {

        const message = document.createElement("div");
        message.className = "viewer-file-message";

        const text = document.createElement("p");
        text.textContent =
            "This file type may not support preview in your browser.";

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
   CLOSE VIEWER
========================================= */

function hideViewer() {

    if (!viewer || !viewerBody) return;

    viewer.classList.remove("show");
    viewer.setAttribute("aria-hidden", "true");

    viewerBody.innerHTML = "";

}


/* CLOSE BUTTON */

if (closeViewerButton) {

    closeViewerButton.addEventListener("click", hideViewer);

}


/* CLICK OUTSIDE THE VIEWER */

if (viewer) {

    viewer.addEventListener("click", event => {

        if (event.target === viewer) {
            hideViewer();
        }

    });

}


/* ESCAPE KEY */

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

