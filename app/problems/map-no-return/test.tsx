import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Map Return 누락 문제', () => {
  it('상품 목록이 화면에 표시된다', () => {
    // Arrange & Act
    render(<App />);

    // Assert - page title
    expect(screen.getByText(/인기 상품/i)).toBeInTheDocument();

    // Assert - all products visible
    expect(screen.getByText('무선 이어폰')).toBeInTheDocument();
    expect(screen.getByText('스마트 워치')).toBeInTheDocument();
    expect(screen.getByText('노트북 스탠드')).toBeInTheDocument();
    expect(screen.getByText('기계식 키보드')).toBeInTheDocument();

    // Assert - prices visible
    expect(screen.getByText('159,000원')).toBeInTheDocument();
    expect(screen.getByText('299,000원')).toBeInTheDocument();

    // Assert - all cart buttons present
    const cartButtons = screen.getAllByText(/장바구니 담기/i);
    expect(cartButtons).toHaveLength(4);
  });
});
