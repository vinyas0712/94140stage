var ajax = [
	'https://jsonplaceholder.typicode.com/todosdsds/1',
	'https://portal.catchpoint.com/m/g',
	'https://jsonplaceholder.typicode.com/todos/2',
	'https://jsonplaceholder.typicode.com/todos/3',
	'https://dummyjson.com/products/1',
	'https://dummyjson.com/products/2',
	'https://dummyjson.com/products/3',
	'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
];

function makeAjaxCall() {
	ajax.forEach((a) => {
		fetch(a)
			.then(x => console.log(x))
			.catch(e => console.error('Fetch error:', e));
	});
}

const button = document.getElementById('button');
button.addEventListener('click', function () {
	makeAjaxCall();
});

function jsErrorFunc() {
	// console.log('function called')
	// throw new Error('test error');
	eval('var x = ;');
};

const button1 = document.getElementById('button1');
button1.addEventListener('click', function () {
	jsErrorFunc();
});

function promiseErrorFunc() {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then(x => console.log(a)) // 'a' is undefined – triggers reference error
		.catch(err => console.error('Promise error:', err));
};

const button2 = document.getElementById('button2');
button2.addEventListener('click', function () {
	promiseErrorFunc();
});

/// ✅ Inject NEL + Report-To Headers
function addingNELHeader() {
	const reportToHeader = {
		group: "network-errors",
		max_age: 2592000,
		endpoints: [{ url: "https://r.3gl.net/hawklogserver/94140/re.p" }]
	};

	const nelHeader = {
		report_to: "network-errors",
		max_age: 2592000,
		success_fraction: 0,
		failure_fraction: 1.0,
		include_subdomains: true
	};

	fetch('https://jsonplaceholder.typicode.com/this-will-fail', {
		headers: {
			"Report-To": JSON.stringify(reportToHeader),
			"NEL": JSON.stringify(nelHeader)
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(err => console.error('NEL fetch error:', err));
}

const button3 = document.getElementById('nel-btn');
button3.addEventListener('click', function () {
	addingNELHeader();
});

/// 🚫 Simulate Network Drop (TCP reset-style)
function simulateNetworkDrop() {
	const controller = new AbortController();
	const signal = controller.signal;

	fetch('https://dummyjson.com/products/1', { signal })
		.then(res => res.json())
		.then(data => console.log('Response:', data))
		.catch(err => {
			if (err.name === 'AbortError') {
				console.error('Simulated network drop (aborted request)');
			} else {
				console.error('Fetch error:', err);
			}
		});

	setTimeout(() => {
		controller.abort(); // Abort request mid-way
	}, 100); // Simulate drop after 100ms
}

const networkDropBtn = document.getElementById('network-drop-btn');
networkDropBtn.addEventListener('click', function () {
	simulateNetworkDrop();
});
