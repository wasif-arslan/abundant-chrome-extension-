function countHashtagPosts(hashtag) {
  let count = 0;
  let lastHeight = 0;

  function checkPosts() {
    document.querySelectorAll('div[data-ad-comet-preview="message"]').forEach(post => {
      if (post.innerText.includes(`#${hashtag}`)) {
        count++;
      }
    });

    const newHeight = document.body.scrollHeight;
    if (newHeight > lastHeight) {
      lastHeight = newHeight;
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(checkPosts, 2000); // Wait 2 seconds for new posts to load
    } else {
      chrome.runtime.sendMessage({ action: 'countResult', count });
    }
  }

  checkPosts();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "countHashtagPosts") {
    countHashtagPosts(request.hashtag);
    sendResponse({ status: 'counting' });
  }
});
