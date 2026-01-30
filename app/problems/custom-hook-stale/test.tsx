import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('useDebounce 훅 테스트', () => {
  it('초기 렌더링시 입력값과 debounced 값이 빈 문자열이어야 한다', () => {
    // Arrange & Act
    render(<App />);

    // Assert
    expect(screen.getByText(/입력값:/i)).toHaveTextContent('입력값:');
    expect(screen.getByText(/Debounced 값:/i)).toHaveTextContent('Debounced 값:');
  });

  it('검색어 입력시 입력값은 즉시 업데이트되어야 한다', async () => {
    // Arrange
    const user = userEvent.setup({ delay: null });
    render(<App />);

    // Act
    const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    await user.type(input, '리액트');

    // Assert
    expect(screen.getByText(/입력값:/i)).toHaveTextContent('입력값: 리액트');
  });

  it('debounced 값은 500ms 후에 업데이트되어야 한다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    await user.type(input, '리액트');

    // Assert - immediate check
    expect(screen.getByText(/Debounced 값:/i)).toHaveTextContent('Debounced 값:');

    // Assert - after debounce
    await waitFor(
      () => {
        expect(screen.getByText(/Debounced 값:/i)).toHaveTextContent('Debounced 값: 리액트');
      },
      { timeout: 1500 }
    );
  });

  it('빠르게 여러 번 입력시 마지막 값만 debounce되어야 한다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    await user.type(input, '리액트');

    // Assert
    await waitFor(
      () => {
        expect(screen.getByText(/Debounced 값:/i)).toHaveTextContent('Debounced 값: 리액트');
      },
      { timeout: 1500 }
    );
  });

  it('이전 타이머를 정리하지 않으면 중간 값이 최종 값 이후에 나타난다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);

    // Act - first input
    await user.clear(input);
    await user.type(input, 'test');

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Act - second input before first timer completes
    await user.clear(input);
    await user.type(input, 'final');

    // Assert - check intermediate state
    await new Promise((resolve) => setTimeout(resolve, 300));
    const textAt600 = screen.getByText(/Debounced 값:/i).textContent || '';

    if (textAt600.includes('Debounced 값: test')) {
      throw new Error(
        'cleanup이 없어서 이전 타이머가 실행됨\n' +
          `t=600에서 값: "${textAt600}"\n` +
          '첫 번째 타이머(t=500)가 취소되지 않아 중간값이 나타났습니다.'
      );
    }

    // Assert - final value
    await waitFor(
      () => {
        expect(screen.getByText(/Debounced 값:/i)).toHaveTextContent('Debounced 값: final');
      },
      { timeout: 1500 }
    );
  });

  it('debounced 값으로 검색 결과가 필터링되어야 한다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const input = screen.getByPlaceholderText(/검색어를 입력하세요/i);
    await user.type(input, '리액트');

    // Assert
    expect(await screen.findByText('리액트 hooks 사용법', {}, { timeout: 1500 })).toBeInTheDocument();
    expect(screen.getByText('리액트 상태 관리')).toBeInTheDocument();
    expect(screen.getByText('리액트 성능 최적화')).toBeInTheDocument();
    expect(screen.queryByText('자바스크립트 비동기 처리')).not.toBeInTheDocument();
  });
});
