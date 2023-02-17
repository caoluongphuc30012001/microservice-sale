import UserSection from "@/components/dashboard/user/user";
import MainLayout from "@/components/layouts/main-layout";
import React from "react";

function UserDashboard() {
  return (
    <MainLayout>
      <UserSection />
    </MainLayout>
  );
}

export default UserDashboard;
