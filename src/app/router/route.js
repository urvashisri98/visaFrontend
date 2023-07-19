import GetEnquiry from "../enquiry/addEnquiry";

ReactDOM.render((
    <Router history = {browserHistory}>
       <Route path = "/" component = {App}>
          <IndexRoute component = {Home} />
          <Route path = "home" component = {Home} />
          <Route path = "about" component = {About} />
          <Route path = "contact" component = {Contact} />
          <Route path = "getEnquiry" component = {GetEnquiry} />
       </Route>
    </Router>
 ), document.getElementById('app'))