import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
    value={{
      //fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      fetcher: (url) => fetch(url).then((res) => res.json())
    }}
  >
    <CssBaseline/>
    <Component {...pageProps}/>
  </SWRConfig>
  )
}

export default App;