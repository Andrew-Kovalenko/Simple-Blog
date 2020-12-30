import '../styles/font.css'
import NextNprogress from 'nextjs-progressbar';
import React from "react";
import {Provider} from 'react-redux';
import store from '../redux/store';
import {createWrapper} from 'next-redux-wrapper'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />

        <Component {...pageProps} />
        </Provider>
    </>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp);

