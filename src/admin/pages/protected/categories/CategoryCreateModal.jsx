import { useState } from "react";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

export default function CategoryCreateModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);

  const handleSubmit = () => {
    onSubmit({
      name,
      icon,
    });

    setName("");
    setIcon(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[420px]">

        <h2 className="text-lg font-bold mb-6">
          Add Category
        </h2>

        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-500">
              Category Name
            </label>

            <InputField
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Category Icon
            </label>

            <input
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <Button variant="outlined" size="small" onClick={onClose}>
            Cancel
          </Button>

          <Button size="small" onClick={handleSubmit}>
            Add Category
          </Button>

        </div>

      </div>
    </Modal>
  );
}