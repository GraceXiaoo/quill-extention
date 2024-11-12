chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    
    chrome.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: true
    });
});
// 添加消息监听器以处理 API 请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "quoteRephraseBtn") {
    const text = request.text;
    fetch(`http://10.176.40.139:8090/api/quill/${text}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
              return response.json();
          })
          .then(data => sendResponse(data))
          .catch(error => {
              console.error('Error fetching users:', error);
              sendResponse({ error: 'Failed to fetch users' });
          });
      return true; // 表示将使用异步响应
  }
});
// 添加消息监听器以处理 API 请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "rephraseBtn") {
    const text = request.text;
    fetch(`http://10.176.40.139:8090/api/rephrase/${text}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
              return response.json();
          })
          .then(data => sendResponse(data))
          .catch(error => {
              console.error('Error fetching users:', error);
              sendResponse({ error: 'Failed to fetch users' });
          });
      return true; // 表示将使用异步响应
  }
});
