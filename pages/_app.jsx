import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { MDXProvider } from '@mdx-js/react'
import '../assets/index.css'
import LogoSVG from '../assets/logo.svg'
import appConfig from '../app.config.json'
import nav from '../configs/nav.config'

export const SharedStateContext = React.createContext()

function Logo () {
  const { isHeaderFixed } = React.useContext(SharedStateContext)
  return (
    <div
      className='overflow-hidden'
      style={isHeaderFixed ? { width: 21 } : null}
    >
      <LogoSVG
        height={23}
        width={150}
        className='fill-current'
      />
    </div>
  )
}

const components = {
  wrapper: props => {
    const pageTitle = props.children.find(({ props }) => props.originalType === 'h1').props.children;
    return (
        <section className='@md p-4 lg:p-10 pt-0 lg:pt-0'>
          <Head>
            <title>{appConfig.name} / {pageTitle ?? '?'}</title>
          </Head>
          <div className='max-w-screen-xl mx-auto' {...props} />
        </section>
    )
  }
}

function useCookiesBanner () {
  const router = useRouter()
  const [cookiesAccepted, setCookiesAccepted] = React.useState('initial')

  React.useEffect(() => {
    const ls = window.localStorage
    const LS_KEY = '@defynance:cookie-accepted'
    const lsValue = getLsValue()
    if (cookiesAccepted === true) {
      ls.setItem(LS_KEY, cookiesAccepted)
    }
    setCookiesAccepted(lsValue)

    function getLsValue () {
      try {
        return !!JSON.parse(ls.getItem(LS_KEY))
      } catch {
        return false
      }
    }
  }, [cookiesAccepted])

  return [cookiesAccepted, setCookiesAccepted]
}

const App = ({ Component, pageProps, ...rest }) => {
  const [cookiesAccepted, setCookiesAccepted] = useCookiesBanner()
  const [sharedState, setSharedState] = React.useState({
    isHeaderFixed: false,
    headerHeight: null
  })
  const router = useRouter()
  React.useEffect(() => {
    const setHeaderHeight = state => ({
      ...state,
      headerHeight: document.getElementById('header')?.offsetHeight
    })
    setSharedState(setHeaderHeight)
  }, [])

  React.useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > sharedState.headerHeight / 2) {
        setSharedState(state => ({
          ...state,
          isHeaderFixed: true,
        }))
      } else {
        setSharedState(state => ({
          ...state,
          isHeaderFixed: false
        }))
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return (
    <SharedStateContext.Provider value={sharedState}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <MDXProvider components={components}>
          <Head key='head'>
            <title>{appConfig.name}</title>
            <link href={appConfig.fonts.sans.url} rel='stylesheet' />
            <link href={appConfig.fonts.serif.url} rel='stylesheet' />
            <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
            <link rel='alternate icon' href='/favicon.ico' />
            <link rel='mask-icon' href='/safari-pinned-tab.svg'
                  color='#ff8a01' />
            <link rel='apple-touch-icon' sizes='180x180'
                  href='/apple-touch-icon.png' />
            <link rel='manifest' href='/site.webmanifest' />
            <link rel='mask-icon' href='/safari-pinned-tab.svg'
                  color='#43b649' />
            <meta name='msapplication-TileColor' content='#00a300' />
            <meta name='theme-color' content='#ffffff' />
            <meta name='description' content={appConfig.description} />
            <meta itemProp='name' content={appConfig.name} />
            <meta itemProp='description' content={appConfig.description} />
            <meta itemProp='image' content={appConfig.splashImage} />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content={appConfig.url} />
            <meta name='twitter:title' content={appConfig.name} />
            <meta name='twitter:description' content={appConfig.description} />
            <meta name='twitter:creator' content={appConfig.url} />
            <meta name='twitter:image' content={appConfig.splashImage} />
            <meta name='twitter:image:alt' content={appConfig.description} />
            <meta property='og:title' content={appConfig.name} />
            <meta property='og:type' content='article' />
            <meta property='og:url' content={appConfig.url} />
            <meta property='og:image' content={appConfig.splashImage} />
            <meta property='og:description' content={appConfig.description} />
            <meta property='og:site_name' content={appConfig.name} />
          </Head>
          <header
            id='header'
            key='header'
            className={clsx({
              '--sticky': sharedState.isHeaderFixed,
              '--initial': !sharedState.isHeaderFixed
            })}
          >
            <div className={clsx('md:flex mx-auto md:rounded', {
              'md:max-w-screen-xl': !sharedState.isHeaderFixed
            })}>
              {
                router.route === '/'
                  ? <div className='p-1 -m-1 r-2 text-green-500 pointer-events-auto'>
                    <Logo />
                  </div>
                  : <Link href='/'>
                    <a className='p-1 -m-1 r-2 block text-green-500 bg-transparent hover:bg-transparent hover:text-orange-500 pointer-events-auto'>
                      <Logo />
                    </a>
                  </Link>
              }
              <nav className='-ml-1 md:ml-auto mt-4 md:mt-0 items-start'>
                <ul className='flex pointer-events-auto'>
                  {
                    nav.map(({ name, url }, i) => {
                      return (
                        <li key={name}
                        >
                          <a
                            className={
                              clsx('font-bold bg-white', {
                                'pointer-events-none border-green-400 text-black': router.pathname === `/${url}`,
                                'ml-2': i > 0
                              })
                            }
                            href={`/${url}`}
                          >
                            {name}
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              </nav>
            </div>
          </header>
          <main
            key='main'
            className='mt-0 md:mt-auto'
            style={{ marginTop: sharedState.isHeaderFixed ? sharedState.headerHeight : 0 }}
          >
            <Component {...pageProps} />
          </main>
          <footer className='p-4 lg:p-10 w-full'>
            <div className='md:flex max-w-screen-xl mx-auto'>
              <div>&copy; 2020 Defynance, Ltd.</div>
              <ul className='ml-auto md:flex'>
                <li><a href='/privacy'>Privacy policy</a></li>
                <li className='md:ml-4'><a href='/terms'>Terms and
                  conditions</a>
                </li>
              </ul>
            </div>
          </footer>
          {
            cookiesAccepted
              ? null
              : (
                <aside
                  className='text-xs p-4 fixed flex justify-center bottom-0 right-0 left-0 z-20 pointer-events-none'
                >
                  <div
                    className='max-w-lg w-full p-2 rounded shadow-md bg-gray-100 flex pointer-events-auto'
                  >
                <span className='ml-2'>
                  We use cookies to remember your preferences and enhance your experience on our website. <a
                  href='/privacy'
                >Click here to see our cookie policy
                  </a>.
                </span>
                    <button
                      className='btn ml-auto'
                      onClick={() => setCookiesAccepted(true)}
                    >
                      Got it
                    </button>
                  </div>
                </aside>
              )
          }
        </MDXProvider>
      </GoogleReCaptchaProvider>
    </SharedStateContext.Provider>
  )
}

export default App
