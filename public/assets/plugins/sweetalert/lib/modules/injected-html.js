"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div className=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div className=\"sweet-alert\">" +

// Error icon
"<div className=\"sa-icon sa-error\">\n      <span className=\"sa-x-mark\">\n        <span className=\"sa-line sa-left\"></span>\n        <span className=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div className=\"sa-icon sa-warning\">\n      <span className=\"sa-body\"></span>\n      <span className=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div className=\"sa-icon sa-info\"></div>" +

// Success icon
"<div className=\"sa-icon sa-success\">\n      <span className=\"sa-line sa-tip\"></span>\n      <span className=\"sa-line sa-long\"></span>\n\n      <div className=\"sa-placeholder\"></div>\n      <div className=\"sa-fix\"></div>\n    </div>" + "<div className=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div className=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div className=\"sa-error-container\">\n      <div className=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div className=\"sa-button-container\">\n      <button className=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div className=\"sa-confirm-button-container\">\n        <button className=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div className=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];