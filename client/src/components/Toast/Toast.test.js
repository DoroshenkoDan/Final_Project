import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from './index';

jest.useFakeTimers();

describe('Toast component', () => {
  test('renders toast with message', () => {
    render(<Toast message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  test('closes toast on button click', () => {
    const onCloseMock = jest.fn();
    render(<Toast message="Test Message" onClose={onCloseMock} />);

    fireEvent.click(screen.getByTestId('btn-close'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('closes toast after duration', () => {
    const onCloseMock = jest.fn();
    render(<Toast message="Test Message" duration={2000} onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});