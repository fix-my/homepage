import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('콜백 재생성 문제', () => {
  it('과일을 선택할 수 있다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/선택된 과일:/i)).toBeInTheDocument();
    expect(screen.getByText(/없음/i)).toBeInTheDocument();

    // Act
    const appleButton = screen.getByRole('button', { name: /사과/i });
    await user.click(appleButton);

    // Assert
    expect(
      screen.getByText('사과', { selector: '.font-semibold.text-purple-600' })
    ).toBeInTheDocument();
  });

  it('다른 과일을 선택하면 이전 선택이 해제된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act - select apple
    const appleButton = screen.getByRole('button', { name: /사과/i });
    await user.click(appleButton);

    // Assert apple selected
    expect(
      screen.getByText('사과', { selector: '.font-semibold.text-purple-600' })
    ).toBeInTheDocument();

    // Act - select banana
    const bananaButton = screen.getByRole('button', { name: /바나나/i });
    await user.click(bananaButton);

    // Assert banana selected
    expect(
      screen.getByText('바나나', { selector: '.font-semibold.text-purple-600' })
    ).toBeInTheDocument();
  });

  it('모든 과일 버튼이 렌더링된다', () => {
    // Arrange & Act
    render(<App />);

    // Assert
    expect(screen.getByRole('button', { name: /사과/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /바나나/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /체리/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /딸기/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /포도/i })).toBeInTheDocument();
  });

  it('선택하지 않은 버튼은 리렌더링되지 않아야 한다', async () => {
    // Arrange
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />);

    consoleSpy.mockClear();

    // Act
    const appleButton = screen.getByRole('button', { name: /사과/i });
    await user.click(appleButton);

    // Assert
    const logs = consoleSpy.mock.calls.map((call) => call[0]);
    const renderCount = logs.filter(
      (log) => log && log.includes('버튼 리렌더')
    ).length;

    consoleSpy.mockRestore();

    expect(renderCount).toBeLessThanOrEqual(1);
  });
});
