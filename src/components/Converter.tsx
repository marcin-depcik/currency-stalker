import '@/styles/components/Converter.scss'

import { currencyState } from '@/redux/features/currencySlice'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

interface PropsType {
  foldCalculator: string
}

const muiProps = {
  MenuProps: {
    MenuListProps: {
      sx: {
        backgroundColor: 'var(--clr-primary-2)',
      },
    },
  },
}

const pattern = '^[0-9]+([.][0-9]+)?$'

export const Converter = ({ foldCalculator }: PropsType) => {
  const { rates } = useSelector(currencyState)

  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')

  const [firstMidValue, setFirstMidValue] = useState('')
  const [secondMidValue, setSecondMidValue] = useState('')

  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)

  const firstValid = firstInputRef.current?.validity.valid
  const secondValid = secondInputRef.current?.validity.valid

  const converter = (input: string, firstMid: string, secondMid: string) => {
    if (input && firstMid && secondMid) {
      return (
        (parseFloat(input) * parseFloat(firstMid)) /
        parseFloat(secondMid)
      )
        .toFixed(4)
        .toString()
    }
    return ''
  }

  const resetInputs = () => {
    setFirstInput('')
    setSecondInput('')
  }

  const handleFirstInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = value.trim()
    setFirstInput(trimmed)
    const converted = converter(trimmed, firstMidValue, secondMidValue)
    setSecondInput(converted)
  }

  const handleSecondInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const trimmed = value.trim()
    setSecondInput(trimmed)
    const converted = converter(trimmed, secondMidValue, firstMidValue)
    setFirstInput(converted)
  }

  const handleFirstMidChange = (e: SelectChangeEvent<string>) => {
    resetInputs()
    setFirstMidValue(e.target.value)
  }

  const handleSecondMidChange = (e: SelectChangeEvent<string>) => {
    resetInputs()
    setSecondMidValue(e.target.value)
  }

  useEffect(() => {
    setFirstInput('')
    setSecondInput('')
    setFirstMidValue('')
    setSecondMidValue('')
  }, [foldCalculator])

  return (
    <div className={`converter ${foldCalculator}`}>
      <div className="interface">
        <div className="first-input">
          <div className="text-field">
            <small>Type value to convert</small>
            <input
              ref={firstInputRef}
              type="text"
              name="first-input"
              pattern={pattern}
              placeholder="Type number..."
              value={firstInput || ''}
              onChange={handleFirstInputChange}
            />
            <label className={firstInput && (firstValid ? '' : 'error')}>
              Incorrect input value!
            </label>
          </div>
          <small>Select currency</small>
          <FormControl sx={{ width: '100%' }}>
            <Select
              className="currency-code-field"
              sx={{ height: '52px' }}
              inputProps={muiProps}
              value={firstMidValue}
              onChange={handleFirstMidChange}
            >
              <MenuItem value="">None</MenuItem>
              {rates.map(({ code, mid, currency }) => (
                <MenuItem key={code} value={mid.toFixed(4)}>
                  {`${code} - ${currency.split('(')[0]}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="second-input">
          <div className="text-field">
            <small>Type value to convert</small>
            <input
              ref={secondInputRef}
              type="text"
              name="first-input"
              pattern={pattern}
              placeholder="Type number..."
              value={secondInput || ''}
              onChange={handleSecondInputChange}
            />
            <label className={secondInput && (secondValid ? '' : 'error')}>
              Incorrect input value!
            </label>
          </div>
          <small>Select currency</small>
          <FormControl sx={{ width: '100%' }}>
            <Select
              className="currency-code-field"
              sx={{ height: '52px' }}
              inputProps={muiProps}
              value={secondMidValue}
              onChange={handleSecondMidChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {rates.map(({ code, mid, currency }) => (
                <MenuItem key={code + mid} value={mid.toFixed(4)}>
                  {`${code} - ${currency.split('(')[0]}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}
