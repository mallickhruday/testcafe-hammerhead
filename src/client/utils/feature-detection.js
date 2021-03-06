import nativeMethods from '../sandbox/native-methods';
import * as browserUtils from './browser';

const form     = nativeMethods.createElement.call(document, 'form');
const elements = nativeMethods.getElementsByName.call(document, '');

// NOTE: In some browsers, elements without the url attribute return the location url
// when accessing this attribute directly. See form.action in Edge 25 as an example.
export const emptyActionAttrFallbacksToTheLocation = nativeMethods.formActionGetter.call(form) ===
                                                     window.location.toString();

// NOTE: In Chrome, toString(window) equals '[object Window]' and toString(Window.prototype) equals '[object Blob]',
// this condition is also satisfied for Blob, Document, XMLHttpRequest, etc
export const instanceAndPrototypeToStringAreEqual = nativeMethods.objectToString.call(window) ===
                                                    nativeMethods.objectToString.call(Window.prototype);

export const hasTouchEvents = 'ontouchstart' in window;

// NOTE: We need to check touch points only for IE, because it has PointerEvent and MSPointerEvent (IE10, IE11)
// instead of TouchEvent (T109295).
export const hasTouchPoints = browserUtils.isIE && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
export const isTouchDevice  = (browserUtils.isMobile || browserUtils.isTablet) && hasTouchEvents;

export const hasDataTransfer = !!window.DataTransfer;

// NOTE: In the Edge 17, the getNamedItem method of attributes object is not enumerable
export const attrGetNamedItemIsNotEnumerable = nativeMethods.objectGetOwnPropertyDescriptor
    .call(window.Object, NamedNodeMap.prototype, 'getNamedItem');

// Both IE and Edge return an HTMLCollection, not a NodeList
export const getElementsByNameReturnsHTMLCollection = nativeMethods.objectGetPrototypeOf.call(window.Object, elements) ===
                                                      nativeMethods.HTMLCollection.prototype;
