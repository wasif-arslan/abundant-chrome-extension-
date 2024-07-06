// content.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startMonitoring') {
    console.log('Start monitoring request received.');
    // Implement logic to monitor posts or interact with Facebook DOM
    // Example: Monitor posts containing #dreamstolegacy
    const hashtag = '#dreamstolegacy';
    const posts = document.querySelectorAll(`div[role="article"]:not([data-monitored])`);
    posts.forEach(post => {
      const postContent = post.innerText.toLowerCase();
      if (postContent.includes(hashtag)) {
        // Track post for points attribution
        post.setAttribute('data-monitored', true);
      }
    });
    chrome.runtime.sendMessage({ action: 'statusUpdate', status: 'Monitoring started.' });
  } else if (message.action === 'stopMonitoring') {
    console.log('Stop monitoring request received.');
    // Implement logic to stop monitoring if necessary
    chrome.runtime.sendMessage({ action: 'statusUpdate', status: 'Monitoring stopped.' });
  }
});
