
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


function toggleProfile() {
    const logout = confirm('Do you want to logout?');
    if (logout) {
        window.location.href = '/logout'
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim(); // Remove whitespace
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function registerUser(e){
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    // console.log(e.target)
    const username = e.target.querySelector('#regUsername').value;
    const email = e.target.querySelector('#regEmail').value;
    const password = e.target.querySelector('#regPassword').value;
    if (username.length < 3) {
        showNotification('Username must be at least 3 characters long', 'error');
        return;
    }
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    fetch('/register',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
        body:JSON.stringify({
            username:`${username}`,
            email:`${email}`,
            password : `${password}`
        })
    })
        .then(response =>{ 
            if (response.ok){
                setTimeout(()=>{
                    window.location.href = '/login'
                },2000)
                showNotification("Account created now login",)
            }
            else{
                showNotification("Some error occur", "error")
            }
        })
        // .then(data => {
        // console.log('Success:', data);
        // })
        .catch((error) => {
        console.error('Error:', error);
    });
}




// Global state
        // let currentUser = null;
        

        // // Utility functions
        // function showPage(pageId) {
        //     // Hide all pages
        //     document.querySelectorAll('.page').forEach(page => {
        //         page.classList.remove('active');
        //     });
            
        //     // Show selected page
        //     document.getElementById(pageId).classList.add('active');
            
        //     // Load page-specific content
        //     if (pageId === 'index') {
        //         loadBlogs();
        //     }
        // }



        // function updateAuthUI() {
        //     const loginLink = document.getElementById('loginLink');
        //     const signupLink = document.getElementById('signupLink');
        //     const profileAvatar = document.getElementById('profileAvatar');
        //     const profileInitial = document.getElementById('profileInitial');
            
        //     if (currentUser) {
        //         loginLink.style.display = 'none';
        //         signupLink.style.display = 'none';
        //         profileAvatar.style.display = 'flex';
        //         profileInitial.textContent = currentUser.username.charAt(0).toUpperCase();
        //     } else {
        //         loginLink.style.display = 'inline-block';
        //         signupLink.style.display = 'inline-block';
        //         profileAvatar.style.display = 'none';
        //     }
        // }
        // updateAuthUI();

        // // Authentication functions
        

        // document.getElementById('loginForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     showNotification('Invalid email or password', 'error');
        //     // const email = document.getElementById('loginEmail').value;
        //     // const password = document.getElementById('loginPassword').value;
            
        //     // // Check stored user data
        //     // const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
            
        //     // if (storedUser.email === email && storedUser.password === password) {
        //     //     currentUser = storedUser;
        //     //     showNotification('Welcome back!');
        //     //     updateAuthUI();
        //     //     showPage('index');
        //     // } else {
        //     //     showNotification('Invalid email or password', 'error');
        //     // }
        // });

        // document.getElementById('forgotForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     const email = document.getElementById('forgotEmail').value;
        //     showNotification('Password reset link sent to your email!');
        //     showPage('login');
        // });

        

        

        // // Create blog functions
        // document.getElementById('createBlogForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     if (!currentUser) {
        //         showNotification('Please login to create a blog', 'error');
        //         showPage('login');
        //         return;
        //     }
            
        //     const title = document.getElementById('blogTitle').value;
        //     const content = document.getElementById('blogContent').value;
            
        //     if (title.length < 5) {
        //         showNotification('Title must be at least 5 characters long', 'error');
        //         return;
        //     }
            
        //     if (content.length < 50) {
        //         showNotification('Content must be at least 50 characters long', 'error');
        //         return;
        //     }
            
        //     const newBlog = {
        //         id: blogs.length + 1,
        //         title: title,
        //         excerpt: content.substring(0, 150) + '...',
        //         content: content,
        //         author: currentUser.username,
        //         date: new Date().toISOString().split('T')[0],
        //         reviews: 0,
        //         image: 'Custom Blog'
        //     };
            
        //     blogs.unshift(newBlog);
        //     showNotification('Blog published successfully!');
            
        //     // Reset form
        //     document.getElementById('createBlogForm').reset();
        //     document.getElementById('imagePreview').innerHTML = '';
            
        //     showPage('index');
        // });

        // // Text formatting functions
        // function formatText(format) {
        //     const textarea = document.getElementById('blogContent');
        //     const start = textarea.selectionStart;
        //     const end = textarea.selectionEnd;
        //     const selectedText = textarea.value.substring(start, end);
            
        //     if (selectedText) {
        //         let formattedText = selectedText;
        //         switch (format) {
        //             case 'bold':
        //                 formattedText = `**${selectedText}**`;
        //                 break;
        //             case 'italic':
        //                 formattedText = `*${selectedText}*`;
        //                 break;
        //             case 'underline':
        //                 formattedText = `__${selectedText}__`;
        //                 break;
        //         }
                
        //         textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        //         textarea.focus();
        //         textarea.setSelectionRange(start, start + formattedText.length);
        //     }
        // }

        // function insertList() {
        //     const textarea = document.getElementById('blogContent');
        //     const start = textarea.selectionStart;
        //     const listItem = '\n• ';
            
        //     textarea.value = textarea.value.substring(0, start) + listItem + textarea.value.substring(start);
        //     textarea.focus();
        //     textarea.setSelectionRange(start + listItem.length, start + listItem.length);
        // }

        // function insertLink() {
        //     const textarea = document.getElementById('blogContent');
        //     const start = textarea.selectionStart;
        //     const end = textarea.selectionEnd;
        //     const selectedText = textarea.value.substring(start, end);
            
        //     const url = prompt('Enter URL:');
        //     if (url) {
        //         const linkText = selectedText || 'link text';
        //         const link = `[${linkText}](${url})`;
                
        //         textarea.value = textarea.value.substring(0, start) + link + textarea.value.substring(end);
        //         textarea.focus();
        //         textarea.setSelectionRange(start + link.length, start + link.length);
        //     }
        // }

        // function handleImageUpload(event) {
        //     const file = event.target.files[0];
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onload = function(e) {
        //             const preview = document.getElementById('imagePreview');
        //             preview.innerHTML = `
        //                 <img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        //                 <p style="margin-top: 0.5rem; color: var(--text-secondary);">Image uploaded successfully</p>
        //             `;
        //         };
        //         reader.readAsDataURL(file);
        //     }
        // }

        

        // // Initialize app
        // window.addEventListener('load', function() {
        //     // Check if user is logged in
        //     const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
        //     if (storedUser.username) {
        //         currentUser = storedUser;
        //         updateAuthUI();
        //     }
            
        //     // Load initial content
        //     loadBlogs();
            
        //     // Add scroll animations
        //     const observerOptions = {
        //         threshold: 0.1,
        //         rootMargin: '0px 0px -50px 0px'
        //     };
            
        //     const observer = new IntersectionObserver(function(entries) {
        //         entries.forEach(entry => {
        //             if (entry.isIntersecting) {
        //                 entry.target.style.opacity = '1';
        //                 entry.target.style.transform = 'translateY(0)';
        //             }
        //         });
        //     }, observerOptions);
            
        //     // Observe all blog cards for animation
        //     setTimeout(() => {
        //         document.querySelectorAll('.blog-card').forEach(card => {
        //             card.style.opacity = '0';
        //             card.style.transform = 'translateY(30px)';
        //             card.style.transition = 'all 0.6s ease';
        //             observer.observe(card);
        //         });
        //     }, 100);
        // });

        // // Drag and drop for image upload
        // const uploadArea = document.querySelector('.upload-area');
        
        // uploadArea.addEventListener('dragover', function(e) {
        //     e.preventDefault();
        //     uploadArea.style.borderColor = 'var(--primary-color)';
        //     uploadArea.style.background = 'rgba(99, 102, 241, 0.05)';
        // });
        
        // uploadArea.addEventListener('dragleave', function(e) {
        //     e.preventDefault();
        //     uploadArea.style.borderColor = 'var(--border)';
        //     uploadArea.style.background = 'transparent';
        // });
        
        // uploadArea.addEventListener('drop', function(e) {
        //     e.preventDefault();
        //     uploadArea.style.borderColor = 'var(--border)';
        //     uploadArea.style.background = 'transparent';
            
        //     const files = e.dataTransfer.files;
        //     if (files.length > 0) {
        //         const file = files[0];
        //         if (file.type.startsWith('image/')) {
        //             document.getElementById('imageInput').files = files;
        //             handleImageUpload({ target: { files: files } });
        //         }
        //     }
        // });

        // // Smooth scrolling for internal links
        // document.addEventListener('click', function(e) {
        //     if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        //         e.preventDefault();
        //         const targetId = e.target.getAttribute('href').substring(1);
        //         const targetElement = document.getElementById(targetId);
        //         if (targetElement) {
        //             targetElement.scrollIntoView({ behavior: 'smooth' });
        //         }
        //     }
        // });

        // // Add some interactive hover effects
        // document.addEventListener('mouseover', function(e) {
        //     if (e.target.classList.contains('blog-card')) {
        //         e.target.style.transform = 'translateY(-10px) scale(1.02)';
        //     }
        // });

        // document.addEventListener('mouseout', function(e) {
        //     if (e.target.classList.contains('blog-card')) {
        //         e.target.style.transform = 'translateY(0) scale(1)';
        //     }
        // });

        // // Keyboard shortcuts
        // document.addEventListener('keydown', function(e) {
        //     if (e.ctrlKey || e.metaKey) {
        //         if (e.key === 'b' && document.activeElement.id === 'blogContent') {
        //             e.preventDefault();
        //             formatText('bold');
        //         } else if (e.key === 'i' && document.activeElement.id === 'blogContent') {
        //             e.preventDefault();
        //             formatText('italic');
        //         } else if (e.key === 'u' && document.activeElement.id === 'blogContent') {
        //             e.preventDefault();
        //             formatText('underline');
        //         }
        //     }
        // });

        // // Auto-save draft (simulate)
        // let autoSaveTimeout;
        // document.getElementById('blogContent').addEventListener('input', function() {
        //     clearTimeout(autoSaveTimeout);
        //     autoSaveTimeout = setTimeout(() => {
        //         const title = document.getElementById('blogTitle').value;
        //         const content = document.getElementById('blogContent').value;
        //         if (title || content) {
        //             localStorage.setItem('blogDraft', JSON.stringify({ title, content }));
        //         }
        //     }, 2000);
        // });

        // // Load draft on page load
        // window.addEventListener('load', function() {
        //     const draft = JSON.parse(localStorage.getItem('blogDraft') || '{}');
        //     if (draft.title || draft.content) {
        //         document.getElementById('blogTitle').value = draft.title || '';
        //         document.getElementById('blogContent').value = draft.content || '';
        //     }
        // });

        // // Clear draft after successful submission
        // document.getElementById('createBlogForm').addEventListener('submit', function() {
        //     localStorage.removeItem('blogDraft');
        // });