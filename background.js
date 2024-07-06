// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
  
    // Set up daily task using alarms API
    chrome.alarms.create('dailyMonitor', {
      when: Date.now(),
      periodInMinutes: 24 * 60 // Run daily
    });
  });
  
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'dailyMonitor') {
      console.log('Daily monitoring triggered.');
      // Fetch posts and issue points here
      fetchAndIssuePoints();
    }
  });
  
  async function fetchAndIssuePoints() {
    const hashtag = 'dreamstolegacy';
    const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
  
    try {
      const response = await fetch(`https://graph.facebook.com/v13.0/me/feed?q=%23${hashtag}&access_token=${accessToken}&fields=id,message,from,created_time&limit=100`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts.');
      }
      const posts = await response.json();
      const memberPoints = processPosts(posts.data);
      storePoints(memberPoints);
    } catch (error) {
      console.error('Error fetching or processing posts:', error);
    }
  }
  
  function processPosts(posts) {
    let memberPoints = {};
  
    posts.forEach(post => {
      const userId = post.from.id;
      // Add logic to determine if the user is a member and attribute points
      if (memberPoints[userId]) {
        memberPoints[userId]++;
      } else {
        memberPoints[userId] = 1;
      }
    });
  
    return memberPoints;
  }
  
  function storePoints(memberPoints) {
    // Implement storage logic (e.g., using chrome.storage API)
    console.log('Points issued to members:');
    console.log(memberPoints);
  }
  