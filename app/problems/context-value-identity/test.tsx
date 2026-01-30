import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('컨텍스트 값 리렌더 문제', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('카운터를 눌러도 ThemeToggle이 리렌더되지 않는다', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/카운터: 0/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /테마:/ })).toBeInTheDocument();
    expect(consoleLogSpy).toHaveBeenCalledWith('ThemeToggle render');

    consoleLogSpy.mockClear();

    const counterButton = screen.getByRole('button', { name: /카운터:/ });
    await user.click(counterButton);

    expect(screen.getByText(/카운터: 1/)).toBeInTheDocument();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('ThemeToggle render');
  });

  it('테마 변경 시 ThemeToggle이 리렌더되고 텍스트가 변경된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeButton = screen.getByRole('button', { name: /테마:/ });
    await user.click(themeButton);

    expect(screen.getByRole('button', { name: /다크/ })).toBeInTheDocument();
    expect(consoleLogSpy).toHaveBeenCalledWith('ThemeToggle render');
  });
});
