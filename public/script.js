const url = "/post-data"
let options = {
    method: "GET",
    headers: {
        "content_type": "application/json"
    }
}

async function getPosts(url, options) {
    try {
        let result = await fetch(url,options)
        let data = await result.json()
        console.log(data)
        data.forEach(post => {
            $("#post-grid").append(`
                <div>
                    <p><b>Id:</b> ${post.id}</p>
                    <p><b>Title:</b> ${post.title}</p>
                    <p><b>Publish Date:</b> ${post.publish_date}</p>
                    <p><b>Author:</b> ${post.author}</p>
                    <p><b>Content:</b> ${post.content}</p>
                    <p><b>Cover Image:</b> ${post.cover_image}</p>
                <div>
            `)
        });

    } catch (err){
        console.log(err)
    }
}

getPosts(url,options)