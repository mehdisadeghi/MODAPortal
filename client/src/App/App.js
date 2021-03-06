import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import './App.css'
import DevTools from './components/DevTools'
import Header from './components/Header'
import Footer from './components/Footer'
import AppAlert from './components/AppAlert'
import * as appActions from "./AppActions"
import * as authActions from '../Auth/AuthActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
// See: https://github.com/facebookincubator/create-react-app/issues/614
window.jQuery = $
require('bootstrap')


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMounted: false}
  }

  componentDidMount() {
    this.setState({isMounted: true})
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <Helmet
          title="MODA Portal"
          titleTemplate="%s - FORCE"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
          ]}
        >
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/spacelab/bootstrap.min.css" />
        </Helmet>

        { this.props.authenticated?
          <Header
            toggleAddModa={this.props.toggleAddModa}
            hideForms={this.props.hideForms}
            logout={this.props.manualLogout}
            authenticated={this.props.authenticated}
            user={this.props.user}
            navActions={this.props.navActions}
          />
          :null
        }

        <div className='container' style={{paddingTop: '52px'}}>
          { this.props.message && 
            <div className="row" style={{paddingTop: '1em'}}>
              <div className="col">
                <AppAlert alertStyle={this.props.message.style} alertTitle={this.props.message.title} alertText={this.props.message.text} />
              </div>
            </div>
          }
          {this.props.children}
        </div>

        { this.props.authenticated? <Footer />: null }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  toggleAddModa: PropTypes.func.isRequired,
  hideForms: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  navActions: PropTypes.array,
  message: PropTypes.shape({
    style: PropTypes.string, // bootstrap types: alert-info, alert-success, alert-danger, etc.
    text: PropTypes.string.isRequired,
  })
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    navActions: state.app.navActions,
    message: state.app.message
  }
}

// Read more on connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(
  mapStateToProps,
  Object.assign(appActions, authActions)
)(App)
