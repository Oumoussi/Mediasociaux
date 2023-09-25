// Define the URL of your CSV file
const csvFileURL = 'https://docs.google.com/spreadsheets/d/1dIr_UUAZMcvZf91uZnQsltavTbH77WsgPj95nd3WYLI/edit?resourcekey#gid=863405160';

// Function to fetch and display CSV data
function displayCSVData() {
    fetch(csvFileURL)
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data into an array of rows
            const rows = data.trim().split('\n');
            const table = document.createElement('table');

            // Loop through the rows and create table rows and cells
            rows.forEach(row => {
                const cells = row.split(',');
                const tableRow = document.createElement('tr');

                cells.forEach(cellData => {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    tableRow.appendChild(cell);
                });

                table.appendChild(tableRow);
            });

            // Display the table on the webpage
            document.getElementById('csv-data').appendChild(table);
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
        });
}

// Call the function to load and display CSV data
displayCSVData();
