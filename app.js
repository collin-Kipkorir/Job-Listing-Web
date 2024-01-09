
// Firebase configuration...
const firebaseConfig = {
    apiKey: "AIzaSyBSvYH5KvLySBJXXV0MpTpct6_C5wCQvKA",
    authDomain: "jobs-poster-7e821.firebaseapp.com",
    databaseURL: "https://jobs-poster-7e821-default-rtdb.firebaseio.com",
    projectId: "jobs-poster-7e821",
    storageBucket: "jobs-poster-7e821.appspot.com",
    messagingSenderId: "973414142879",
    appId: "1:973414142879:web:159760d8ff32a13cb123aa",
    measurementId: "G-BCFCNG6933"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Database
const database = firebase.database();
const jobListRef = database.ref('jobListings');

let currentPage = 1;
const itemsPerPage = 5;

function displayJobs() {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = ''; // Clear existing listings

    // Show loading overlay while fetching job listings
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    jobListRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const jobs = []; // Create an array to hold job listings
            snapshot.forEach((childSnapshot) => {
                const job = childSnapshot.val();
                jobs.push({ key: childSnapshot.key, ...job }); // Push each job into the array with its key
            });

            // Calculate pagination
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedJobs = jobs.slice(startIndex, endIndex);

            paginatedJobs.forEach((job) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                <h4>${job.jobTitle}</h4>
                <p>${job.companyName}</p>
                <p>${job.location}</p>                    
                <p>Posted: ${job.datePosted}</p>
                <button class="apply-button" onclick="applyForJob('${job.key}')">Apply</button>
            `;
                jobList.appendChild(card);
            });

            // Add pagination buttons
            const totalPages = Math.ceil(jobs.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                if (i === currentPage) {
                    button.classList.add('active'); // Add active class to the current page button
                }
                button.onclick = () => {
                    currentPage = i;
                    displayJobs();
                };
                paginationContainer.appendChild(button);
            }
        } else {
            console.log('No job listings found.');
        }

        // Hide loading overlay once job listings are fetched
        loadingOverlay.style.display = 'none';
    }, (error) => {
        console.error('Error fetching job listings:', error);
        // Hide loading overlay in case of an error
        loadingOverlay.style.display = 'none';
    });
}

function applyForJob(jobId) {
    window.location.href = `description.html?jobId=${jobId}`;
}

window.onload = function () {
    displayJobs();
};
function showHome() {
    document.getElementById('jobList').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
}

function showJobs() {
    document.getElementById('jobList').style.display = 'block';
    document.getElementById('aboutUs').style.display = 'none';
}

function showAboutUs() {
    document.getElementById('jobList').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'block';
}
// Function to toggle the bar
function geeksforgeeks() {
	let x = document.getElementById("menus");
	
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

// Function to toggle the plus menu into minus
function myFunction(x) {
	x.classList.toggle("fa-minus-circle");
}


window.onscroll = function() { stickyMenu() };

// Get the menu
var menu = document.getElementById("menus");

// Get the offset position of the menu
var sticky = menu.offsetTop;

// Add the sticky class to the menu when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyMenu() {
    if (window.pageYOffset > sticky) {
        menu.classList.add("sticky");
    } else {
        menu.classList.remove("sticky");
    }
}