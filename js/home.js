const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    try {
        let data = blog.data();
        if (!data) {
            console.error('No blog data found');
            return;
        }

        blogSection.innerHTML += `
            <div class="blog-card">
                <img src="${data.bannerImage || 'default-banner.jpg'}" class="blog-image" alt="Banner image for ${data.title}">
                <h1 class="blog-title">${data.title.length > 100 ? data.title.substring(0, 100) + '...' : data.title}</h1>
                <p class="blog-overview">${data.article.length > 200 ? data.article.substring(0, 200) + '...' : data.article}</p>
                <a href="/${blog.id}" class="btn dark">read</a>
            </div>
        `;
    } catch (error) {
        console.error('Error creating blog card:', error);
    }
};
