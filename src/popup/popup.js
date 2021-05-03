import './popup.scss';

chrome.storage.sync.get(['options'], ({ options }) => {
  if (options && options.url) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', options.url);
    iframe.setAttribute('height', options.height || '300');
    iframe.setAttribute('width', options.width || '300');
    iframe.setAttribute('frameborder', '0');
    document.body.appendChild(iframe);

    if (options.hideHeader) {
      document.body.style.marginTop = `-${+options.headerHeight}px`;
    }
    document.body.style.width = `${options.width || '300'}px`;
    document.body.style.height = `${options.height || '300'}px`;
  } else {
    let alert = document.getElementById('alert');
    alert.classList.remove('is-hidden');
  }
});
