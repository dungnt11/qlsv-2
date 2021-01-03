const urlToBlob = (url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.onerror = (err) => reject(err);
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  });

export {urlToBlob};
