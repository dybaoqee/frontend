import {Component} from 'react'
import Container, {TabTitles, TabTitle} from './styles'

export default class Tabs extends Component {
  constructor(props) {
    super(props)

    const {tabs} = props

    this.state = {tabs, currentTab: tabs[0].title}
  }

  changeCurrentTab = (e) => {
    const {innerText} = e.target
    this.setState({currentTab: innerText})
  }

  getCurrentTab = () => {
    const {tabs, currentTab} = this.state
    const targetTab = tabs.filter((tab) => tab.title === currentTab)[0]
    return targetTab.component()
  }

  getTabTitles = () => {
    const {tabs, currentTab} = this.state
    return (
      <TabTitles>
        {tabs.map(({title}) => (
          <TabTitle
            key={title}
            onClick={this.changeCurrentTab}
            active={title === currentTab}
          >
            {title}
          </TabTitle>
        ))}
      </TabTitles>
    )
  }

  render() {
    return (
      <Container>
        {this.getTabTitles()}
        {this.getCurrentTab()}
      </Container>
    )
  }
}
