import { useState, useEffect } from 'react'

const DEFAULT_QUOTE = 'It is in your moments of decision that your destiny is shaped.'

function Quote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch('https://api.quotable.io/quotes/random')
        const [data] = await response.json()
        const { content } = data
        setQuote(content)
      } catch (error) {
        setQuote(DEFAULT_QUOTE)
        console.error(error)
      }
    }

    fetchQuote()
  }, []);

  return (
    <>
      {
        quote.length > 0 ? (
          <div>
            <p style={{ fontStyle: 'italic', textAlign: 'center' }}>“{quote}”</p>
          </div>
        ) : null
      }
    </>
  );
}

export default Quote