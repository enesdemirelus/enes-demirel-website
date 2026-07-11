import { isAuthenticated } from "@/lib/admin-auth";
import { AdminLogin } from "./admin-login";
import { AdminPublishForm } from "./admin-publish-form";

export const metadata = {
  title: "Admin | Enes Demirel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();

  return (
    <section className="max-w-3xl mx-auto px-6 py-8 grow w-full">
      {authed ? <AdminPublishForm /> : <AdminLogin />}
    </section>
  );
}
