function saveOptions() {
  let status = document.getElementById('saved-options');
  const stripZwj = document.getElementById('zwj-dropdown').value;

  status.textContent = '';

  chrome.storage.sync.set({stripZwj: stripZwj}, () => {
    status.textContent = 'Options saved.';
  });
}

// set the dropdown value to whatever is set in storage
// default to false if unset
function restoreOptions() {
  chrome.storage.sync.get({stripZwj: 'false'}, (items) => {
    document.getElementById('zwj-dropdown').value = items.stripZwj;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-options-button').addEventListener('click', saveOptions);
