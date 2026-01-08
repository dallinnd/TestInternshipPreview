// 1. CONFIGURATION: Add your GitHub Raw URLs here
const sources = [
    {
        id: 'pittcsc',
        name: 'Pitt CSC - Summer 2024',
        description: 'The most famous list. Official Pitt Computer Science Club repository for Summer 2024 internships.',
        // NOTE: Use the 'raw.githubusercontent.com' link, not the main github.com link!
        url: 'https://raw.githubusercontent.com/pittcsc/Summer2024-Internships/dev/README.md',
        originalLink: 'https://github.com/pittcsc/Summer2024-Internships'
    },
    {
        id: 'simplify',
        name: 'Simplify Jobs List',
        description: 'A massive, frequently updated list maintained by the Simplify Jobs team.',
        url: 'https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md',
        originalLink: 'https://github.com/SimplifyJobs/Summer2024-Internships'
    },
    {
        id: 'cscareers',
        name: 'New Grads 2024',
        description: 'For those graduating soon. Focuses on full-time roles rather than internships.',
        url: 'https://raw.githubusercontent.com/ReaVNaiL/New-Grad-2024/main/README.md',
        originalLink: 'https://github.com/ReaVNaiL/New-Grad-2024'
    }
];

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
});

// 3. RENDER THE PREVIEW GRID
function renderGrid() {
    const grid = document.getElementById('grid-container');
    grid.innerHTML = ''; // Clear existing

    sources.forEach(source => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${source.name}</h3>
            <p>${source.description}</p>
        `;
        card.onclick = () => openPopup(source);
        grid.appendChild(card);
    });
}

// 4. POPUP LOGIC
const popup = document.getElementById('popup-overlay');
const popupContent = document.getElementById('popup-content');
const popupTitle = document.getElementById('popup-title');
const popupLink = document.getElementById('popup-link');

async function openPopup(source) {
    // Show UI
    popup.style.display = 'flex';
    popupTitle.innerText = source.name;
    popupLink.href = source.originalLink;
    
    // Show Loading State
    popupContent.innerHTML = '<div style="text-align:center; padding:50px;">Loading Data...</div>';

    try {
        // Fetch Raw Data
        const response = await fetch(source.url);
        if (!response.ok) throw new Error('Network response was not ok');
        const markdownText = await response.text();

        // Convert MD to HTML using 'Marked' library
        const rawHtml = marked.parse(markdownText);

        // Sanitize HTML using 'DOMPurify' (Security Best Practice)
        const cleanHtml = DOMPurify.sanitize(rawHtml);

        // Render
        popupContent.innerHTML = cleanHtml;

    } catch (error) {
        popupContent.innerHTML = `<div style="color:red; text-align:center; padding:20px;">Error loading data: ${error.message}</div>`;
    }
}

function closePopup() {
    popup.style.display = 'none';
    popupContent.innerHTML = ''; // Clear content to save memory
}
