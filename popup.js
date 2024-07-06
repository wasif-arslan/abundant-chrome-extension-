// Example of obtaining user access token in Chrome extension popup.js

document.getElementById('loginButton').addEventListener('click', async () => {
  const appId = '1782448035498130';
  const redirectUri = 'https://localhost/';
  const scope = 'pages_read_engagement'; // Adjust scope as per your app's requirements

  // Construct OAuth dialog URL
  const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}`;

  // Open a new tab to initiate Facebook Login
  chrome.tabs.create({ url: authUrl }, tab => {
    // Listen for changes in the tab URL to capture the access token
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.url && changeInfo.url.startsWith(redirectUri)) {
        // Parse access token from the URL fragment
        const url = new URL(changeInfo.url);
        const accessToken = url.searchParams.get('access_token');

        // Save the access token securely (e.g., using chrome.storage.local)
        chrome.storage.local.set({ accessToken }, () => {
          console.log('Access token saved:', accessToken);
          // Close the tab or handle further logic
          chrome.tabs.remove(tab.id);
        });

        // Remove the listener to avoid multiple executions
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
});
