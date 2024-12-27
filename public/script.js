async function fetchData() {
    try {
        const response = await fetch('/api/getTop10');
        const data = await response.json();
        updateTable(data);
        updateBestPrice(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateTable(data) {
    const tbody = document.getElementById('crypto-data');
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>₹ ${Number(item.last).toLocaleString()}</td>
            <td>₹ ${Number(item.buy).toLocaleString()} / ₹ ${Number(item.sell).toLocaleString()}</td>
            <td>${Number(item.volume).toLocaleString()}</td>
            <td>${item.base_unit.toUpperCase()}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateBestPrice(data) {
    if (data.length > 0) {
        const mainPrice = document.querySelector('.main-price span');
        mainPrice.textContent = `₹ ${Number(data[0].last).toLocaleString()}`;
    }
}

// Fetch data initially and then every minute
fetchData();
setInterval(fetchData, 40000);