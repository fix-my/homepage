import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('폼 실시간 검증 문제', () => {
  it('잘못된 이메일을 입력하면 즉시 에러 메시지가 표시된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const emailInput = screen.getByLabelText(/이메일/i);
    await user.type(emailInput, 'invalid-email');

    // Assert
    expect(screen.getByText(/올바른 이메일 형식이 아닙니다/i)).toBeInTheDocument();
  });

  it('짧은 비밀번호를 입력하면 즉시 에러 메시지가 표시된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const passwordInput = screen.getByLabelText(/^비밀번호$/i);
    await user.type(passwordInput, '1234');

    // Assert
    expect(screen.getByText(/비밀번호는 8자 이상이어야 합니다/i)).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인이 다르면 즉시 에러 메시지가 표시된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const passwordInput = screen.getByLabelText(/^비밀번호$/i);
    await user.type(passwordInput, 'password123');

    const confirmPasswordInput = screen.getByLabelText(/비밀번호 확인/i);
    await user.type(confirmPasswordInput, 'password456');

    // Assert
    expect(screen.getByText(/비밀번호가 일치하지 않습니다/i)).toBeInTheDocument();
  });

  it('올바른 값을 입력하면 에러 메시지가 사라진다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act - enter invalid email
    const emailInput = screen.getByLabelText(/이메일/i);
    await user.type(emailInput, 'invalid');

    // Assert - error shown
    expect(screen.getByText(/올바른 이메일 형식이 아닙니다/i)).toBeInTheDocument();

    // Act - enter valid email
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');

    // Assert - error gone
    expect(screen.queryByText(/올바른 이메일 형식이 아닙니다/i)).not.toBeInTheDocument();
  });

  it('모든 필드가 유효하면 가입할 수 있다', async () => {
    // Arrange
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(<App />);

    // Act
    const emailInput = screen.getByLabelText(/이메일/i);
    await user.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByLabelText(/^비밀번호$/i);
    await user.type(passwordInput, 'password123');

    const confirmPasswordInput = screen.getByLabelText(/비밀번호 확인/i);
    await user.type(confirmPasswordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    await user.click(submitButton);

    // Assert
    expect(alertMock).toHaveBeenCalledWith('회원가입 성공! 🎉');

    alertMock.mockRestore();
  });
});
