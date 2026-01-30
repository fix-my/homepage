import { useState } from 'react';
import Modal from './components/Modal';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4"
        data-testid="app-root"
      >
        <h1 className="text-2xl font-bold">모달 열기</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          모달 열기
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <p>포털 모달 콘텐츠</p>
        </Modal>
      </div>
    </div>
  );
}
