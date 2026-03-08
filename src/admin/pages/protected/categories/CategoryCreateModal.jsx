import { useState } from "react";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import { InputField } from "../../../components/InputField";

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
            <label className="text-sm text-gray-500 block mb-2">
              Category Icon
            </label>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500">
                  Upload File
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG / JPG
                </p>

                {icon && (
                  <p className="text-xs text-green-600 mt-2">
                    {icon.name}
                  </p>
                )}
              </div>

              <input
                type="file"
                className="hidden"
                onChange={(e) => setIcon(e.target.files[0])}
              />

            </label>

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