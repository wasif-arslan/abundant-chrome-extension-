document.getElementById('countButton').addEventListener('click', () => {
  const hashtag = document.getElementById('hashtag').value;
  if (!hashtag) {
    document.getElementById('result').innerText = 'Please enter a hashtag.';
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'countHashtagPosts', hashtag }, response => {
      if (response.status === 'counting') {
        document.getElementById('result').innerText = 'Counting posts...';
      }
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'countResult') {
    document.getElementById('result').innerText = `Number of posts with #${request.count}`;
  }
});
