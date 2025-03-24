document.getElementById('searchButton').addEventListener('click', () => {
    const className = document.getElementById('classNameInput').value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
  
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: getElementsByClassName,
        args: [className]
      }, (results) => {
        if (chrome.runtime.lastError) {
          document.getElementById('result').textContent = 'エラーが発生しました。';
          return;
        }
        const elements = results[0].result;
        let resultHTML = '';
        elements.forEach(element => {
        });
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            resultHTML += `<p>${i+1}.${element.tagName}: ${element.textContent}</p>`;
        }
        document.getElementById('result').innerHTML = resultHTML;
      });
    });
  });
  
  function getElementsByClassName(className) {
    const elements = document.querySelectorAll(`.${className}`);
    return Array.from(elements).map(element => ({
      tagName: element.tagName,
      textContent: element.textContent
    }));
  }