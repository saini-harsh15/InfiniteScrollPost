const postsContainer = document.querySelector('.posts-container');
const loader = document.querySelector('.loader');
let currentPage = 1;
let isLoading = false;

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        loadMorePosts();
    }
});

async function loadMorePosts() {
    if (isLoading) return;
    isLoading = true;
    showLoader();
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`);
        const data = await response.json();
        displayPosts(data);
        currentPage++;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    hideLoader();
    isLoading = false;
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        postsContainer.appendChild(postElement);
    });
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

loadMorePosts();
