import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('복잡한 Todo 앱', () => {
  it('완료 버튼을 클릭하면 상태가 토글된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    const todoText = screen.getByText('React 공부하기');
    expect(todoText).toBeInTheDocument();

    // Act
    const todoItem = todoText.closest('.todo-item') as HTMLElement;
    const checkbox = within(todoItem).getByRole('checkbox');
    await user.click(checkbox);

    // Assert
    expect(checkbox).toBeChecked();
  });

  it('삭제 버튼을 클릭하면 정확한 Todo가 삭제된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    const reactTodo = screen.getByText('React 공부하기');
    const todoItem = reactTodo.closest('.todo-item') as HTMLElement;
    const deleteButton = within(todoItem).getByRole('button', { name: /삭제/i });

    // Act
    await user.click(deleteButton);

    // Assert
    expect(screen.queryByText('React 공부하기')).not.toBeInTheDocument();
    expect(screen.getByText('프로젝트 배포하기')).toBeInTheDocument();
  });

  it('새 할일을 추가하면 목록이 즉시 업데이트된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/새로운 할 일을 입력하세요/i);
    const addButton = screen.getByRole('button', { name: /추가/i });

    // Act
    await user.type(input, '테스트 작성하기');
    await user.click(addButton);

    // Assert
    expect(await screen.findByText('테스트 작성하기')).toBeInTheDocument();
  });
});
