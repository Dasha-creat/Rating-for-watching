import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { App } from './app/App';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}