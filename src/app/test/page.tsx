"use client"

import React from 'react'
import { Button, Space } from 'antd-mobile'

const Test: React.FC = () => {
  return (
    <>
        <Space wrap>
          <Button color='primary' fill='solid'>
            Solid
          </Button>
          <Button color='primary' fill='outline'>
            Outline
          </Button>
          <Button color='primary' fill='none'>
            None
          </Button>
        </Space>
        <Button block color='primary' size='large'>
          Block Button
        </Button>


        <Space wrap align='center'>
          <Button size='mini' color='primary'>
            Mini
          </Button>
          <Button size='small' color='primary'>
            Small
          </Button>
          <Button size='middle' color='primary'>
            Middle
          </Button>
          <Button size='large' color='primary'>
            Large
          </Button>
        </Space>
    </>
  )
}

export default Test;