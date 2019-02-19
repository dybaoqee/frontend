import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '@emcasa/ui-dom/components/Button'
import FilterButton from '../FilterButton'

class ButtonGroupFilter extends PureComponent {
  render() {
    const { initialValue, userValue, onChange, values } = this.props
    return (
      <Button.Group
        flexWrap="wrap"
        initialValue={initialValue}
        strategy={{
          isSelected: (selectedValue, value) => selectedValue === value,
          update: (selectedValue, value) => (selectedValue === value ? null : value)
        }}
        onChange={(value) => {
          if (value === null) {
            return
          }
          let values = {minValue: value}
          if (value === 0) {
            values.maxValue = 0
          }
          onChange(values)
      }}>
        {values.map((item, index) => {
          return (
            <FilterButton
              key={index}
              active={userValue === item.value}
              value={item.value}
            >
              {item.label}
            </FilterButton>
          )
        })}
      </Button.Group>
    )
  }
}

ButtonGroupFilter.propTypes = {
  initialValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  userValue: PropTypes.number
}

/**
 * values: [
 *  {
 *    value: 0,
 *    label: 'Sem vagas'
 *   },
 *   {
 *     value: 1,
 *     label: '1'
 *   }
 *   ...
 * ]
 */

export default ButtonGroupFilter
