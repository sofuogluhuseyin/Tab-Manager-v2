import React from 'react'
import { inject, observer } from 'mobx-react'
import Window from './Window'
import DragPreview from './DragPreview'

const width = '800px'

@inject('windowStore')
@observer
export default class App extends React.Component {
  resize = () => {
    const bottom = Math.max(
      ...Object.values(this.refs).map(
        x => x.getBoundingClientRect().bottom
      )
    )
    const height = `${Math.max(bottom, 300)}px`
    document.getElementsByTagName('html')[0].style.height = height
    document.getElementsByTagName('html')[0].style.width = width
    document.body.style.height = height
    document.body.style.width = width
  }

  componentDidUpdate = this.resize
  componentDidMount = this.resize

  render () {
    const { windowStore: { windows } } = this.props
    const winList = windows.map((win) => (
      <Window
        key={win.id}
        ref={win.id}
        containment={() => this.containment}
        dragPreview={() => this.dragPreview}
        {...win}
      />
    ))
    return (
      <div ref={(el) => { this.containment = el || this.containment }}
        style={{
          overflow: 'auto',
          flex: '1 1 auto'
        }}>
        <DragPreview
          setDragPreview={(dragPreview) => { this.dragPreview = dragPreview }}
        />
        {winList}
      </div>
    )
  }
}
