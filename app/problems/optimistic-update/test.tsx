import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Optimistic update 문제', () => {
  it('저장 실패 시 좋아요 상태가 롤백된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const targetButton = screen.getAllByRole('button', { name: '좋아요' })[1];
    await user.click(targetButton);

    await waitFor(() => {
      expect(screen.getByText('저장 실패')).toBeInTheDocument();
    });

    expect(
      screen.getAllByRole('button', { name: '좋아요' }).length
    ).toBeGreaterThan(0);
  });
});
