import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Portal 모달 문제', () => {
  it('모달은 app-root 바깥에 렌더된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '모달 열기' }));

    const modal = document.body.querySelector('[role="dialog"]');
    const appRoot = screen.getByTestId('app-root');

    expect(modal).toBeInTheDocument();
    expect(appRoot.contains(modal as Node)).toBe(false);
  });
});
