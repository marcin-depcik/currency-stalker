import '@/styles/components/NavbarSection.scss'

import { useState } from 'react'
import { Link } from 'react-scroll'
import { Card } from '@/components/common/Card'
import { GoogleIcon } from '@/components/common/GoogleIcon'
import { Converter } from '@/components/Converter'

export const NavbarSection = () => {
  const [foldCalculator, setFoldCalculator] = useState('fold')

  return (
    <section className="navbar">
      <Card className="navbar">
        <div className="navigation">
          <Link to="top" smooth={true} duration={500}>
            <div className="name">
              <GoogleIcon className="logo" name="paid" />
              <h2 className="title">Currency Stalker</h2>
            </div>
          </Link>
          <div className="buttons">
            <Link
              to="currency-section"
              smooth={true}
              offset={-127}
              duration={500}
            >
              <button title="Currency Rates">
                <GoogleIcon name="timeline" />
              </button>
            </Link>
            <Link to="gold-rates" smooth={true} offset={-127} duration={500}>
              <button title="Gold Rates">
                <GoogleIcon name="volcano" />
              </button>
            </Link>
            <button
              title="Currency Converter"
              onClick={() => setFoldCalculator(foldCalculator ? '' : 'fold')}
            >
              <GoogleIcon
                className={`keyboard ${foldCalculator}`}
                name="keyboard"
              />
            </button>
          </div>
        </div>
        <Converter foldCalculator={foldCalculator} />
      </Card>
    </section>
  )
}
