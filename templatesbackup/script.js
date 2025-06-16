// Global state
let currentUser = null;
let blogs = [
    {
        id: 1,
        title: "The Future of Web Development",
        excerpt: "Exploring the latest trends and technologies shaping the web development landscape in 2025.",
        content: "Web development is evolving at an unprecedented pace. From the rise of AI-powered development tools to the increasing adoption of edge computing, developers are witnessing a transformation that's reshaping how we build and interact with web applications.\n\nThe integration of artificial intelligence in development workflows has become more than just a trend—it's becoming essential. Tools that can generate code, optimize performance, and even debug applications are changing the daily routine of developers worldwide.\n\nServerless architecture continues to gain momentum, allowing developers to focus on writing code rather than managing infrastructure. This shift is enabling faster deployment cycles and more scalable applications.\n\nThe future also holds exciting possibilities with WebAssembly gaining traction, allowing high-performance applications to run in browsers, and the continued evolution of Progressive Web Apps bridging the gap between web and native applications.",
        author: "Alex Johnson",
        date: "2025-06-10",
        reviews: 12,
        image: "Tech Blog Cover"
    },
    {
        id: 2,
        title: "Mindful Living in a Digital Age",
        excerpt: "How to maintain balance and mindfulness while navigating our increasingly connected world.",
        content: "In our hyperconnected world, finding moments of peace and mindfulness has become both more challenging and more essential than ever before. The constant buzz of notifications, the endless scroll of social media, and the pressure to be always 'on' can leave us feeling overwhelmed and disconnected from ourselves.\n\nMindful living doesn't mean abandoning technology entirely. Instead, it's about creating intentional boundaries and developing a healthier relationship with our digital tools. This means setting specific times for checking emails, creating phone-free zones in our homes, and practicing digital detox periods.\n\nOne powerful practice is mindful breathing. Taking just five minutes each day to focus on our breath can help reset our nervous system and bring us back to the present moment. Combined with regular meditation, these practices can significantly reduce stress and improve our overall well-being.\n\nThe key is to remember that technology should serve us, not the other way around. By being more intentional about our digital consumption, we can reclaim our time and attention for what truly matters.",
        author: "Sarah Chen",
        date: "2025-06-08",
        reviews: 8,
        image: "Mindfulness Cover"
    },
    {
        id: 3,
        title: "Sustainable Travel: Exploring Responsibly",
        excerpt: "A guide to traveling the world while minimizing your environmental impact and supporting local communities.",
        content: "Sustainable travel is more than just a trend—it's a responsibility we all share as global citizens. As we explore the beautiful corners of our planet, we must do so in ways that preserve these destinations for future generations while supporting the communities that call these places home.\n\nThe first step in sustainable travel is choosing your transportation mindfully. While flying is sometimes unavoidable for long distances, consider train travel for regional trips, which often provides scenic routes and significantly lower carbon emissions. When you do fly, consider purchasing carbon offsets to mitigate your impact.\n\nAccommodation choices matter too. Look for hotels and lodges that have genuine sustainability certifications, not just greenwashing marketing. Many eco-friendly accommodations use renewable energy, implement water conservation measures, and source food locally.\n\nEngaging with local communities respectfully is crucial. Learn basic phrases in the local language, respect cultural customs, and choose tour operators that employ local guides and give back to the community. Purchase souvenirs from local artisans rather than mass-produced items.\n\nRemember, sustainable travel is about quality over quantity. Spending more time in fewer places allows for deeper cultural immersion while reducing your carbon footprint from constant movement.",
        author: "Maria Rodriguez",
        date: "2025-06-05",
        reviews: 15,
        image: "Travel Cover"
    }
];

// Utility functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Load page-specific content
    if (pageId === 'index') {
        loadBlogs();
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateAuthUI() {
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileInitial = document.getElementById('profileInitial');
    
    if (currentUser) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        profileAvatar.style.display = 'flex';
        profileInitial.textContent = currentUser.username.charAt(0).toUpperCase();
    } else {
        loginLink.style.display = 'inline-block';
        signupLink.style.display = 'inline-block';
        profileAvatar.style.display = 'none';
    }
}

// Authentication functions
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    // Simple validation
    if (username.length < 3) {
        showNotification('Username must be at least 3 characters long', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Store user data (in real app, this would be sent to server)
    const userData = { username, email, password };
    localStorage.setItem('userData', JSON.stringify(userData));
    currentUser = userData;
    
    showNotification('Account created successfully!');
    updateAuthUI();
    showPage('index');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Check stored user data
    const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (storedUser.email === email && storedUser.password === password) {
        currentUser = storedUser;
        showNotification('Welcome back!');
        updateAuthUI();
        showPage('index');
    } else {
        showNotification('Invalid email or password', 'error');
    }
});

document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    showNotification('Password reset link sent to your email!');
    showPage('login');
});

