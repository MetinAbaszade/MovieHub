import AppRoutes from './components/AppRoutes';
import store from './redux/store'
import { Provider } from 'react-redux';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <AppRoutes /> 
    </Provider>
  );
}

export default App;
