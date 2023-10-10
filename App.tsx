/**
 * SecureNote React Native App
 *
 * @format
 */

import {useState} from 'react';
import Login from './src/Login';
import Main from './src/Main';

const App = (): JSX.Element => {
    const [authenticated, setAuthenticated] = useState(false);

    if (!authenticated)
        return <Login onAuthenticated={() => setAuthenticated(true)} />;

    return <Main />;
};

export default App;
