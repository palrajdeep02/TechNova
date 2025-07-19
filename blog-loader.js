document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');

    // Function to fetch blog posts from JSON
    async function fetchBlogPosts() {
        try {
            const response = await fetch('blog-posts.json'); // Path to your JSON file
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            displayBlogPosts(posts);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            blogPostsContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
        }
    }

    // Function to display blog posts
    function displayBlogPosts(posts) {
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p>No blog posts available at the moment. Please check back soon!</p>';
            return;
        }

        posts.forEach(post => {
            // Use 'a' tag with 'blog-card' class as per your original HTML
            const postCardLink = document.createElement('a');
            postCardLink.href = post.link;
            postCardLink.classList.add('blog-card'); // Use the class from your HTML/CSS

            postCardLink.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.title}" class="blog-thumbnail" />
                <div class="blog-content">
                    <p class="blog-meta">By ${post.author} on ${post.date}</p>
                    <h3>${post.title}</h3>
                    <p class="text-secondary">${post.excerpt}</p>
                    <span class="read-article">Read Article &#8250;</span>
                </div>
            `;
            blogPostsContainer.appendChild(postCardLink);
        });
    }

    // Call the function to fetch and display posts when the page loads
    fetchBlogPosts();
});