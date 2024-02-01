/**
 * Main app component.
 * @param {Object} props - Component props.
 * @param {Object} props.Component - Next.js component to be rendered.
 * @param {Object} props.pageProps - Props to be passed to the component.
 * @returns {JSX.Element} - JSX element representing the main app component.
 */

import './globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
