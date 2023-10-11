var injectedHTML = 

  // Dark overlay
  `<div className="sweet-overlay" tabIndex="-1"></div>` +

  // Modal
  `<div className="sweet-alert">` +

    // Error icon
    `<div className="sa-icon sa-error">
      <span className="sa-x-mark">
        <span className="sa-line sa-left"></span>
        <span className="sa-line sa-right"></span>
      </span>
    </div>` +

    // Warning icon
    `<div className="sa-icon sa-warning">
      <span className="sa-body"></span>
      <span className="sa-dot"></span>
    </div>` +

    // Info icon
    `<div className="sa-icon sa-info"></div>` +

    // Success icon
    `<div className="sa-icon sa-success">
      <span className="sa-line sa-tip"></span>
      <span className="sa-line sa-long"></span>

      <div className="sa-placeholder"></div>
      <div className="sa-fix"></div>
    </div>` +

    `<div className="sa-icon sa-custom"></div>` +

    // Title, text and input
    `<h2>Title</h2>
    <p>Text</p>
    <fieldset>
      <input type="text" tabIndex="3" />
      <div className="sa-input-error"></div>
    </fieldset>` +

    // Input errors
    `<div className="sa-error-container">
      <div className="icon">!</div>
      <p>Not valid!</p>
    </div>` +

    // Cancel and confirm buttons
    `<div className="sa-button-container">
      <button className="cancel" tabIndex="2">Cancel</button>
      <div className="sa-confirm-button-container">
        <button className="confirm" tabIndex="1">OK</button>` + 

        // Loading animation
        `<div className="la-ball-fall">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>` +

  // End of modal
  `</div>`;

export default injectedHTML;
