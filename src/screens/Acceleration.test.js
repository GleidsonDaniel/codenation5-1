import React from 'react';
import axios from 'axios';
import Acceleration from './Acceleration';
import AccelerationItem from '../components/AccelerationItem';
import renderer from 'react-test-renderer';
import { ActivityIndicator, AsyncStorage } from 'react-native';

describe('Acceleration Normal', () => {
  const accelerations = [{
    "slug": "reactnative-online-1",
    "name": "React Native",
    "is_disabled": false,
    "subscription_start_at": "2019-07-08T00:00:00-03:00",
    "subscription_finish_at": "2019-07-28T23:59:59-03:00",
    "start_at": "2019-08-17T00:00:00-03:00",
    "finish_at": "2019-11-03T00:00:00-03:00",
    "location": "Online",
    "banner_url": "https://s3-us-west-1.amazonaws.com/acceleration-assets-highway/reactnative-online-1/banner.jpg",
    "home_banner_url": "",
    "color_scheme": "7800FF",
    "company_count": 1
  }]

  beforeEach(() => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(JSON.stringify({
      token: '123',
      picture: 'photo'
    })));

    axios.get = jest.fn(() => Promise.resolve({ data: accelerations }));
  })

  it('Should get the user data from local storage', () => {
    const asyncSpy = jest.spyOn(AsyncStorage, 'getItem');

    const instance = renderer.create(<Acceleration />).root;

    expect(asyncSpy).toHaveBeenCalledWith('user')
  })

  it('Should get the accelerations', () => {
    const asyncSpy = jest.spyOn(axios, 'get');

    const instance = renderer.create(<Acceleration />).root;

    expect(asyncSpy).toHaveBeenCalledWith('https://api.codenation.dev/v1/acceleration')
  })

  it('Should have a loading waiting for the accelerations to be loaded', done => {
    const instance = renderer.create(<Acceleration />).root;

    expect(instance.findAllByType(ActivityIndicator).length).toBe(1)

    setTimeout(() => {
      expect(instance.findAllByType(AccelerationItem).length).toBe(1)
      done()
    })
  })

  it('Should have a loading waiting for the accelerations to be loaded', done => {
    const instance = renderer.create(<Acceleration />).root;

    expect(instance.findAllByType(ActivityIndicator).length).toBe(1)

    setTimeout(() => {
      expect(instance.findByType(AccelerationItem).props.item).toEqual(accelerations[0])
      done()
    })
  })

  it('Should set the user image as the loaded from AsyncStorage', done => {
    const instance = renderer.create(<Acceleration />).root;

    setTimeout(() => {
      expect(instance.findAllByType('Image')[1].props.source).toEqual({ uri: "photo" })
      done()
    })
  })
})
