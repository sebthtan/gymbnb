import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignupFormPage'
import Navigation from './components/Navigation'
import * as sessionActions from "./store/session";
import HomePage from './components/HomePage'
import SearchResultsPage from './components/SearchResultsPage'
import ListingPage from './components/ListingPage'
import { getListings } from './store/listings'
import AddReviewPage from './components/AddReviewPage'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    dispatch(getListings())

  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/search/'>
            <SearchResultsPage />
          </Route>
          <Route exact path='/listings/:listingId'>
            <ListingPage />
          </Route>
          <Route exact path='/listings/:listingId/reviews/add'>
            <AddReviewPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
