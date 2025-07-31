const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

//when someone click on the hamburger menu it will open or close by adding or removing the active class property
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
// window.addEventListener('scroll', () => {
//     const navbar = document.getElementById('navbar');
//     if (window.scrollY > 50) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', //creates the animated scrolling effect instead of an instant jump
                block: 'start' // aligns the target element to the top of the viewport
            });
        }
    });
});




// Form submission (you can customize this)
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); //Stops the browser's default instant jump behavior.

        Toastify({
            text: "Thank you for your message! I'll get back to you soon.",
            duration: 3000,
            backgroundColor: "#247727ff",
            gravity: "bottom",
            position: "right",
            close: true, // Show close button
            stopOnFocus: true, // Stop timer on hover
            className: "large-toast",
            offset: {
                x: 50, // horizontal offset
                y: 70  // vertical offset
            }

        }).showToast();

    const name = document.getElementById('name').value;    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // console.log(`name : ${name}, email : ${email}, message : ${message}`);


    fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
        .then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.error(err));



    this.reset();
});
