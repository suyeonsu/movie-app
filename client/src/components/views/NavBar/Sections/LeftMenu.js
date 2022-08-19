import { Menu } from 'antd'
import React from 'react'

function LeftMenu(props) {
  return (
      <Menu mode={props.mode}>
          <Menu.Item key="mail">
              <a href='/'>Home</a>
          </Menu.Item>
          <Menu.Item key="favorite">
              <a href='/favorite'>favorite</a>
          </Menu.Item>
      </Menu>
  )
}

export default LeftMenu