// Animate stats counters
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current) + "+";
    }, 20);
}

// Initialize counters when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('event-count'), 120);
            animateCounter(document.getElementById('volunteer-count'), 850);
            observer.disconnect();
        }
    });
});
observer.observe(document.querySelector('header'));

// Load events data
const events = [
    {
        title: "Community Food Drive",
        date: "June 15, 2023",
        location: "Downtown Community Center",
        skills: ["Food Handling", "Organization", "Heavy Lifting"],
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399"
    },
    {
        title: "Beach Cleanup",
        date: "June 22, 2023",
        location: "Sunset Beach",
        skills: ["Environmental", "Teamwork"],
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
    },
    {
        title: "Youth Mentorship Program",
        date: "July 5-10, 2023",
        location: "City Youth Center",
        skills: ["Teaching", "Mentoring", "Patience"],
        image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57"
    },
    {
        title: "Animal Shelter Support",
        date: "July 15, 2023",
        location: "Paws & Care Shelter",
        skills: ["Animal Care", "Cleaning"],
        image: "https://images.unsplash.com/photo-1455103493930-a116f655b6c5"
    }
];

const eventsContainer = document.getElementById('events-container');
events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';

    eventCard.innerHTML = `
        <div class="event-image" style="background-image: url('${event.image}')"></div>
        <div class="event-details">
            <div class="event-date">${event.date}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-location">${event.location}</div>
            <div class="event-skills">
                ${event.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <a href="/login" class="btn btn-primary" style="width: 100%; text-align: center;">Learn More</a>
        </div>
    `;
    eventsContainer.appendChild(eventCard);
});

// Simple carousel drag scroll
let isDown = false;
let startX;
let scrollLeft;

eventsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - eventsContainer.offsetLeft;
    scrollLeft = eventsContainer.scrollLeft;
});

eventsContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

eventsContainer.addEventListener('mouseup', () => {
    isDown = false;
});

eventsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - eventsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    eventsContainer.scrollLeft = scrollLeft - walk;
});

