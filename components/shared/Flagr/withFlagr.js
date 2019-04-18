import React from 'react'
import {FlagrConsumer} from './Context'

const getComponentName = (target) => {
  return (
    (process.env.NODE_ENV !== 'production'
      ? typeof target === 'string' && target
      : false) ||
    target.displayName ||
    target.name ||
    'Component'
  )
}

const determineFlagrFlags = (props, fallbackFlagrFlags, defaultProps = {}) => {
  // Props should take precedence over FlagrProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  const isDefaultTheme = defaultProps
    ? props.flagrFlags === defaultProps.flagrFlags
    : false

  return props.flagrFlags && !isDefaultTheme
    ? props.flagrFlags
    : fallbackFlagrFlags || defaultProps.flagrFlags
}

export default (Component) => {
  const WithTheme = React.forwardRef((props, ref) => (
    <FlagrConsumer>
      {(flagrFlags) => {
        // $FlowFixMe
        const {defaultProps} = Component
        const themeProp = determineFlagrFlags(props, flagrFlags, defaultProps)

        if (process.env.NODE_ENV !== 'production' && themeProp === undefined) {
          // eslint-disable-next-line no-console
          console.warn(
            `[withFlagr] You are not using a FlagrProvider nor passing a 
        theme prop or a theme in defaultProps in component class 
        "${getComponentName(Component)}"`
          )
        }

        return <Component {...props} theme={themeProp} ref={ref} />
      }}
    </FlagrConsumer>
  ))

  WithTheme.displayName = `WithTheme(${getComponentName(Component)})`

  return WithTheme
}
