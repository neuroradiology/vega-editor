import React from 'react';
import SpecEditor from './spec-editor';
import CompiledSpecDisplay from './compiled-spec-display';
import Debug from './debug';
import SplitPane from 'react-split-pane';
import { MODES } from '../../constants';
import { connect } from 'react-redux';

class InputPanel extends React.Component {

  getInnerPanes () {
    const { mode, debug } = this.props;
    const innerPanes = [<SpecEditor key='editor' />];
    if (mode === MODES.VegaLite) {
      innerPanes.push(<CompiledSpecDisplay key='compiled' />);
    }
    if (debug) {
      innerPanes.push(<Debug key='debug' />);
    }

    return innerPanes;
  }

  render () {
    const innerPanes = this.getInnerPanes();

    let outerComponent;
    if (innerPanes.length > 1) {
      outerComponent = React.createElement(SplitPane, {
          split: 'horizontal'
      }, innerPanes);
    } else {
      outerComponent = React.createElement('div', {}, innerPanes);
    }

    return outerComponent;
  };
};



function mapStateToProps (state, ownProps) {
  return {
    mode: state.app.mode,
    debug: state.app.debug
  };
}

export default connect(mapStateToProps)(InputPanel);