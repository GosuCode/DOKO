import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import UpdateProfile from "@/components/dashboard/layout/create-profile";
import PageContainer from "@/components/dashboard/layout/page-container";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Profile", link: "/dashboard/profile" },
];
export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <UpdateProfile />
      </div>
    </PageContainer>
  );
}
