// Opera 8.0+
export const IS_OPERA = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
export const IS_FIREFOX = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
export const IS_SAFARI = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof IS_SAFARI !== 'undefined' && IS_SAFARI.pushNotification));

// Internet Explorer 6-11
export const IS_IE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
export const IS_EDGE = !IS_IE && !!window.StyleMedia;

// Chrome 1+
export const IS_CHROME = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
export const IS_BLINK = (IS_CHROME || IS_OPERA) && !!window.CSS;

export const CAN_SPEAK = IS_CHROME && !!window.speechSynthesis;