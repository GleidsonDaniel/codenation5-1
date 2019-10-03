import React from 'react';
import axios from 'axios';
import Login from './Login';
import renderer from 'react-test-renderer';
import { ActivityIndicator, AsyncStorage } from 'react-native';

describe('Login', () => {
  let getItemResponse = null;
  const props = {
    navigation: {
      navigate: jest.fn(() => {})
    }
  }

  beforeEach(() => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(JSON.stringify(getItemResponse)));
    AsyncStorage.setItem = jest.fn(() => Promise.resolve());

    axios.post = jest.fn(() => Promise.resolve({ data: { token: '123' } }))
  });

  it('Should get the user data from AsyncStorage', () => {
    const asyncSpy = jest.spyOn(AsyncStorage, 'getItem');

    renderer.create(<Login {...props} />).root;

    expect(asyncSpy).toHaveBeenCalledWith('user')
  });

  it('Should have an input to set the user email', done => {
    const instance = renderer.create(<Login {...props} />).root;

    setTimeout(() => {
      expect(instance.findByProps({className: 'email-input'}).props.autoCompleteType).toBe('email')
      expect(instance.findByProps({className: 'email-input'}).props.keyboardType).toBe('email-address')
      done();
    });
  });

  it('Should have an input to set the user password', done => {
    const instance = renderer.create(<Login {...props} />).root;

    setTimeout(() => {
      expect(instance.findByProps({className: 'password-input'}).props.autoCompleteType).toBe('password')
      expect(instance.findByProps({className: 'password-input'}).props.secureTextEntry).toBe(true)
      done();
    });
  });

  it('Should have a button to submit the form', done => {
    const instance = renderer.create(<Login {...props} />).root;

    setTimeout(() => {
      expect(instance.findByProps({className: 'submit-login'}).props.disabled).toBe(true)
      expect(instance.findByProps({className: 'submit-login'}).props.title).toBe('Entrar')
      done();
    });
  });

  it('Should have a button to submit the form', done => {
    const instance = renderer.create(<Login {...props} />).root;

    setTimeout(() => {
      expect(instance.findByProps({className: 'submit-login'}).props.disabled).toBe(true)
      expect(instance.findByProps({className: 'submit-login'}).props.title).toBe('Entrar')
      done();
    });
  });

  it('Should enable the submit button when email and password are valid', done => {
    const instance = renderer.create(<Login {...props} />).root;

    instance.findByProps({className: 'email-input'}).props.onChangeText('rafael@gmail.com')
    instance.findByProps({className: 'password-input'}).props.onChangeText('123')

    setTimeout(() => {
      expect(instance.findByProps({className: 'submit-login'}).props.disabled).toBe(false)
      done();
    });
  });

  it('Should disable the submit button when the email are invalid', done => {
    const instance = renderer.create(<Login {...props} />).root;

    instance.findByProps({className: 'email-input'}).props.onChangeText('rafael@gmail.c')
    instance.findByProps({className: 'password-input'}).props.onChangeText('123')

    setTimeout(() => {
      expect(instance.findByProps({className: 'submit-login'}).props.disabled).toBe(true)
      done();
    });
  });

  it('Should disable the submit button when the password are empty', done => {
    const instance = renderer.create(<Login {...props} />).root;

    instance.findByProps({className: 'email-input'}).props.onChangeText('rafael@gmail.c')
    instance.findByProps({className: 'password-input'}).props.onChangeText('123')

    setTimeout(() => {
      expect(instance.findByProps({className: 'submit-login'}).props.disabled).toBe(true)
      done();
    });
  });

  it('Should make a request when click on submit-login with the valid data', done => {
    const postSpy = jest.spyOn(axios, 'post')

    const instance = renderer.create(<Login {...props} />).root;

    instance.findByProps({className: 'email-input'}).props.onChangeText('rafael@gmail.com')
    instance.findByProps({className: 'password-input'}).props.onChangeText('123')

    setTimeout(() => {
      instance.findByProps({className: 'submit-login'}).props.onPress();

      expect(postSpy).toHaveBeenCalledWith('https://api.codenation.dev/v1/user/auth', {
        email: 'rafael@gmail.com',
        password: '123'
      });
      done();
    });
  });

  it('Should authenticate when click on submit-login with the valid data', done => {
    const postSpy = jest.spyOn(axios, 'post')
    const asyncSpy = jest.spyOn(AsyncStorage, 'setItem')
    const navigateSpy = jest.spyOn(props.navigation, 'navigate')

    const instance = renderer.create(<Login {...props} />).root;

    instance.findByProps({className: 'email-input'}).props.onChangeText('rafael@gmail.com')
    instance.findByProps({className: 'password-input'}).props.onChangeText('123')

    setTimeout(() => {
      instance.findByProps({className: 'submit-login'}).props.onPress();

      expect(postSpy).toHaveBeenCalledWith('https://api.codenation.dev/v1/user/auth', {
        email: 'rafael@gmail.com',
        password: '123'
      });

      setTimeout(() => {
        expect(asyncSpy).toHaveBeenCalledWith('user', JSON.stringify({token: '123'}));
        expect(navigateSpy).toHaveBeenCalledWith('Acceleration');
        done();
      });
    });
  });

  it('Should go to accelerations page when user is logged', done => {
    getItemResponse = { token: "123teste" };
    const asyncSpy = jest.spyOn(props.navigation, 'navigate');

    renderer.create(<Login {...props} />).root;

    setTimeout(() => {
      expect(asyncSpy).toHaveBeenCalledWith('Acceleration');
      done();
    });
  });
});
