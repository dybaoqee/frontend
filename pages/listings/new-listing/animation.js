import posed from 'react-pose'

const DELAY = 300

const getAnimatedScreen = (Screen) =>
  posed(Screen)({
    enter: { opacity: 1, delay: DELAY },
    exit: { opacity: 0 }
  })

export { getAnimatedScreen }
