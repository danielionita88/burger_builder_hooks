import React, { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const Auth = React.lazy(() => import('./containers/Auth/Auth'));


const app = () => {

  useEffect(() => {
    props.onTryAutoSignup()
  }, []);


  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <div >
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
