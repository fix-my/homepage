import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Error Boundary 문제', () => {
  it('오류가 발생하면 대체 UI가 표시된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: '증가' });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(screen.getByRole('alert')).toHaveTextContent('문제가 발생했습니다');
  });
});
