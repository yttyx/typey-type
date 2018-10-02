import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';

class DictionariesIndex extends Component {

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    const linkList = this.props.dictionaryIndex.map( (dictionary) => {
      return(
        <li className="unstyled-list-item" key={ dictionary.path }>
          <Link to={`${this.props.match.url}${dictionary.path}`.replace(/path\.txt$/,'').replace(/\/{2,}/g,'/')} id={'ga--dictionary-index-'+dictionary.path.replace(/\/dictionary\.txt/g,'').replace(/[/.]/g,'-')}>{dictionary.title}</Link>
        </li>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Dictionaries</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <h3>Custom dictionaries</h3>
          <p>To help the open steno community and Typey&nbsp;Type grow even faster, add your custom dictionaries to the{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="Stenodict"
              to="http://www.openstenoproject.org/stenodict/"
              target="_blank">
              Stenodict
              <Tooltip
                title="Opens in a new tab"
                animation="shift"
                arrow="true"
                className=""
                duration="200"
                tabIndex="0"
                tag="span"
                theme="didoesdigital"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip>
            </GoogleAnalytics.OutboundLink>.
          </p>

          <h3>Dictionaries</h3>
          <ul className="unstyled-list">{linkList}</ul>

          <p>Want to add another dictionary to this list?{' '}
            <GoogleAnalytics.OutboundLink
              eventLabel="Typey Type for Stenographers dictionary feedback form"
              aria-label="Share your feedback (form opens in new tab)"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your dictionary
              <Tooltip
                title="(form opens in new tab)"
                animation="shift"
                arrow="true"
                className=""
                duration="200"
                tabIndex="0"
                tag="span"
                theme="didoesdigital"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip>
            </GoogleAnalytics.OutboundLink>.
          </p>
        </div>
      </main>
    )
  }
}

export default DictionariesIndex;