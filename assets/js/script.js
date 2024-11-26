// Mobile screen hamburger menu
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');

function navToggle() {
    btn.classList.toggle('open');
    nav.classList.toggle('hidden');
    document.body.classList.toggle('no-scroll')
}

btn.addEventListener('click', navToggle);


// FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
    const faqContainer = document.querySelector('.faq-content');

    faqContainer.addEventListener('click', function (e) {
        const groupHeader = e.target.closest('.faq-group-header');

        if (!groupHeader) return;

        const group = groupHeader.parentElement;
        const groupBody = group.querySelector('.faq-group-body');
        const icon = groupHeader.querySelector('i');

        // Toggle icon
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');

        // Toggle visibility of Body
        groupBody.classList.toggle('open');

        // CLose other open FAQ bodies
        const otherGroups = faqContainer.querySelectorAll('.faq-group');
        otherGroups.forEach(function (otherGroup) {
            if (otherGroup !== group) {
                const otherGroupBody = otherGroup.querySelector('.faq-group-body');
                const otherIcon = otherGroup.querySelector('.faq-group-header i');

                otherGroupBody.classList.remove('open');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });    

    });
});



// price value
let btcNaira = document.getElementById('btcNaira');
let btcDollar = document.getElementById('btcDollar');
let btcMc = document.getElementById('btcMc');
let btcChange = document.getElementById('btcChange');
let ethNaira = document.getElementById('ethNaira');
let ethDollar = document.getElementById('ethDollar');
let ethMc = document.getElementById('ethMc');
let ethChange = document.getElementById('ethChange');
let dogeNaira = document.getElementById('dogeNaira');
let dogeDollar = document.getElementById('dogeDollar');
let dogeMc = document.getElementById('dogeMc');
let dogeChange = document.getElementById('dogeChange');
let solNaira = document.getElementById('solNaira');
let solDollar = document.getElementById('solDollar');
let solMc = document.getElementById('solMc');
let solChange = document.getElementById('solChange');
let busdNaira = document.getElementById('busdNaira');
let busdDollar = document.getElementById('busdDollar');
let busdMc = document.getElementById('busdMc');
let busdChange = document.getElementById('busdChange');

let previousData = {};
let myData = new XMLHttpRequest();

// Create a chart instance
// let ctx = document.getElementById('cryptoChart').getContext('2d');
// let cryptoChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Bitcoin', 'Ethereum', 'Dogecoin', 'Solana', 'USDT'],
//         datasets: [{
//             label: 'Price in USD',
//             data: [],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: { beginAtZero: false }
//         }
//     }
// });

setInterval(() => {
    myData.open('GET', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Csolana%2Ctether&vs_currencies=ngn%2Cusd&include_market_cap=true&precision=3');
    myData.onerror = function () { console.log('Error fetching data'); };
    myData.onload = function () {
        let newData = JSON.parse(myData.responseText);
        updateTableAndChart(newData);
    };
    myData.send();
}, 2000);

function updateTableAndChart(newData) {
    // Update table with new data
    btcNaira.innerHTML = `# ${newData.bitcoin.ngn}`;
    btcDollar.innerHTML = `$ ${newData.bitcoin.usd}`;
    btcMc.innerHTML = `$ ${newData.bitcoin.usd_market_cap}`;
    ethNaira.innerHTML = `# ${newData.ethereum.ngn}`;
    ethDollar.innerHTML = `$ ${newData.ethereum.usd}`;
    ethMc.innerHTML = `$ ${newData.ethereum.usd_market_cap}`;
    dogeNaira.innerHTML = `# ${newData.dogecoin.ngn}`;
    dogeDollar.innerHTML = `$ ${newData.dogecoin.usd}`;
    dogeMc.innerHTML = `$ ${newData.dogecoin.usd_market_cap}`;
    solNaira.innerHTML = `# ${newData.solana.ngn}`;
    solDollar.innerHTML = `$ ${newData.solana.usd}`;
    solMc.innerHTML = `$ ${newData.solana.usd_market_cap}`;
    busdNaira.innerHTML = `# ${newData.tether.ngn}`;
    busdDollar.innerHTML = `$ ${newData.tether.usd}`;
    busdMc.innerHTML = `$ ${newData.tether.usd_market_cap}`;

    // Calculate percentage change
    updatePercentageChange(btcChange, previousData.bitcoin?.usd, newData.bitcoin.usd);
    updatePercentageChange(ethChange, previousData.ethereum?.usd, newData.ethereum.usd);
    updatePercentageChange(dogeChange, previousData.dogecoin?.usd, newData.dogecoin.usd);
    updatePercentageChange(solChange, previousData.solana?.usd, newData.solana.usd);
    updatePercentageChange(busdChange, previousData.tether?.usd, newData.tether.usd);

    // Update chart data
    cryptoChart.data.datasets[0].data = [
        newData.bitcoin.usd,
        newData.ethereum.usd,
        newData.dogecoin.usd,
        newData.solana.usd,
        newData.tether.usd
    ];
    cryptoChart.update();

    // Store the current data for next comparison
    previousData = newData;
}

function updatePercentageChange(element, oldValue, newValue) {
    if (!oldValue) {
        element.innerHTML = "N/A";
    } else {
        let percentageChange = ((newValue - oldValue) / oldValue * 100).toFixed(2);
        element.innerHTML = `${percentageChange}%`;
    }
}

// remeber me tick box
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    var rememberMe = document.getElementById('rememberMe').checked;
    if (rememberMe) {
        // Code to handle "Remember Me" (usually setting a cookie)
        console.log('Remember Me checked');
    } else {
        // Code to handle not remembering the user
        console.log('Remember Me not checked');
    }
    // Code to handle form submission
};

// <!-- Add this script at the end of your body tag -->
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Over-lay toogle bton
function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    const footer = document.getElementById('footer');
    overlay.classList.toggle('show');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('no-scroll')
    footer.style.display = 'none';
}
  


