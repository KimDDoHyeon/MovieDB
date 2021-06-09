import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './pages/main';
import Header from './components/header';
import Genres from './genres/genres';
import Year from './year/year';
import MovieDetail from './movieDetail/movieDetail';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/genres/:id" component={Genres} exact />
          <Route path="/year/:id" component={Year} exact />
          <Route path="/movie/:id" component={MovieDetail} exact />
        </Switch>
      </Router>
    </>
  );
}
//터미널에 yarn build 치면 html파일 생성
export default App;
