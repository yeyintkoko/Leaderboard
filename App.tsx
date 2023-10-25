/**
 * Leaderboard React Native App
 *
 * @format
 */
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Main from './src/Main';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default App;
