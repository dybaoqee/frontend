import {PureComponent} from  'react'

const original = jest.requireActual('@emcasa/ui-dom/components/Breakpoint')

export const getWindowWidth = jest.fn()

export const getBreakpoint = jest.fn()

export const mockWindowWidth = (windowWidth) => {
  getWindowWidth.mockImplementation(() => windowWidth)
  getBreakpoint.mockImplementation(original.getBreakpoint)
}

export const mockBreakpoint = (breakpoint) => {
  getBreakpoint.mockImplementation(() => breakpoint)
}

mockBreakpoint.desktop = () =>
  mockBreakpoint({isMobile: false, breakpoint: 'desktop'})
mockBreakpoint.tablet = () =>
  mockBreakpoint({isMobile: true, breakpoint: 'tablet'})
mockBreakpoint.phone = () =>
  mockBreakpoint({isMobile: true, breakpoint: 'phone'})

export class Breakpoint extends PureComponent {
  constructor(props) {
    super(props)
    this.state = getBreakpoint(getWindowWidth()) || {}
  }

  render() {
    return this.props.children(this.state)
  }
}

export const withBreakpoint = () => (Target) => (props) => (
  <Breakpoint>{(ctx) => <Target {...props} {...ctx} />}</Breakpoint>
)

