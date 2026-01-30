import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('리사이즈 리스너 중복 문제', () => {
  it('리렌더를 여러 번 해도 리사이즈는 1번만 카운트된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '리렌더 추가' }));
    await user.click(screen.getByRole('button', { name: '리렌더 추가' }));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(screen.getByText('리사이즈 횟수: 1')).toBeInTheDocument();
    });
  });
});
