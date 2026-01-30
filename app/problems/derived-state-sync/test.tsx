import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('파생 상태 동기화 문제', () => {
  it('사용자를 변경하면 입력값이 즉시 바뀐다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText('이름') as HTMLInputElement;
    expect(input.value).toBe('Alice');

    await user.click(screen.getByRole('button', { name: 'Bob' }));

    expect((screen.getByLabelText('이름') as HTMLInputElement).value).toBe(
      'Bob'
    );
  });
});
