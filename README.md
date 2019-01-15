# pbi-pages
A custom navigation UI for Power BI Embedded mobile reports

# Why should I use this?
When using Power BI Embedded to embed reports in mobile mode, the API expects you to handle navigation programatically. This dependency-free, Vanilla JS plugin takes care of that by appending a page navigator to the DOM and calling the API functions responsible for page navigation on user click. It was made to mimic the desktop report page navigation, but the source CSS is available for you to customize it.

# Demo
Live demo available at [https://rschpdr.github.io/pbi-pages/][1]. 

# Installation
Just grab the `src` folder, put it into you project folder, and import it into your project. If you're not using a ES6 transpiler you might need to edit the export default statement, I think.

# How to Use
The source js file exports a `pbiPages` function that accepts two arguments: your generated report and a configuration object. To learn how to generate a report object, refer to the official Power BI Javascript docs [here][2].
The conf object currently has two keys:
- `el`: reference to the DOM element that the plugin will try to append itself. Defaults to a div with id `pbiPagesContainer`;
- `defaultPage`: int that defines what page the plugin will try to load first. Defaults to 1. The report has an array with all it's available pages, so you should check that array to see what page you want to load first. 

Example:

```
import * as pbi from 'powerbi-client';
import pbiPages from './src/pbi-pages.js';

// Power BI stuff here 

// Embed the report and display it within the div container.
const report = powerbi.embed(document.querySelector('.report'), config);

// Pass the newly created report object to the plugin
pbiPages(report);
```


[1]: https://rschpdr.github.io/pbi-pages/ "Power BI Custom Navigation live demo"
[2]: https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embedding-Basics "Power BI Javascript API Wiki"
