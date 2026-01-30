import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('useEffect 의존성 배열', () => {
  it('검색어를 입력하면 실시간으로 결과가 업데이트된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Assert initial state
    const initialItems = await screen.findAllByRole('listitem');
    expect(initialItems).toHaveLength(6);

    // Act - search for '노트'
    const input = screen.getByPlaceholderText(/상품 이름을 입력하세요/i);
    await user.type(input, '노트');

    // Assert - only '노트북' visible
    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent('노트북');
    });

    // Act - search for '의자'
    await user.clear(input);
    await user.type(input, '의자');

    // Assert - only '의자' visible
    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent('의자');
    });
  });
});
