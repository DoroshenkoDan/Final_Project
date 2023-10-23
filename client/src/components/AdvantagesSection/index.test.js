import React from 'react'
import { render } from '@testing-library/react'
import Advantages from './index'

test('Advantages component snapshot', () => {
  const { asFragment } = render(<Advantages />)

  expect(asFragment()).toMatchSnapshot()
})
