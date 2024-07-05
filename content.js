chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "countHashtagPosts") {
      const hashtag = request.hashtag;
      let count = 0;
  
      document.querySelectorAll('div[data-ad-comet-preview="message"]').forEach(post => {
        if (post.innerText.includes(`#${hashtag}`)) {
          count++;
        }
      });
  
      sendResponse({ count });
    }
  });
  