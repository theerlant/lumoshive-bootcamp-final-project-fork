import {
  LucideImage,
  LucideEye,
  LucidePencil,
  LucideTrash,
  LucideCheckCircle,
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
import { useState, useEffect } from "react";
import { bannerService } from "@/shared/services/bannerService";
import { Modal } from "@/admin/components/Modal";

const AdminBannerListPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [publishModal, setPublishModal] = useState({ isOpen: false, id: null, currentStatus: false });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
  try {
    setLoading(true);
    const res = await bannerService.admin.getAll(1, 10);
    
    // Debugging: Lihat isi response di Console Browser (F12)
    console.log("Response dari Backend:", res);

    // Cek apakah data ada di res.data (array) atau res.data.data (paginated)
    const dataBanner = res.data?.data || res.data || [];
    
    if (Array.isArray(dataBanner)) {
      setBanners(dataBanner);
    } else {
      console.error("Format data bukan array:", dataBanner);
      setBanners([]);
    }
  } catch (err) {
    console.error("Gagal ambil list banner:", err);
    setError(err);
  } finally {
    setLoading(false);
  }
};

  const handleDeleteConfirm = async () => {
    if (!idToDelete) return;
    try {
      await bannerService.admin.delete(idToDelete);
      setIdToDelete(null);
      setDeleteConfirmVisible(true);
      fetchBanners();
    } catch (err) {
      alert("Failed to delete banner");
      setIdToDelete(null);
    }
  };

  const handleTogglePublish = async () => {
    try {
      await bannerService.togglePublish(publishModal.id);
      setPublishModal({ isOpen: false, id: null, currentStatus: false });
      fetchBanners();
    } catch (err) {
      alert("Failed to toggle publish status");
    }
  };

  return (
    <div className="p-6">
      <PageHeader onAdd={() => navigate("./add")} />

      <section id="list-table" className="mt-6">
        {loading ? (
          <div className="p-4 flex justify-center"><LucideImage className="animate-spin text-red-500" /></div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center border border-red-100 bg-red-50 rounded">Error: {error.message}</div>
        ) : (
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
                      <img src={banner.image} alt={banner.name} className="w-16 h-10 object-cover rounded bg-gray-100" />
                    </TableCell>
                    <TableCell className="font-medium text-gray-800">{banner.name}</TableCell>
                    <TableCell className="text-gray-500 text-sm">{banner.target_url || "-"}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {banner.start_date ? new Date(banner.start_date).toLocaleDateString("id-ID") : "-"}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {banner.end_date ? new Date(banner.end_date).toLocaleDateString("id-ID") : "-"}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        on={!!banner.is_published} 
                        onChange={() => setPublishModal({ isOpen: true, id: banner.id, currentStatus: banner.is_published })} 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <IconButton onClick={() => navigate(`./detail/${banner.id}`)} title="Detail">
                          <LucideEye size={18} className="text-gray-500 hover:text-blue-500 transition-colors" />
                        </IconButton>
                        <IconButton onClick={() => navigate(`./edit/${banner.id}`)} title="Edit">
                          <LucidePencil size={18} className="text-gray-500 hover:text-orange-500 transition-colors" />
                        </IconButton>
                        <IconButton onClick={() => setIdToDelete(banner.id)} title="Delete">
                          <LucideTrash size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-400 italic">No banners found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableWrapper>
        )}
      </section>

      {/* Modals tetap sama */}
      <DeleteModal 
        isOpen={idToDelete !== null} 
        onCancel={() => setIdToDelete(null)} 
        onConfirm={handleDeleteConfirm} 
      />
      
      <Modal isOpen={deleteConfirmVisible} onClose={() => setDeleteConfirmVisible(false)}>
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <LucideCheckCircle size={48} className="text-green-500" />
          <h2 className="text-lg font-bold">This banner was successfully deleted</h2>
        </div>
      </Modal>

      <Modal isOpen={publishModal.isOpen} onClose={() => setPublishModal({ ...publishModal, isOpen: false })}>
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <h3 className="text-xl font-bold text-red-500">! Confirmation</h3>
          <p className="text-gray-600">Are you sure want to {publishModal.currentStatus ? "unpublish" : "publish"} this banner?</p>
          <div className="flex gap-4 mt-2">
            <Button variant="outlined" onClick={() => setPublishModal({ ...publishModal, isOpen: false })} className="w-24 border-red-500 text-red-500">No</Button>
            <Button onClick={handleTogglePublish} className="w-24 bg-red-500 text-white">Yes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const PageHeader = ({ onAdd }) => (
  <section id="header" className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold">Banner Management</h1>
      <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Banner Management" }]} />
    </div>
    <Button onClick={onAdd} className="bg-[#DB4444] text-white flex items-center gap-2 px-4 py-2 rounded-md">
      <LucidePlus size={18} />
      <span className="text-sm font-semibold">Add New Banner</span>
    </Button>
  </section>
);

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onCancel}>
    <div className="flex flex-col items-center text-center gap-4 p-4">
      <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
        <LucideTrash size={32} className="text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-red-500">Delete Banner?</h2>
      <p className="text-gray-600">Are you sure want to delete this banner?</p>
      <div className="flex gap-4 mt-4">
        <Button variant="outlined" onClick={onCancel} className="w-24 border-red-500 text-red-500">No</Button>
        <Button onClick={onConfirm} className="w-24 bg-red-500 text-white">Yes</Button>
      </div>
    </div>
  </Modal>
);

export default AdminBannerListPage;