import { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { CheckCircle, Trash2 } from "lucide-react";
import Button from "./Button";

// Auto dismissable success modal (3s default)
// You must give state and setState
// so it can automatically dismiss it self
export const SuccessModal = ({
  visible,
  setVisible,
  duration = 3000,
  message = "",
}) => {
  const timeout = useRef(null);

  useEffect(() => {
    if (visible) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setVisible(false), duration);
    }
  }, [visible]);

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <div className="space-y-6 pb-2">
        <CheckCircle
          className="mx-auto text-emerald-400"
          size={80}
          strokeWidth={1}
        />
        <h2 className="text-xl font-medium">{message}</h2>
      </div>
    </Modal>
  );
};

export const DeleteModal = ({
  isOpen = false,
  title = "Delete Something?",
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center animate-pulse">
          <Trash2 className="text-red-500" size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
