let counting = false;
let postCount = 0;
let lastHeight = 0;

function countHashtagPosts(hashtag) {
  function checkPosts() {
    console.log("Checking posts...");

    document.querySelectorAll('div[data-ad-comet-preview="message"]').forEach(post => {
      if (post.innerText.includes(`#${hashtag}`)) {
        postCount++;
      }
    });

    const newHeight = document.body.scrollHeight;
    if (newHeight > lastHeight && counting) {
      lastHeight = newHeight;
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(checkPosts, 2000); // Wait 2 seconds for new posts to load
    } else {
      console.log("Stopping counting. Total posts found:", postCount);
      chrome.runtime.sendMessage({ action: 'countResult', postCount });
    }
  }

  checkPosts();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startCounting") {
    console.log("Starting counting for hashtag:", request.hashtag);
    counting = true;
    postCount = 0;  // Reset post count
    lastHeight = 0;   // Reset last height
    countHashtagPosts(request.hashtag);
    sendResponse({ status: 'started' });
  } else if (request.action === "stopCounting") {
    console.log("Stopping counting");
    counting = false;
    sendResponse({ status: 'stopped' });
  } else {
    sendResponse({ status: 'unknown' });
  }
});
