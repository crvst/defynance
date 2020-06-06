import clsx from 'clsx'
import NumberFormat from 'react-number-format'

export default function Home () {
  const [price, setPrice] = React.useState(1e5)
  const [deposit, setDeposit] = React.useState(1)
  const [years, setYears] = React.useState(5)
  const [i, setI] = React.useState(0.06)

  return (
    <>
      <section className='px-6 lg:px-10 max-h-20 md:text-xl md:mb-16'>
        <div className='max-w-screen-xl mx-auto flex flex-col relative z-10'>
          <div className='relative z-10'>
            <p className='md:text-6xl text-5xl font-serif max-w-5xl'>
              <span className='text-blue-800'>Down payments are hard. </span>
              <br className='hidden lg:block' />
              <strong>Big, front page marketing slogan.</strong>
            </p>
            <p className='max-w-4xl'>
              With the average UK home buyer paying over £40,000 up front,
              finding
              enough financial resources can seem like an impossibility. We want
              to give you another option.
            </p>
            <p className='max-w-4xl'>
              Instead, it offers the subtle compliment that you value their
              attention and interest in the subject at hand.
            </p>
            <form onSubmit={(event) => {
              event.preventDefault()
            }}
            >
              <div
                className='lg:w-3/4 flex items-end mt-12 bg-yellow-100 border border-yellow-200 p-4 -m-4 rounded r-1 relative z-10'
              >
                <div className='lg:w-1/2 mr-2 flex-auto'>
                  <label
                    className='block mb-1 text-s mb-4'
                    htmlFor='email'
                  >
                    Left your email to...:
                  </label>
                  <input
                    autoFocus
                    className='w-full lg'
                    id='email'
                    name='email'
                    placeholder='Enter your email here'
                    required
                    type='email'
                  />
                </div>
                <button
                  type='submit'
                  className='lg'
                >
                  Register your interest
                </button>
              </div>
            </form>
          </div>
          <picture className='absolute right-0 top-0 w-1/2 select-none z-0'>
            <img
              style={{
                objectFit: 'contain',
                mixBlendMode: 'darken',
                marginTop: -80
              }}
              src='https://format-com-cld-res.cloudinary.com/image/private/s--YyLtTGi7--/c_limit,g_center,h_65535,w_1600/fl_keep_iptc.progressive,q_95/v1/059af61263218d4af0349e89e3f0da68/kite.jpg'
              alt='Sympathetic house'
            />
          </picture>
        </div>
      </section>
      <section
        className='p-6 lg:p-10 relative md:mb-16'
        style={{
          backgroundColor: '#f7fffc'
        }}
      >
        <div className='max-w-screen-xl mx-auto relative z-10'>
          <h2 className='mb-4'>How We Work</h2>
          <ol>
            <li className='mb-4 relative'>
              <dl>
                <dt className='text-2xl'>1. We fund your deposit</dt>
                <dd>Something clever written here</dd>
              </dl>
            </li>
            <li className='mb-4 relative'>
              <dl>
                <dt className='text-2xl'>2. You live in it</dt>
                <dd>(home is yours, etc etc etc.)</dd>
              </dl>
            </li>
            <li className='mb-4'>
              <dl>
                <dt className='text-2xl'>3. Pay us back in 15 years,
                  or whenever is comfortable
                </dt>
                <dd>Something descriptive</dd>
              </dl>
            </li>
          </ol>
          <picture className='absolute right-0 top-0 w-1/3 select-none'>
            <img
              style={{
                objectFit: 'contain',
                mixBlendMode: 'darken',
                marginTop: -80
              }}
              src='https://format-com-cld-res.cloudinary.com/image/private/s--kUNjzKrc--/c_limit,g_center,h_65535,w_1600/fl_keep_iptc.progressive,q_95/v1/1c19385914ff1b67e70bdbaaf6d45611/final2.jpg'
              alt='Sharing is caring'
            />
          </picture>
        </div>
      </section>

      <section
        className='p-6 lg:p-10 max-h-20'
        style={{
          backgroundColor: '#fffdf7'
        }}
      >
        <div className='max-w-screen-xl mx-auto'>
          <h2 className='mb-4'>
            Rough Calculator
          </h2>
          <form action=''>
            <div className='grid grid-cols-2 md:gap-8 gap-4'>
              <div className=''>
                <div className='mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='price'
                  >
                    Purchase price, £:
                  </label>
                  <NumberFormat
                    allowNegative={false}
                    className='w-full lg'
                    id='price'
                    isNumericString
                    name='price'
                    onValueChange={({ floatValue }) => setPrice(floatValue)}
                    prefix='£'
                    thousandSeparator
                    value={price}
                  />
                  <input
                    id='price-range'
                    min={0}
                    max={1e7}
                    name='price-range'
                    onChange={event => setPrice(event.target.value)}
                    step={500}
                    type='range'
                    value={price}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='deposit'
                  >
                    Percent deposit:
                  </label>
                  <NumberFormat
                    allowNegative={false}
                    className='w-full lg'
                    id='deposit'
                    isNumericString
                    name='deposit'
                    value={deposit}
                    format={value => {
                      if (value > 100) {
                        return '100%'
                      } else if (value < 1 || !value) {
                        return '1%'
                      }
                      return `${value}%`
                    }}
                    onValueChange={({ floatValue }) => setDeposit(floatValue)}
                  />
                  <input
                    type='range'
                    id='deposit-range'
                    name='deposit-range'
                    min={0}
                    max={100}
                    value={deposit}
                    onChange={event => setDeposit(event.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='years'
                  >
                    Period, up to 15 years:
                  </label>
                  <NumberFormat
                    className='w-full lg'
                    id='years'
                    inputMode='numeric'
                    max={15}
                    min={1}
                    name='years'
                    required
                    suffix={years > 1 ? ' years' : ' year'}
                    value={years}
                    onValueChange={({ floatValue }) => {
                      if (floatValue > 15) {
                        setYears(15)
                        return
                      } else if (floatValue < 1) {
                        setYears(1)
                        return
                      }
                      setYears(floatValue)
                    }}
                  />
                  <input
                    type='range'
                    id='deposit-range'
                    name='deposit-range'
                    min={1}
                    max={15}
                    value={years}
                    onChange={event => setYears(event.target.value)}
                  />
                </div>
              </div>
              <div className='mt-8 text-2xl'>
                <div className='mb-4 flex'>
                  <label
                    className={clsx('block mb-1 text-s mb-2 text-gray-500 border-2 border-gray-600 text-base rounded-l-sm p-2', {
                      'bg-gray-400 text-gray-900': i === 0.06,
                      'hover:bg-gray-200 cursor-pointer': i !== 0.06
                    })}
                    htmlFor='i0'
                  >
                    Average increase
                    <input
                      className='hidden'
                      type='radio'
                      value='i0'
                      name='i0'
                      id='i0'
                      checked={i === 0.06}
                      onChange={() => setI(0.06)}
                    />
                  </label>
                  <label
                    className={clsx('border-l-0 block mb-1 text-s mb-2 text-gray-500 border-2 border-gray-600 text-base rounded-r-sm p-2',
                      {
                        'bg-gray-400 text-gray-900': i === -0.02,
                        'hover:bg-gray-200 cursor-pointer': i !== -0.02
                      })}
                    htmlFor='i1'
                  >
                    Decline in value
                    <input
                      className='hidden'
                      type='radio'
                      value='i1'
                      name='i1'
                      id='i1'
                      checked={i === -0.02}
                      onChange={() => setI(-0.02)}
                    />
                  </label>
                </div>
                <div className='mb-4'>
                  <b>We fund:</b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(price * (deposit * 0.01))}
                />
                </div>
                <div className='mb-4'>
                  <b>Future home value:</b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(price * ((i + 1) ^ years))}
                />
                </div>
                <div className='mb-4'>
                  <b>Your
                    share:
                  </b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(price * (1 - ((deposit * 0.01) / 0.8)) * ((i + 1) ^ years))}
                />
                </div>
                <div className='mb-4'>
                  <b>Our share:</b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(((deposit * 0.01) / 0.8) * price * ((i + 1) ^ years))}
                />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
