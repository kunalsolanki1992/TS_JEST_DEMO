import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { fireEvent, render } from '@testing-library/react-native';
import '@testing-library/jest-dom';

import { store, persistor } from '../src/redux/reducers';
import { MyAccountScreen } from '../src/screens/MyAccountScreen';

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
}))

jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers),
    };
});

// tried to mock useState hook

// FAILED ATTEMPT 4
// jest.mock('react', () => {
//     const tempReact = jest.requireActual('react');
//     return {
//         ...jest.requireActual('react'),
//         useState: jest.fn()
//     }
// })

// const tempUseState: jest.Mock<typeOf useState> = useState as never;

// const setValue = jest.fn();
// tempUseState
//     .mockImplementation(() => ['value', setValue]);

// FAILED ATTEMPT 3
// const stateSetter = jest.fn()
// jest
// .spyOn(React, 'useState')
// //Simulate that mode state value was set to 'new mode value'
// .mockImplementation(stateValue => [stateValue='new mode value', stateSetter])

// FAILED ATTEMPT 1
// const handleClick = jest.spyOn(React, "useState");
// handleClick.mockImplementation((size) => [size, changeSize]);

// FAILED ATTEMPT 2
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn()
// }));

// const useStateMock: jest.Mock<typeof useState> = useState as never;

// defined new state here.
// const setValue = jest.fn();
// useStateMock
//     .mockImplementation(() => ['value', setValue]);

it('My Account screen renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                {/* <PersistGate persistor={persistor}> */}
                <MyAccountScreen />
                {/* </PersistGate> */}
            </Provider>
        )
        .toJSON();

    // console.log(tree);
    // console.log(setValue);

    expect(tree).toMatchSnapshot();
});

describe('Other tests in My Account Screen', () => {
    let loginButton;
    // let passwordText;

    const setEmailMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setEmailMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByText, getByPlaceholderText } = render(<Provider store={store}>
        <MyAccountScreen />
    </Provider>)

    // passwordText = getByText("123456");
    let emailText = getByPlaceholderText('E-mail');
    let passwordText = getByPlaceholderText('Password');
    loginButton = getByText('Login');

    // fireEvent.click('loginButton');
    // fireEvent.changeText(passwordText);
    fireEvent.press(loginButton);

    // expect(useStateMock).toHaveBeenCalledTimes(3);
    
    // emailText.props.value = 'kunal.solanki@capgemini.com';
    // passwordText.props.value = '123456';
    
    const newEmail = 'kunal.solanki@capgemini.com';
    const newPassword = '123456';

    fireEvent.changeText(emailText, newEmail);
    fireEvent.changeText(passwordText, newPassword);
    
    // console.log("Login Button == ", loginButton);
    console.log("Email TextInput == ", emailText.props.value);
    // console.log("Password TextInput == ", passwordText);
    
    // expect(emailText.props.value).toMatch(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    expect(passwordText.props.value).toMatch("");
    expect(setEmailMock).toHaveBeenCalledTimes(2);
    // expect(loginButton).toHaveBeenCalledTimes(1);
});