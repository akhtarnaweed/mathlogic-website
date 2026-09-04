document.addEventListener("DOMContentLoaded", async function () {

    try {


        const response = await fetch("/api/youtube");


        const data = await response.json();



        // Latest Video

        const videoBox = document.getElementById("latest-video");

        const videoTitle = document.querySelector(
            ".latest-video h3"
        );

        const videoDescription = document.querySelector(
            ".latest-video p"
        );



        if (videoBox && data.latestVideo) {


            videoBox.innerHTML = `

                <iframe
                    src="https://www.youtube.com/embed/${data.latestVideo.id}"
                    title="${data.latestVideo.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>

            `;


            if (videoTitle) {

                videoTitle.textContent =
                    data.latestVideo.title;

            }


            if (videoDescription) {

                videoDescription.textContent =
                    "Latest mathematics lecture from MathLogic YouTube channel.";

            }


        }




        // Latest Short


        const shortBox = document.getElementById("latest-short");


        const shortTitle = document.querySelector(
            ".latest-short h3"
        );


        const shortDescription = document.querySelector(
            ".latest-short p"
        );



        if (shortBox && data.latestShort) {


            shortBox.innerHTML = `

                <iframe
                    src="https://www.youtube.com/embed/${data.latestShort.id}"
                    title="${data.latestShort.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>

            `;


            if (shortTitle) {

                shortTitle.textContent =
                    data.latestShort.title;

            }


            if (shortDescription) {

                shortDescription.textContent =
                    "Latest MathLogic short video.";

            }


        }



    }


    catch (error) {


        console.error(
            "YouTube loading error:",
            error
        );


    }

});