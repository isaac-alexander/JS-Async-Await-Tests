// JavaScript function that takes a callback and invokes it after a delay of 5 seconds.

function invokeAfterDelay(callback) {
    setTimeout(() => {
        callback();
    }, 5000); // Delay of 5000 milliseconds = 5 seconds
}


// JavaScript function that converts a callback-based function to a Promise-based function.

function convertToPromise(callbackFunc) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            callbackFunc(...args, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

function add(a, b, callback) {
    setTimeout(() => callback(null, a + b), 1000);
}

const addPromise = convertToPromise(add);
addPromise(2, 3).then(console.log);


// JavaScript function that makes an HTTP GET request to 'https://dummyjson.com/quotes' and returns a Promise that resolves with the response data.

function getQuotes() {
    return fetch('https://dummyjson.com/quotes')
        .then(response => response.json()) // Convert response to JSON
        .then(data => data) // Return the data
        .catch(error => console.log('Error:', error)); // Handle errors
}

getQuotes().then(quotes => console.log(quotes));


// JavaScript function that takes an array of URLs ('https://dummyjson.com/quotes/1', 'https://dummyjson.com/quotes/2', 'https://dummyjson.com/quotes/3') and returns the results of each URL in parallel using Promises.

const urls = [
    'https://dummyjson.com/quotes/1',
    'https://dummyjson.com/quotes/2',
    'https://dummyjson.com/quotes/3'
];

function getMultipleQuotes(urls) {
    const fetches = urls.map(url =>
        fetch(url).then(res => res.json()) // Fetch and convert to JSON
    );
    return Promise.all(fetches); // Wait for all to finish
}


getMultipleQuotes(urls).then(results => {
    console.log(results);
});


// JavaScript function that fetches data from API 'https://dummyjson.com/quotes/987654321' and retries the request 3 times if it fails.

function getWithRetry(url, tries = 3) {
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Failed');
            return res.json();
        })
        .catch(error => {
            if (tries > 1) {
                console.log(`Retrying... (${tries - 1} tries left)`);
                return getWithRetry(url, tries - 1); 
            } else {
                console.log('Failed after 3 tries.');
                throw error;
            }
        });
}

getWithRetry('https://dummyjson.com/quotes/987654321')
    .then(data => console.log(data))
    .catch(error => console.log('Final Error:', error));
