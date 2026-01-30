import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: "홍길동", email: "hong@example.com" });
      setLoading(false);
    }, 500);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          대시보드
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">이름</p>
              <p className="text-xl font-semibold text-gray-800">{user.name}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">이메일</p>
              <p className="text-xl font-semibold text-gray-800">
                {user.email}
              </p>
            </div>
          </div>
        )}

        <p className="text-center text-gray-500 mt-6 text-sm">환영합니다!</p>
      </div>
    </div>
  );
}
