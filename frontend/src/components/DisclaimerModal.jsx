import { useState } from "react";

function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(() => {
    const lastAccepted = localStorage.getItem("disclaimerAcceptedAt");
    if (!lastAccepted) return true;

    const time = 10 * 60 * 1000;
    const now = Date.now();
    return now - parseInt(lastAccepted, 10) > time;
  });

  const closeModal = () => {
    localStorage.setItem("disclaimerAcceptedAt", Date.now().toString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">⚠️ Early Development Notice</h2>
        <p className="text-gray-700 mb-6">
          This website is still in early development. You may experience bugs,
          downtime, or incomplete features.
        </p>
        <button
          onClick={() => closeModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}

export default DisclaimerModal;
