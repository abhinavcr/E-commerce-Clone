import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './store';
import { ModalPortal } from 'react-native-modal';
import { UserContext } from './useContext';

export default function App() {
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigator/>
        <ModalPortal/>
      </UserContext>
    </Provider>
  );
}



