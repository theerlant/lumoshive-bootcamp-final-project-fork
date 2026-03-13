import {
  LucideImage,
  LucideEye,
  LucidePencil,
  LucideTrash,
  LucidePlus,
} from "lucide-react";
import Button from "../../../components/Button";
import Switch from "../../../components/Switch";
import {
  TableBody,
  TableHead,
  TableHeadCol,
  TableRow,
  TableCell,
  TableWrapper,
} from "../../../components/Table";
import { IconButton } from "../../../components/IconButton";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SuccessModal, DeleteModal } from "@/admin/components/PremadeModal";
import { toast } from "react-toastify";
import { DUMMY_DATA } from "./dummy_data";

const AdminBannerListPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState(DUMMY_DATA);

  const [idToDelete, setIdToDelete] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteConfirm = () => {
    setBanners(banners.filter((b) => b.id !== idToDelete));
    setIdToDelete(null);
    setSuccessMessage("Banner successfully deleted!");
    setSuccessVisible(true);
    toast.success("Banner deleted successfully");
  };

  const handleTogglePublish = (id) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, is_published: !b.is_published } : b,
      ),
    );
    toast.success("Banner status updated!");
  };

  return (
    <div>
      <PageHeader onAdd={() => navigate("./add")} />

      <section id="list-table" className="mt-6">
        <TableWrapper>
          <TableHead>
            <TableHeadCol title="Banner Picture" />
            <TableHeadCol title="Banner Name" />
            <TableHeadCol title="Target URL" />
            <TableHeadCol title="Release Date" />
            <TableHeadCol title="End Date" />
            <TableHeadCol title="Published" />
            <TableHeadCol title="Action" />
          </TableHead>
          <TableBody>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <img
                      src={banner.image}
                      alt={banner.name}
                      className="w-16 h-10 object-cover rounded bg-gray-100"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-800">
                    {banner.name}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {banner.target_url || "-"}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {banner.start_date
                      ? new Date(banner.start_date).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {banner.end_date
                      ? new Date(banner.end_date).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      on={!!banner.is_published}
                      onChange={() => handleTogglePublish(banner.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton
                        onClick={() => navigate(`./detail/${banner.id}`)}
                        title="Detail"
                      >
                        <LucideEye
                          size={18}
                          className="text-gray-500 hover:text-blue-500 transition-colors"
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => navigate(`./edit/${banner.id}`)}
                        title="Edit"
                      >
                        <LucidePencil
                          size={18}
                          className="text-gray-500 hover:text-orange-500 transition-colors"
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => setIdToDelete(banner.id)}
                        title="Delete"
                      >
                        <LucideTrash
                          size={18}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-400 italic"
                >
                  No banners found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableWrapper>
      </section>

      <DeleteModal
        isOpen={idToDelete !== null}
        title="Delete Banner?"
        onCancel={() => setIdToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      <SuccessModal
        visible={successVisible}
        setVisible={setSuccessVisible}
        message={successMessage}
      />
    </div>
  );
};

const PageHeader = ({ onAdd }) => (
  <section id="header" className="flex justify-between items-start">
    <div>
      <h1 className="text-2xl font-bold">Banner Management</h1>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/admin" },
          { label: "Banner Management" },
        ]}
      />
    </div>
    <Button onClick={onAdd}>
      <p className="text-xs">Add New Banner</p>
    </Button>
  </section>
);

export default AdminBannerListPage;
