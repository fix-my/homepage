import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Race Condition 문제', () => {
  it('검색 입력 필드가 존재해야 합니다', () => {
    // Arrange & Act
    render(<App />);

    // Assert
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', expect.stringContaining('검색어를 입력'));
  });

  it('검색어를 입력하면 결과가 표시되어야 합니다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'angular');

    // Assert
    await waitFor(
      () => {
        const resultItems = screen.getAllByRole('listitem');
        expect(resultItems.length).toBeGreaterThan(0);
      },
      { timeout: 500 }
    );
  });

  it('빠른 검색어 변경 시 마지막 요청의 결과만 표시된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox');

    // Act - rapid searches
    await user.clear(input);
    await user.type(input, 'react');

    await user.clear(input);
    await user.type(input, 'vue');

    await user.clear(input);
    await user.type(input, 'angular');

    // Assert - wait for results
    await waitFor(
      () => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      },
      { timeout: 300 }
    );

    // Assert - ensure all requests complete
    await waitFor(
      () => {
        const items = screen.getAllByRole('listitem');
        const firstResult = items[0].textContent;
        expect(firstResult).toContain('Angular');
      },
      { timeout: 500, interval: 50 }
    );
  });
});
