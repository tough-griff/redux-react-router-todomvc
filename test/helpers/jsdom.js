import { jsdom } from 'jsdom';

global.document = jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