// Blog functions
function loadBlogs() {
    const blogsGrid = document.getElementById('blogsGrid');
    blogsGrid.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card animate-slide-up';
        blogCard.onclick = () => showBlogDetail(blog.id);
        
        blogCard.innerHTML = `
            <div class="blog-image">${blog.image}</div>
            <div class="blog-content">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <div class="blog-author">
                        <div class="author-avatar">${blog.author.charAt(0)}</div>
                        <span>${blog.author}</span>
                    </div>
                    <div>
                        <span>${blog.date}</span>
                        <span> • ${blog.reviews} reviews</span>
                    </div>
                </div>
            </div>
        `;
        
        blogsGrid.appendChild(blogCard);
    });
}

function showBlogDetail(blogId) {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;
    
    document.getElementById('blogDetailTitle').textContent = blog.title;
    document.getElementById('blogDetailAuthor').textContent = blog.author;
    document.getElementById('blogDetailDate').textContent = blog.date;
    document.getElementById('blogDetailReviews').textContent = `${blog.reviews} reviews`;
    document.getElementById('blogDetailAuthorAvatar').textContent = blog.author.charAt(0);
    document.getElementById('blogDetailContent').innerHTML = blog.content.split('\n').map(p => `<p>${p}</p>`).join('');
    
    showPage('blog-detail');
}

// Create blog functions
document.getElementById('createBlogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to create a blog', 'error');
        showPage('login');
        return;
    }
    
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    
    if (title.length < 5) {
        showNotification('Title must be at least 5 characters long', 'error');
        return;
    }
    
    if (content.length < 50) {
        showNotification('Content must be at least 50 characters long', 'error');
        return;
    }
    
    const newBlog = {
        id: blogs.length + 1,
        title: title,
        excerpt: content.substring(0, 150) + '...',
        content: content,
        author: currentUser.username,
        date: new Date().toISOString().split('T')[0],
        reviews: 0,
        image: 'Custom Blog'
    };
    
    blogs.unshift(newBlog);
    showNotification('Blog published successfully!');
    
    // Reset form
    document.getElementById('createBlogForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    
    showPage('index');
});

// Text formatting functions
function formatText(format) {
    const textarea = document.getElementById('blogContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
        let formattedText = selectedText;
        switch (format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
        }
        
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
    }
}

function insertList() {
    const textarea = document.getElementById('blogContent');
    const start = textarea.selectionStart;
    const listItem = '\n• ';
    
    textarea.value = textarea.value.substring(0, start) + listItem + textarea.value.substring(start);
    textarea.focus();
    textarea.setSelectionRange(start + listItem.length, start + listItem.length);
}

function insertLink() {
    const textarea = document.getElementById('blogContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const url = prompt('Enter URL:');
    if (url) {
        const linkText = selectedText || 'link text';
        const link = `[${linkText}](${url})`;
        
        textarea.value = textarea.value.substring(0, start) + link + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + link.length, start + link.length);
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <p style="margin-top: 0.5rem; color: var(--text-secondary);">Image uploaded successfully</p>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function toggleProfile() {
    if (currentUser) {
        const logout = confirm('Do you want to logout?');
        if (logout) {
            currentUser = null;
            localStorage.removeItem('userData');
            updateAuthUI();
            showNotification('Logged out successfully!');
            showPage('index');
        }
    }
}

// Initialize app
window.addEventListener('load', function() {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (storedUser.username) {
        currentUser = storedUser;
        updateAuthUI();
    }
    
    // Load initial content
    loadBlogs();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all blog cards for animation
    setTimeout(() => {
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

// Drag and drop for image upload
const uploadArea = document.querySelector('.upload-area');

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.background = 'rgba(99, 102, 241, 0.05)';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border)';
    uploadArea.style.background = 'transparent';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border)';
    uploadArea.style.background = 'transparent';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            document.getElementById('imageInput').files = files;
            handleImageUpload({ target: { files: files } });
        }
    }
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add some interactive hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('blog-card')) {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('blog-card')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b' && document.activeElement.id === 'blogContent') {
            e.preventDefault();
            formatText('bold');
        } else if (e.key === 'i' && document.activeElement.id === 'blogContent') {
            e.preventDefault();
            formatText('italic');
        } else if (e.key === 'u' && document.activeElement.id === 'blogContent') {
            e.preventDefault();
            formatText('underline');
        }
    }
});

// Auto-save draft (simulate)
let autoSaveTimeout;
document.getElementById('blogContent').addEventListener('input', function() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        const title = document.getElementById('blogTitle').value;
        const content = document.getElementById('blogContent').value;
        if (title || content) {
            localStorage.setItem('blogDraft', JSON.stringify({ title, content }));
        }
    }, 2000);
});

// Load draft on page load
window.addEventListener('load', function() {
    const draft = JSON.parse(localStorage.getItem('blogDraft') || '{}');
    if (draft.title || draft.content) {
        document.getElementById('blogTitle').value = draft.title || '';
        document.getElementById('blogContent').value = draft.content || '';
    }
});

// Clear draft after successful submission
document.getElementById('createBlogForm').addEventListener('submit', function() {
    localStorage.removeItem('blogDraft');
});