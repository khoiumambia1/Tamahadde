// ==================== LOGIN CHECK ====================
(function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPage = window.location.pathname;
    
    // Skip login check for sign-in page
    if (currentPage.includes('sign-in.html')) {
        return;
    }
    
    // If not logged in, redirect to sign-in
    if (!loggedInUser) {
        window.location.href = 'sign-in.html';
        return;
    }
    
    // Optional: Add user info to page
    try {
        const user = JSON.parse(loggedInUser);
        // Add user badge to header if needed
        const headerFlex = document.querySelector('.header .flex');
        if (headerFlex && !document.querySelector('.user-badge')) {
            const userBadge = document.createElement('div');
            userBadge.className = 'user-badge';
            userBadge.style.cssText = 'display: flex; align-items: center; gap: 1rem; font-size: 1.3rem;';
            userBadge.innerHTML = `
                <i class="fas fa-user-circle" style="font-size: 2rem; color: var(--main-color);"></i>
                <span style="font-weight: 500;">${user.name || user.username}</span>
                <button onclick="logout()" style="background: none; border: none; cursor: pointer; color: var(--light-color);">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            `;
            headerFlex.appendChild(userBadge);
        }
    } catch(e) {}
})();

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'sign-in.html';
}

let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

function mobileView(){
    return window.innerWidth <= 768;
}

function closeDropdowns(){
    document.querySelectorAll('.header .navbar ul ul').forEach(submenu =>{
        submenu.style.removeProperty('display');
    });
}

function removeNavbar(){
    navbar.classList.remove('active');
    closeDropdowns();
}

// Toggle mobile menu
menuBtn.onclick = () =>{
    navbar.classList.toggle('active');
    if(!navbar.classList.contains('active')){
        closeDropdowns();
    }
}

// Close menu when clicking outside
document.onclick = (e) =>{
    if(mobileView() && navbar.classList.contains('active')){
        if(e.target !== menuBtn && !navbar.contains(e.target) && !menuBtn.contains(e.target))
        {
            removeNavbar();
        }
    }
}

// Close menu on scroll
window.onscroll = () =>{
    if(mobileView() && navbar.classList.contains('active')){
        removeNavbar();
    }
}

// Handle dropdown toggles for mobile
document.querySelectorAll('.header .navbar a[href="#"]').forEach(anchor =>{
    anchor.onclick = (e) =>{
        e.preventDefault();
        
        if(mobileView()){
            let parentLi = anchor.closest('li');
            let submenu = parentLi ? parentLi.querySelector('ul') : null;
            
            if(submenu){
                // Close other open submenus at same level
                let siblings = parentLi.parentElement.querySelectorAll('li > ul');
                siblings.forEach(menu => {
                    if(menu !== submenu){
                        menu.style.display = 'none';
                    }
                });
                
                // Toggle current submenu
                if(submenu.style.display === 'block'){
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            }
        }
    }
});

// Handle window resize
window.onresize = () =>{
    if(!mobileView() && navbar.classList.contains('active')){
        removeNavbar();
    }
    
    if(!mobileView()){
        // Reset all submenu displays on desktop
        document.querySelectorAll('.header .navbar ul ul').forEach(submenu =>{
            submenu.style.removeProperty('display');
        });
    }
}

// Prevent menu from closing when clicking inside submenu on mobile
document.querySelectorAll('.header .navbar ul ul').forEach(submenu =>{
    submenu.onclick = (e) =>{
        if(mobileView()){
            e.stopPropagation();
        }
    }
});

// Add touch support for mobile devices
menuBtn.ontouchstart = (e) =>{
    e.preventDefault();
    menuBtn.onclick();
}

// Handle keyboard navigation
document.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape' && mobileView() && navbar.classList.contains('active')){
        removeNavbar();
    }
});

