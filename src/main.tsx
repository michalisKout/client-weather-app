import './styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { StrictMode } from 'react';
import Page404 from '@/pages/Page404';
import { StoreProvider } from '@/domain/store/provider';
import Root from '@/pages/Root';

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <StrictMode>
    <StoreProvider>
      <Router>
        <Switch>
          <Route path={'/'} exact>
            <Root />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  </StrictMode>,
);
