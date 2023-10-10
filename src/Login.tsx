import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

interface LoginProps {
    onAuthenticated: () => void;
}

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Login = ({onAuthenticated}: LoginProps): JSX.Element => {
    const [biometricsAvailable, setBiometricsAvailable] = useState(false);
    const [title, setTitle] = useState('Biometric Login');

    const verifyLogin = useCallback(() => {
        if (biometricsAvailable) {
            promptBiometric();
        }
    }, [biometricsAvailable]);

    const promptBiometric = () => {
        rnBiometrics
            .simplePrompt({promptMessage: 'Confirm biometric authentication'})
            .then(resultObject => {
                const {success} = resultObject;

                if (success) {
                    onAuthenticated();
                } else {
                    console.log('User cancelled biometric prompt');
                }
            })
            .catch(() => {
                console.log('biometrics failed');
            });
    };

    const verifyBiometryType = async () => {
        const {available, biometryType} =
            await rnBiometrics.isSensorAvailable();

        if (available && biometryType === BiometryTypes.TouchID) {
            setBiometricsAvailable(true);
        } else if (available && biometryType === BiometryTypes.FaceID) {
            setBiometricsAvailable(true);
        } else if (available && biometryType === BiometryTypes.Biometrics) {
            setBiometricsAvailable(true);
        } else {
            console.log('Biometrics not supported');
            setTitle('Please enable device screen lock with Pattern or PIN.');
        }
    };

    useEffect(verifyLogin, [verifyLogin]);

    useEffect(() => {
        verifyBiometryType();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        width: 250,
        lineHeight: 28,
        marginHorizontal: 24,
        textAlign: 'center',
    },
});

export default Login;
