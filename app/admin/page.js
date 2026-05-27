import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Olfativa",
  robots: { index: false, follow: false }
};

export default async function AdminPage({ searchParams }) {
  const sp = await searchParams;
  const initialKey = sp?.key || "";
  return <AdminDashboard initialKey={initialKey} />;
}
