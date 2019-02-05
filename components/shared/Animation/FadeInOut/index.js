import posed from 'react-pose'

const DURATION = 300

const FadeInOut = posed.div({
  enter: { opacity: 1, transition: { duration: DURATION }},
  exit: { opacity: 0, transition: { duration: DURATION }},
})

export default FadeInOut
