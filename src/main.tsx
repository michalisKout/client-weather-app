import './styles.scss';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { StrictMode } from 'react';
import App from '@/App';
import Page404 from '@/pages/Page404';

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <Switch>
        <Route path={'/'} exact>
          <App />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  </StrictMode>,
);
