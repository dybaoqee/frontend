import posed from 'react-pose'

const DELAY = 300

const getAnimatedComponent = (Component) =>
  posed(Component)({
    enter: { opacity: 1, delay: DELAY },
    exit: { opacity: 0 }
  })

export { getAnimatedComponent }
