let counter = 0;

walk(document.body);

function walk(node) {
  // I stole this function from here:
  // https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js
  // who stole it from here:
	// http://is.gd/mwZp7E
	
	let child, next;
	
  if (node.nodeName.toLowerCase() == 'input' || node.nodeName.toLowerCase() == 'textarea'
      || (node.classList && node.classList.contains('ace_editor'))) {
		return;
  }

	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

    case 3: // Text node
      if (node.parentElement.nodeName.toLowerCase() !== "script") {
        handleText(node);
      }
      break;
  }
}

function handleText(textNode) {
  /*
  Zero width characters (thanks to https://r12a.github.io/app-conversion/ !):
    - \u200B === &#8203; === %E2%80%8B
    - \u200C === &#8204; === %E2%80%8C
    - \u200D === &#8205; === %E2%80%8D <--  can be turned on via options.  Enabling stripping this
                                            will break certain emojis and languages like arabic.
                                            See https://en.wikipedia.org/wiki/Zero-width_joiner
    - \uFEFF === &#65279; === %EF%BB%BF

  */
  let zeroWidthChars = ['\uFEFF', '\u200B', '\u200C']

  // if the user has set strip \u200D to true then add \u200D to the array of zero width characters
  chrome.storage.sync.get({stripZwj: 'false'}, (obj => {
   if (obj.stripZwj === 'true') zeroWidthChars.push('\u200D');
  }));

  const zeroWidthCharRegexes = zeroWidthChars.map(zwc => new RegExp(zwc, 'g'));
  const oldValue = textNode.nodeValue;
  let v = textNode.nodeValue;
  
  zeroWidthCharRegexes.forEach(expression => {
    v = v.replace(expression, () => {
      counter++;
      return '';
    });
    
    if (v !== oldValue) {
      textNode.nodeValue = v;
      chrome.runtime.sendMessage({type: 'updateBadge', text: counter})
    }
  })
}

// watch the page for new changes.  Needed for pages that lazy load, pages with infinite scroll, etc...
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'childList') {
      walk(m.target);
    } else if (m.target.nodeType === 3) {
      handleText(m.target);
    }
  });
});

// Observe and walk changes to the page
observer.observe(document.body, {
  subtree: true,
  attributes: false,
  characterData: true,
  childList: true
});
