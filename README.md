# Automatically strip zero width characters

I built this for fun and to learn how chrome extensions worked.  I was inspired (and forked the original code from) chpmrc's [extension to replace zero width characters with emojis] (https://github.com/chpmrc/zero-width-chrome-extension) when I realized how useful it would be to have an extension that would strip these characters out without manual effort. 

This chrome extension automatically strips out the following zero width characters:
* U+200B
* U+200C
* U+FEFF
* U+200D -- disabled by default as it breaks certain characters and emojis.  Can be enabled in the extension's options.

You can install it as an "unpacked" extension or [from the Chrome Web Store](https://chrome.google.com/webstore/).

Once you've installed it you can verify it's working by visiting [Umpox's zero width demo page] (https://umpox.github.io/zero-width-detection/) and verify your "username" is no longer detected
![screenshot](https://user-images.githubusercontent.com/7017713/38451133-7b673f1c-39f8-11e8-8d77-3811e8f14003.png)

Here's the extension in action:
![demo](https://user-images.githubusercontent.com/7017713/38451471-660aabee-39fe-11e8-90f0-26830285c738.gif)
