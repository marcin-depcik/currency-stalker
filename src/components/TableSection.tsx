import '@/styles/components/TableSection.scss'

import { Card } from '@/components/common/Card'
import { GoogleIcon } from '@/components/common/GoogleIcon'
import { LoadingContent } from '@/components/common/LoadingContent'
import {
  currencyState,
  getHistoricalCurrency,
  searchRatesByCode,
} from '@/redux/features/currencySlice'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrencyChart } from './CurrencyChart'
import { AnyAction } from '@reduxjs/toolkit'
import { animateScroll as scroll } from 'react-scroll'

const thCellStyle = {
  color: 'var(--clr-primary-7)',
}
const trStyle = {
  transition: 'all 0.15s linear',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'var(--clr-primary-7)',
  },
}

export const TableSection = () => {
  const dispatch = useDispatch()
  const [foldTable, setFoldTable] = useState('')
  const [value, setValue] = useState('')
  const { filteredRates, table, effectiveDate } = useSelector(currencyState)

  const tableRef = useRef<HTMLInputElement>(null)

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = value.trim()
    dispatch(searchRatesByCode(trimmedValue))
    setValue(trimmedValue)
  }

  const handleClick = (code: string) => {
    dispatch(getHistoricalCurrency(code) as unknown as AnyAction)
    const positionY =
      tableRef.current &&
      tableRef.current.getBoundingClientRect().top + window.scrollY - 127

    positionY &&
      scroll.scrollTo(positionY, {
        duration: 500,
        smooth: true,
      })
  }

  return (
    <section
      ref={tableRef}
      id="currency-section"
      className={`table ${foldTable}`}
    >
      <Card className="title">
        <h3>Average exchange rates</h3>
        <GoogleIcon
          onClick={() => setFoldTable(foldTable ? '' : 'fold')}
          name="expand_less"
        />
      </Card>
      <LoadingContent className="title">
        <div className="content">
          <CurrencyChart />
          <Card>
            <div className="table-title-wrapper">
              <div className="title">
                <h3 className="name">Rates of table "{table}"</h3>
                <span className="publication-date">
                  Publication date: {effectiveDate}
                </span>
              </div>
              <input
                type="text"
                name="code"
                placeholder="Type Currency Code..."
                value={value || ''}
                onChange={handleSearch}
              />
            </div>
            <TableContainer
              sx={{
                maxHeight: 500,
              }}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '50%' }}>
                      <h4 style={thCellStyle}>Name</h4>
                    </TableCell>
                    <TableCell align="right">
                      <h4 style={thCellStyle}>Code</h4>
                    </TableCell>
                    <TableCell align="right">
                      <h4 style={thCellStyle}>Current Rates</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRates.map(({ code, currency, mid }) => (
                    <TableRow
                      onClick={() => handleClick(code)}
                      key={code}
                      sx={trStyle}
                    >
                      <TableCell component="th" scope="row">
                        {currency[0].toUpperCase() + currency.slice(1)}
                      </TableCell>
                      <TableCell align="right">{code}</TableCell>
                      <TableCell align="right">{mid.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </LoadingContent>
    </section>
  )
}
