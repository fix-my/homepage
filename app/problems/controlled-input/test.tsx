import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('제어 컴포넌트 입력 문제', () => {
  it('이메일과 비밀번호를 입력하고 가입할 수 있다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/회원가입/i)).toBeInTheDocument();

    // Act
    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    await user.type(emailInput, 'test@test.com');

    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    await user.type(passwordInput, 'password123');

    // Assert input values
    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('password123');

    // Act - submit
    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    await user.click(submitButton);

    // Assert
    expect(await screen.findByText(/가입 완료!/i)).toBeInTheDocument();
  });
});
