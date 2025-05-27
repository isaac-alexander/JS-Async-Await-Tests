// JavaScript function that takes a callback and invokes it after a delay of 5 seconds.

function invokeAfterDelay(callback) {
  setTimeout(() => {
    callback();
  }, 5000); // Delay of 5000 milliseconds = 5 seconds
}


// JavaScript function that converts a callback-based function to a Promise-based function.

// JavaScript function that makes an HTTP GET request to 'https://dummyjson.com/quotes' and returns a Promise that resolves with the response data.

function getQuotes() {
  return fetch('https://dummyjson.com/quotes')
    .then(response => response.json()) // Convert response to JSON
    .then(data => data) // Return the data
    .catch(error => console.log('Error:', error)); // Handle errors
}

// Example usage
getQuotes().then(quotes => console.log(quotes));


// JavaScript function that takes an array of URLs ('https://dummyjson.com/quotes/1', 'https://dummyjson.com/quotes/2', 'https://dummyjson.com/quotes/3') and returns the results of each URL in parallel using Promises.

function getMultipleQuotes(urls) {
  const fetches = urls.map(url =>
    fetch(url).then(res => res.json()) // Fetch and convert to JSON
  );
  return Promise.all(fetches); // Wait for all to finish
}

const urls = [
  'https://dummyjson.com/quotes/1',
  'https://dummyjson.com/quotes/2',
  'https://dummyjson.com/quotes/3'
];

getMultipleQuotes(urls).then(results => {
  console.log(results);
});


// JavaScript function that fetches data from API 'https://dummyjson.com/quotes/987654321' and retries the request 3 times if it fails.