import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";

export default function CategoryDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>

      <div className="w-[340px] text-center">

        <h2 className="text-xl font-bold mb-3">
          Confirmation
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Are you sure want to delete this category?
        </p>

        <div className="flex justify-center gap-4">

          <Button
            variant="outlined"
            size="small"
            onClick={onClose}
          >
            No
          </Button>

          <Button
            size="small"
            onClick={onConfirm}
          >
            Yes
          </Button>

        </div>

      </div>

    </Modal>
  );
}