import AppProviders from '../core/Providers';
import Router from '../core/Router';

export function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}

export default App;
