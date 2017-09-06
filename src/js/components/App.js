import React from 'react'
import { inject, observer } from 'mobx-react'
import { LinearProgress } from 'material-ui/Progress'
import Window from './Window'
import Search from './Search'
import Tools from './Tools'

@inject('windowStore')
@inject('searchStore')
@observer
export default class App extends React.Component {
  componentDidMount () {
    const { windowStore: { updateAllWindows } } = this.props
    chrome.windows.onCreated.addListener(updateAllWindows)
    chrome.windows.onRemoved.addListener(updateAllWindows)
    chrome.tabs.onCreated.addListener(updateAllWindows)
    chrome.tabs.onUpdated.addListener(updateAllWindows)
    chrome.tabs.onMoved.addListener(updateAllWindows)
    chrome.tabs.onDetached.addListener(updateAllWindows)
    chrome.tabs.onRemoved.addListener(updateAllWindows)
    chrome.tabs.onReplaced.addListener(updateAllWindows)
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  onKeyDown = (e) => {
    const {
      searchStore: { up, down, enter, select, typing }
    } = this.props
    console.log(e.keyCode)
    switch (e.keyCode) {
      // DOWN
      case 40:
        e.preventDefault()
        down()
        break
      // UP
      case 38:
        e.preventDefault()
        up()
        break
      // Enter
      case 13:
        e.preventDefault()
        enter()
        break
      default:
    }
    console.log(typing)
    if (typing) {
      return
    }
    switch (e.keyCode) {
      // X
      case 88:
        e.preventDefault()
        select()
        break
      // j
      case 74:
        e.preventDefault()
        down()
        break
      // k
      case 75:
        e.preventDefault()
        up()
        break
      default:
    }
  }

  render () {
    const { windowStore: { tabCount, windows } } = this.props
    if (!tabCount) {
      return (<LinearProgress />)
    }
    const winList = windows.map((win) => (
      <Window key={win.id} {...win} containment={() => this.refs.containment} />
    ))
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100vh'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: '0 0 auto',
          padding: '0 4px'
        }}>
          <Search />
          <Tools />
        </div>
        <div ref='containment'
          style={{
            padding: '0 4px',
            overflow: 'auto',
            flex: '1 1 auto'
          }}>
          {winList}
        </div>
      </div>
    )
  }
}
