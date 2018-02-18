import React, { Component } from 'react';
import './App.css';

class CustomLessonSetup extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">Create a custom lesson</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mw-568">
            <p>To start a custom lesson, supply a list of words and their strokes. An easy way to create a lesson is to copy columns from a spreadsheet.</p>
            <p>See the <a className="" href="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing" target="_blank" rel="noopener noreferrer">community's lessons (opens in new tab)</a>.</p>
            <label htmlFor="your-material">Paste your material here:</label>
          </div>
          <p className="mw-568">
            <textarea
              id="your-material"
              className="input-textarea mw100 w-100 overflow-scroll"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="example	KP-PL
consisting of	KAOFG
examples.	KP-PLS TP-PL"
              rows="8"
              wrap="off"
              onChange={this.props.createCustomLesson}
              >
            </textarea>
          </p>
          <ul className="text-small ml1 mt1">
            <li>Each word must be on its own line.</li>
            <li>Each word must be separated from its stroke by a "Tab" character.</li>
            <li>If you skip strokes, multi-stroke words may count as misstrokes.</li>
          </ul>
        </div>
      </main>
    )
  }

}

export default CustomLessonSetup;