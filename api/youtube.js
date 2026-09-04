export default async function handler(req, res) {

    res.setHeader(
        "Cache-Control",
        "s-maxage=21600, stale-while-revalidate=3600"
    );


    const API_KEY = process.env.YOUTUBE_API_KEY;

    const CHANNEL_ID = "UCMFfoCxzE_xV8s6Ihpy6rwA";


    if (!API_KEY) {

        return res.status(500).json({
            error: "YouTube API key missing"
        });

    }


    try {


        const url =
        `https://www.googleapis.com/youtube/v3/search` +
        `?key=${API_KEY}` +
        `&channelId=${CHANNEL_ID}` +
        `&part=snippet,id` +
        `&order=date` +
        `&maxResults=10`;



        const response = await fetch(url);


        const data = await response.json();



        if (!data.items) {

            return res.status(500).json(data);

        }



        let latestVideo = null;

        let latestShort = null;



        for (const item of data.items) {


            if (item.id.kind === "youtube#video") {


                const video = {

                    id: item.id.videoId,

                    title: item.snippet.title,

                    thumbnail:
                    item.snippet.thumbnails.high.url

                };



                const isShort = item.snippet.title
                    .toLowerCase()
                    .includes("short");



                if (isShort && !latestShort) {

                    latestShort = video;

                }



                if (!isShort && !latestVideo) {

                    latestVideo = video;

                }


            }


        }



        return res.status(200).json({

            latestVideo,

            latestShort

        });



    }

    catch(error) {


        return res.status(500).json({

            error: error.message

        });


    }

}