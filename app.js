const internshipSources = [
    {
        name: "Pitt CSC List",
        type: "markdown",
        // Note the 'raw.githubusercontent.com' domain!
        url: "https://raw.githubusercontent.com/pittcsc/Summer2024-Internships/dev/README.md" 
    },
    {
        name: "Simplify Jobs",
        type: "json", // or csv
        url: "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/.github/scripts/listings.json"
    }
];

async function loadPreview(source) {
    try {
        const response = await fetch(source.url);
        const text = await response.text();
        
        let htmlContent = "";
        
        if (source.type === 'markdown') {
            // Converts MD to HTML
            htmlContent = marked.parse(text); 
        } else if (source.type === 'csv') {
            // You'd write a helper to turn CSV rows into an HTML <table>
            htmlContent = csvToHtmlTable(text); 
        }

        // Render this htmlContent into your popup div
        document.getElementById('full-popup-content').innerHTML = htmlContent;
        
    } catch (error) {
        console.error("Failed to load list:", error);
    }
}
