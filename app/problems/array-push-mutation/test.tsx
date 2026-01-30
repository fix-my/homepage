import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('배열 Mutation 문제', () => {
  it('새 메모를 추가하면 화면에 즉시 반영된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Assert initial state
    expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
    expect(screen.getByText('운동 30분')).toBeInTheDocument();
    expect(screen.getByText('총 2개의 메모')).toBeInTheDocument();

    // Act
    const input = screen.getByPlaceholderText(/새 메모를 입력하세요/i);
    await user.type(input, '새로운 메모');

    const addButton = screen.getByRole('button', { name: /추가/i });
    await user.click(addButton);

    // Assert
    expect(await screen.findByText('새로운 메모')).toBeInTheDocument();
    expect(await screen.findByText('총 3개의 메모')).toBeInTheDocument();
  });
});
