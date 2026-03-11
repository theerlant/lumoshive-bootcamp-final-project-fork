import { useEffect, useState } from "react";
import { AccountLayout } from "./components/AccountSidebar";
import { UserService } from "../../../../shared/services/userService";

export const MyProfilePage = () => {
  const [user, setUser] = useState({ full_name: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await UserService.get();
      setUser(res.data.data);
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UserService.update(user.full_name);
      alert("Profile updated!");
      
      if (passwords.new) {
        if (passwords.new !== passwords.confirm) return alert("New passwords don't match");
        await UserService.changePassword(passwords.current, passwords.new);
        alert("Password updated!");
      }
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-md rounded-md">
        <h2 className="text-[#DB4444] text-lg font-medium mb-6">Edit Your Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Full Name</label>
              <input type="text" value={user.full_name} onChange={(e) => setUser({...user, full_name: e.target.value})} className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email</label>
              <input type="email" value={user.email} disabled className="bg-gray-100 text-gray-400 rounded-md px-4 py-3 text-sm outline-none cursor-not-allowed" />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <label className="text-sm font-medium">Password Changes</label>
            <input type="password" placeholder="Current Password" onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none" />
            <input type="password" placeholder="New Password" onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none" />
            <input type="password" placeholder="Confirm New Password" onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none" />
          </div>

          <div className="flex justify-end gap-4">
            <button type="submit" disabled={loading} className="bg-[#DB4444] text-white px-8 py-3 rounded-md text-sm">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};