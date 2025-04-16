// Register the service worker after the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker registered'))
      .catch(err => console.error('Service worker registration failed:', err));
  }
});

// List of AJAX endpoints
var ajax = [
  'https://jsonplaceholder.typicode.com/todosdsds/1',
  'https://portal.catchpoint.com/m/g',
  'https://jsonplaceholder.typicode.com/todos/2'
];

// Function to make AJAX calls
function makeAjaxCall() {
  ajax.forEach((a) => {
    fetch(a)
      .then(x => console.log(x))
      .catch(e => console.error('Fetch error:', e));
  });
}

// Event listener for the "Trigger Ajax" button
document.getElementById('button').addEventListener('click', makeAjaxCall);

// Function to trigger a JS error (syntax error)
function jsErrorFunc() {
  eval('var x = ;'); // JS syntax error
}

// Event listener for the "JS Error" button
document.getElementById('button1').addEventListener('click', jsErrorFunc);

// Function to trigger a promise error (undefined variable 'a')
function promiseErrorFunc() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(x => console.log(a)) // 'a' is undefined
    .catch(err => console.error('Promise error:', err));
}

// Event listener for the "Promise Error" button
document.getElementById('button2').addEventListener('click', promiseErrorFunc);

// Function to simulate an NEL error (fetch failure)
function addingNELHeader() {
  // Simulating NEL-style logging by calling a failed endpoint
  fetch('https://jsonplaceholder.typicode.com/this-will-fail')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
      console.error('NEL fetch error:', err);

      // Log to external endpoint
      fetch('https://r.3gl.net/hawklogserver/94140/re.p', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'simulated-nel',
          url: 'https://jsonplaceholder.typicode.com/this-will-fail',
          timestamp: Date.now()
        })
      });
    });
}

// Event listener for the "NEL Error" button
document.getElementById('nel-btn').addEventListener('click', addingNELHeader);
