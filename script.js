let currentPage = 1;


// ---------------- PAGE CHANGE ----------------

function showPage(pageNumber) {

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    const page = document.getElementById("page" + pageNumber);

    if (page) {
        page.classList.add("active");
        currentPage = pageNumber;
    }
}


// ---------------- START ----------------

function startBirthday() {

    const music = document.getElementById("birthdayMusic");

    if (music) {
        music.play().catch(function() {
            console.log("Music could not autoplay.");
        });
    }

    showPage(2);
}


// ---------------- BLOW CANDLES ----------------

function blowCandles() {

    const cake = document.getElementById("cake");

    if (cake) {

        cake.innerHTML = `
            <div style="
                font-size:80px;
                animation:heartbeat 1s infinite;
            ">
                🎉
            </div>
        `;
    }

    setTimeout(function() {
        showPage(3);
    }, 1200);
}


// ---------------- PHOTOS ----------------

let photoIndex = 0;

const photoCards = document.querySelectorAll(".photo-card");
const photoDots = document.querySelectorAll(".photo-dot");


function updatePhotos() {

    photoCards.forEach(function(card, index) {

        const position =
            (index - photoIndex + photoCards.length)
            % photoCards.length;


        if (position === 0) {

            card.style.zIndex = 5;
            card.style.transform = "rotate(-2deg)";
            card.style.opacity = "1";

        }

        else if (position === 1) {

            card.style.zIndex = 4;
            card.style.transform =
                "rotate(4deg) translate(7px,5px)";
            card.style.opacity = "1";

        }

        else if (position === 2) {

            card.style.zIndex = 3;
            card.style.transform =
                "rotate(-6deg) translate(-8px,10px)";
            card.style.opacity = "1";

        }

        else if (position === 3) {

            card.style.zIndex = 2;
            card.style.transform =
                "rotate(7deg) translate(10px,15px)";
            card.style.opacity = ".8";

        }

        else {

            card.style.zIndex = 1;
            card.style.transform =
                "rotate(-9deg) translate(-12px,20px)";
            card.style.opacity = ".6";

        }

    });


    photoDots.forEach(function(dot, index) {

        dot.classList.toggle(
            "active",
            index === photoIndex
        );

    });

}


// ---------------- NEXT PHOTO ----------------

function nextPhoto() {

    photoIndex++;

    if (photoIndex >= photoCards.length) {
        photoIndex = 0;
    }

    updatePhotos();
}


// ---------------- PREVIOUS PHOTO ----------------

function previousPhoto() {

    photoIndex--;

    if (photoIndex < 0) {
        photoIndex = photoCards.length - 1;
    }

    updatePhotos();
}


// ---------------- SWIPE ----------------

let touchStartX = 0;
let touchEndX = 0;

const photoStack = document.getElementById("photoStack");


if (photoStack) {

    photoStack.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.changedTouches[0].screenX;

        }
    );


    photoStack.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        }
    );

}


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 40) {
        return;
    }

    if (distance < 0) {
        nextPhoto();
    }

    else {
        previousPhoto();
    }

}


// ---------------- LETTER ----------------

function openLetter() {

    const modal =
        document.getElementById("letterModal");

    if (modal) {
        modal.classList.add("open");
    }

}


function closeLetter() {

    const modal =
        document.getElementById("letterModal");

    if (modal) {
        modal.classList.remove("open");
    }

}


function goToFinal() {

    closeLetter();

    showPage(6);

}


// ---------------- RESTART ----------------

function restartWebsite() {

    photoIndex = 0;

    updatePhotos();

    const music =
        document.getElementById("birthdayMusic");

    if (music) {
        music.currentTime = 0;
    }

    showPage(1);

}


// ---------------- INITIAL PHOTO ----------------

updatePhotos();