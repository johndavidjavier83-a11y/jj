/* =========================================
   ACADEMIC WORKS
   =========================================

   HOW TO ADD YOUR WORK:

   1. Put your image/file inside the "files" folder.

   2. Add a new item below.

   3. Change:
      title
      description
      file
      type
      category

   IMPORTANT:
   There is NO DATABASE.
   You are the only person who edits this list.
*/


const academicWorks = [

    /* ==============================
       QUIZ
    ============================== */

    {
        category: "quiz",

        title: "Quiz 1",

        description:
            "My first quiz for this subject.",

        file:
            "quiz1.jpeg.JPG",

        type:
            "image"
    },

    {
        category: "quiz",

        title: "Quiz 2",

        description:
            "My second quiz.",

        file:
            
           "QUIZ2.jpeg.JPG",
        type:
            "image"
    },


    /* ==============================
       LONG QUIZ
    ============================== */

    {
        category: "longquiz",

        title: "Long Quiz 1",

        description:
            "Long Quiz academic work.",

        file:
            "files/longquiz1.jpg",

        type:
            "image"
    },


    /* ==============================
       MIDTERMS
    ============================== */

    {
        category: "midterms",

        title: "Midterm Examination",

        description:
            "My Midterm Examination.",

        file:
            "Midterms.jpg",

        type:
            "image"
    },


    /* ==============================
       FINALS
    ============================== */

    {
        category: "finals",

        title: "Final Examination",

        description:
            "My Final Examination.",

        file:
            "files/finals.jpg",

        type:
            "image"
    },


    /* ==============================
       ACTIVITIES
    ============================== */

    {
        category: "activities",

        title: "Activity 1",

        description:
            "My academic activity.",

        file:
            "DCIT 26_ Activity 1.docx (1).pdf",

        type:
            "pdf"
    },


    {
        category: "activities",

        title: "Activity 2",

        description:
            "My Academic Activity.",

        file:
            "DCIT26_ Act 2.docx (1).pdf",

        type:
            "pdf"
    },


    /* ==============================
       PROJECTS
    ============================== */

    {
        category: "projects",

        title: "Project 1",

        description:
            "My academic project.",

        file:
            "files/project1.jpg",

        type:
            "image"
    },

    {
        category: "projects",

        title: "Project Documentation",

        description:
            "Project documentation.",

        file:
            "files/project1.pdf",

        type:
            "pdf"
    }

];


/* =========================================
   DISPLAY WORKS
========================================= */

const container =
    document.getElementById("works-container");


const buttons =
    document.querySelectorAll(".category");


function displayWorks(category) {

    container.innerHTML = "";


    const filtered =
        academicWorks.filter(
            work => work.category === category
        );


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <h3>No works yet</h3>

                <p>
                    Add your academic work
                    in script.js.
                </p>

            </div>

        `;

        return;
    }


    filtered.forEach(work => {

        const card =
            document.createElement("div");

        card.className = "work-card";


        let preview = "";


        /* ==============================
           IMAGE
        ============================== */

        if (work.type === "image") {

            preview = `

                <div class="work-preview">

                    <img
                        src="${work.file}"
                        alt="${work.title}"
                        onclick="openViewer(
                            '${work.file}',
                            'image'
                        )"
                    >

                </div>

            `;

        }


        /* ==============================
           PDF
        ============================== */

        else if (work.type === "pdf") {

            preview = `

                <div
                    class="work-preview"
                    onclick="openViewer(
                        '${work.file}',
                        'pdf'
                    )"
                    style="cursor:pointer"
                >

                    <div class="file-icon">
                        📄
                    </div>

                    <p class="file-label">
                        PDF Document
                    </p>

                </div>

            `;

        }


        /* ==============================
           OTHER FILE
        ============================== */

        else {

            preview = `

                <div class="work-preview">

                    <div class="file-icon">
                        📁
                    </div>

                    <p class="file-label">
                        File
                    </p>

                </div>

            `;

        }


        /* ==============================
           CARD
        ============================== */

        card.innerHTML = `

            ${preview}

            <div class="work-info">

                <h3>
                    ${work.title}
                </h3>

                <p>
                    ${work.description}
                </p>

                <button
                    class="view-button"
                    onclick="openViewer(
                        '${work.file}',
                        '${work.type}'
                    )"
                >
                    View Work
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================
   CATEGORY BUTTONS
========================================= */

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            buttons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            displayWorks(
                button.dataset.category
            );

        }
    );

});


/* =========================================
   VIEWER
========================================= */

const viewer =
    document.getElementById("viewer");

const viewerBody =
    document.getElementById("viewerBody");

const closeViewer =
    document.getElementById("closeViewer");


function openViewer(file, type) {

    viewerBody.innerHTML = "";


    /* ==============================
       IMAGE VIEWER
    ============================== */

    if (type === "image") {

        viewerBody.innerHTML = `

            <img
                src="${file}"
                alt="Academic Work"
            >

        `;

    }


    /* ==============================
       PDF VIEWER
    ============================== */

    else if (type === "pdf") {

        viewerBody.innerHTML = `

            <iframe
                src="${file}"
                title="Academic Document"
            ></iframe>

        `;

    }


    /* ==============================
       OTHER FILE
    ============================== */

    else {

        viewerBody.innerHTML = `

            <p style="
                color:white;
                text-align:center;
                padding:50px;
            ">

                This file type cannot be
                previewed directly.

                <br><br>

                <a
                    href="${file}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="color:#4dc3ff"
                >
                    Open File
                </a>

            </p>

        `;

    }


    viewer.classList.add("show");

}


/* =========================================
   CLOSE VIEWER
========================================= */

closeViewer.addEventListener(
    "click",
    () => {

        viewer.classList.remove("show");

        viewerBody.innerHTML = "";

    }
);


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

viewer.addEventListener(
    "click",
    event => {

        if (event.target === viewer) {

            viewer.classList.remove("show");

            viewerBody.innerHTML = "";

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            viewer.classList.remove("show");

            viewerBody.innerHTML = "";

        }

    }
);


/* =========================================
   LOAD QUIZ BY DEFAULT
========================================= */

displayWorks("quiz");
