document.getElementById('startButton').addEventListener('click', () => {
  const hashtag = document.getElementById('hashtag').value;
  if (!hashtag) {
    document.getElementById('result').innerText = 'Please enter a hashtag.';
    return;
  }

  document.getElementById('startButton').disabled = true;
  document.getElementById('stopButton').disabled = false;
  document.getElementById('result').innerText = 'Counting posts...';
  console.log("Starting counting for hashtag:", hashtag);

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'startCounting', hashtag }, response => {
      if (!response || response.status !== 'started') {
        document.getElementById('result').innerText = 'Failed to start counting.';
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
      } else {
        console.log("Counting started successfully");
      }
    });
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  document.getElementById('startButton').disabled = false;
  document.getElementById('stopButton').disabled = true;
  console.log("Stopping counting");

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'stopCounting' }, response => {
      if (response && response.status === 'stopped') {
        document.getElementById('result').innerText = 'Stopped counting. Gathering results...';
      }
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'countResult') {
    console.log("Received results:", request.postCount);
    document.getElementById('result').innerText = `Number of posts with the hashtag: ${request.postCount}`;
  }
});
