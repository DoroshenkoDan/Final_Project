import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import OrderPage from './index'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

jest.mock('axios')

const order = {
  _id: '1',
  orderNo: 123,
  totalSum: 100,
  products: [
    {
      _id: '2',
      product: {
        id: 'product-1',
        name: 'Product 1',
        imageUrls: ['image-url-1'],
        description: 'Description 1',
        currentPrice: 50,
      },
      cartQuantity: 2,
    },
    {
      _id: '3',
      product: {
        id: 'product-2',
        name: 'Product 2',
        imageUrls: ['image-url-2'],
        description: 'Description 2',
        currentPrice: 30,
      },
      cartQuantity: 1,
    },
  ],
}
const changeOrders = jest.fn()

describe('OrderItem', () => {
  it('OrderItem is render', () => {
    render(
      <MemoryRouter>
        <OrderPage order={order} changeOrders={changeOrders} />
      </MemoryRouter>,
    )
  })

  it('Check if order details are displayed', () => {
    const { getByText } = render(
      <MemoryRouter>
        <OrderPage order={order} changeOrders={changeOrders} />
      </MemoryRouter>,
    )

    expect(getByText(`Order: № ${order.orderNo}`)).toBeInTheDocument()
    expect(getByText(`Total Sum: ${order.totalSum}$`)).toBeInTheDocument()
  })

  it('Check if each product is displayed', () => {
    const { getByText } = render(
      <MemoryRouter>
        <OrderPage order={order} changeOrders={changeOrders} />
      </MemoryRouter>,
    )

    order.products.forEach((product) => {
      expect(getByText(product.product.name)).toBeInTheDocument()
      expect(getByText(`Quantity: ${product.cartQuantity}`)).toBeInTheDocument()
      expect(getByText(product.product.description)).toBeInTheDocument()
      expect(getByText(`${product.product.currentPrice}$`)).toBeInTheDocument()
    })
  })

  it('Check that order deleted', async () => {
    axios.delete.mockResolvedValue({
      data: 'Order deleted',
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <OrderPage order={order} changeOrders={changeOrders} />
      </MemoryRouter>,
    )

    // Simulate a click on the delete button
    fireEvent.click(getByTestId('btn-close'))

    // Wait for the axios delete request to complete
    await waitFor(() => {
      expect(changeOrders).toHaveBeenCalledWith(order._id)
    })
  })
})
