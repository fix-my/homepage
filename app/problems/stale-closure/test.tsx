import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('타이머 클로저 문제', () => {
  it('시작 버튼을 누르면 카운트다운이 정상 작동한다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Assert initial state
    expect(screen.getByText('5')).toBeInTheDocument();

    // Act
    const startButton = screen.getByRole('button', { name: /시작/i });
    await user.click(startButton);

    // Assert countdown sequence
    expect(await screen.findByText('4', {}, { timeout: 1500 })).toBeInTheDocument();
    expect(await screen.findByText('3', {}, { timeout: 1500 })).toBeInTheDocument();
    expect(await screen.findByText('2', {}, { timeout: 1500 })).toBeInTheDocument();
    expect(await screen.findByText('1', {}, { timeout: 1500 })).toBeInTheDocument();
    expect(await screen.findByText('0', {}, { timeout: 1500 })).toBeInTheDocument();

    // Assert button re-enabled
    expect(screen.getByRole('button', { name: /시작/i })).toBeEnabled();
  });
});
