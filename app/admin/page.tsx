import { isAuthenticated } from "@/lib/admin-auth";
import { getAllBlogPosts } from "@/lib/blog";
import { AdminLogin } from "./admin-login";
import { AdminDashboard } from "./admin-dashboard";

export const metadata = {
  title: "Admin | Enes Demirel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-8 grow w-full">
        <AdminLogin />
      </section>
    );
  }

  const posts = getAllBlogPosts();

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
      <AdminDashboard posts={posts} />
    </section>
  );
}
