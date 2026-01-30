import './globals.css';

export const metadata = {
  title: 'Fix My Homepage - Problems',
  description: '문제를 선택하여 로컬에서 테스트하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
