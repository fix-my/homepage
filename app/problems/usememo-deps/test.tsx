import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('useMemo 의존성 문제', () => {
  it('아이템 추가 시 합계가 업데이트된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('합계: 0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '아이템 추가' }));

    expect(screen.getByText('합계: 10')).toBeInTheDocument();
  });
});
