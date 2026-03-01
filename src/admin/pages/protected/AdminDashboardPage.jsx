import { useEffect } from "react";
import { UserService } from "../../../shared/services/userService";

export default function AdminDashboardPage() {
  useEffect(() => {
    UserService.get()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
