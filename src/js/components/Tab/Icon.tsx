import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import { useStore } from 'components/StoreContext'

const ARIA_LABEL = 'Toggle select'

export default observer((props) => {
  const { userStore } = useStore()
  const { focus, select, iconUrl, isSelected, bulkSelect } = props.tab
  const checkbox = (
    <Checkbox
      color='primary'
      checked={isSelected}
      inputProps={{
        'aria-label': ARIA_LABEL
      }}
      onClick={(e) => {
        if (isSelected || !e.shiftKey) {
          select()
        } else {
          bulkSelect()
        }
      }}
    />
  )
  if (!userStore.showTabIcon) {
    return checkbox
  }
  return (
    <div className='group'>
      <div
        className={classNames({
          hidden: isSelected,
          'group-hover:hidden': !isSelected
        })}
      >
        <IconButton
          aria-label={ARIA_LABEL}
          className='focus:outline-none focus:shadow-outline'
          onClick={select}
          onFocus={focus}
        >
          <img className='w-6 h-6' src={iconUrl} alt='tab icon' />
        </IconButton>
      </div>
      <div
        className={classNames('focus:outline-none focus:shadow-outline', {
          'hidden group-hover:block': !isSelected
        })}
      >
        {checkbox}
      </div>
    </div>
  )
})
