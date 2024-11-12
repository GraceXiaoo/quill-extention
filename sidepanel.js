document.addEventListener('DOMContentLoaded', () => {
    const rephraseBtn = document.getElementById('rephraseBtn');
    const quoteRephraseBtn = document.getElementById('quoteRephraseBtn');
    const outputContainer = document.getElementById('outputText');
    const inputText = document.getElementById('inputText');
  
    if (!rephraseBtn || !quoteRephraseBtn || !outputContainer || !inputText) {
      console.error('One or more elements could not be found.');
      return;
    }
    quoteRephraseBtn.addEventListener('click', () => {
      if (inputText.value.trim() === '') {
        alert('Please enter some text!');
        return;
      };
    chrome.runtime.sendMessage({ action: "quoteRephraseBtn", text: inputText.value }, (response) => {
        outputContainer.innerHTML = ''; // 清空旧数据
        if (response.error) {
            outputContainer.innerHTML = `<li>${response.error}</li>`;
            return;
        }
        //多个text的话
        response.forEach(res => {
    
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('output-container');
        
  
        const resultText = document.createElement('span');
        resultText.classList.add('output-text');
        resultText.innerHTML = res.suggestion;


        resultDiv.appendChild(resultText);

        outputContainer.appendChild(resultDiv);
    });
    });
});
  
      //const rephrasedTexts = [
        //`Rephrased Text 1 for: ${inputText.value}`,
        //`Rephrased Text 2 for: ${inputText.value}`,
        //`Rephrased Text 3 for: ${inputText.value}`
      //];
  
      //displayResults(rephrasedTexts);
    //});
  
    rephraseBtn.addEventListener('click', () => {
      if (inputText.value.trim() === '') {
        alert('Please enter some text!');
        return;
      };
      chrome.runtime.sendMessage({ action: "rephraseBtn", text: inputText.value }, (response) => {
        outputContainer.innerHTML = ''; // 清空旧数据
        if (response.error) {
            outputContainer.innerHTML = `<li>${response.error}</li>`;
            return;
        }
        //多个text的话
        response.forEach(res => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('output-container');
        
  
        const resultText = document.createElement('span');
        
        resultText.classList.add('output-text');
        resultText.innerHTML = res.suggestion;
      


        resultDiv.appendChild(resultText);

        outputContainer.appendChild(resultDiv);
        });
    });
});
  
  
    function displayResults(texts) {
      outputContainer.innerHTML = ''; // 清空之前的结果
  
      texts.forEach(text => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
  
        const resultText = document.createElement('p');
        resultText.textContent = text;
  
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.classList.add('copy-btn');
  
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
          });
        });
  
        resultDiv.appendChild(resultText);
        resultDiv.appendChild(copyBtn);
        outputContainer.appendChild(resultDiv);
      });
    }
  });