import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  // Lock body scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      // Backdrop: #101010 at 40% opacity, fixed to cover screen
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101010]/40 p-4 transition-opacity"
      onClick={onClose} // Clicking the backdrop closes the modal
      aria-modal="true"
      role="dialog"
    >
      <div
        // Container: White, 20px radius, scaling with min-size, custom padding
        className="bg-white rounded-[20px] px-6 py-8 md:px-[80px] md:py-[40px] min-w-[300px] w-auto max-w-[95vw] md:max-w-[80vw] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevents backdrop click from triggering inside the modal
      >
        {children}
      </div>
    </div>
  );
};
