import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('인터벌 정리 문제', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('정지하면 카운터가 멈춘다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggleButton = screen.getByRole('button', { name: '시작' });
    await user.click(toggleButton);

    for (let i = 0; i < 3; i += 1) {
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText('카운트: 3')).toBeInTheDocument();

    const stopButton = screen.getByRole('button', { name: '정지' });
    await user.click(stopButton);

    for (let i = 0; i < 2; i += 1) {
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText('카운트: 3')).toBeInTheDocument();
  });
});
