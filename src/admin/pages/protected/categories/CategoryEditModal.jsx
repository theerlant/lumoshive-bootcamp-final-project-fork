import { useState, useEffect } from "react";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

export default function CategoryEditModal({
  isOpen,
  onClose,
  category,
  onSubmit,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = () => {
    onSubmit({
      ...category,
      name,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

      <div className="w-[420px]">

        <h2 className="text-lg font-bold mb-6">
          Edit Category
        </h2>

        <InputField
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">

          <Button variant="outlined" size="small" onClick={onClose}>
            Cancel
          </Button>

          <Button size="small" onClick={handleSubmit}>
            Save
          </Button>

        </div>

      </div>

    </Modal>
  );
}