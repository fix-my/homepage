import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Suspense 캐시 문제', () => {
  it('초기 로딩 이후에는 카운터 클릭으로 로딩 상태가 다시 나타나지 않는다', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('로딩...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Ada Lovelace/)).toBeInTheDocument();
    });

    const counterButton = screen.getByRole('button', { name: /카운터:/ });
    await user.click(counterButton);

    expect(screen.getByText(/카운터: 1/)).toBeInTheDocument();
    expect(screen.queryByText('로딩...')).not.toBeInTheDocument();
  });
});
