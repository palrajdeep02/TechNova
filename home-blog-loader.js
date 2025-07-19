document.addEventListener('DOMContentLoaded', () => {
    const homepageBlogPostsContainer = document.getElementById('homepage-blog-posts-container');

    if (!homepageBlogPostsContainer) {
        // If the container doesn't exist on this page, do nothing.
        // This prevents errors if this script is mistakenly included on other pages.
        return;
    }

    async function fetchAndDisplayLatestBlogPosts() {
        try {
            const response = await fetch('blog-posts.json'); // Path to your JSON file
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            // Sort posts by date in descending order (latest first)
            posts.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // For descending order (latest first)
            });

            // Get the two most recent posts
            const latestTwoPosts = posts.slice(0, 2);

            displayHomepageBlogPosts(latestTwoPosts);

        } catch (error) {
            console.error("Error fetching homepage blog posts:", error);
            homepageBlogPostsContainer.innerHTML = '<p>Failed to load latest insights. Please try again later.</p>';
        }
    }

    function displayHomepageBlogPosts(posts) {
        if (posts.length === 0) {
            homepageBlogPostsContainer.innerHTML = '<p>No recent articles available at the moment.</p>';
            return;
        }

        homepageBlogPostsContainer.innerHTML = ''; // Clear any existing content

        posts.forEach(post => {
            const postCard = document.createElement('a');
            postCard.href = post.link;
            // Use 'blog-card-home' as per your index.html structure for homepage previews
            postCard.classList.add('blog-card-home');

            postCard.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.title}" class="blog-thumbnail" />
                <div class="blog-content-home">
                    <h3>${post.title}</h3>
                    <p class="text-secondary">${post.excerpt}</p>
                    <span class="read-article">Read Article &#8250;</span>
                </div>
            `;
            homepageBlogPostsContainer.appendChild(postCard);
        });
    }

    // Call the function to fetch and display posts when the page loads
    fetchAndDisplayLatestBlogPosts();
});