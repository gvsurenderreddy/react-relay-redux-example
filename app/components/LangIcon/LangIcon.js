import React from 'react';

export default class LangIcon extends React.Component {
  render() {
    return (
      <span className={"flag-icon flag-icon-" + this.props.language}></span>
    )
  }
}
