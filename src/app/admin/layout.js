/**
 * Admin route group — noindex so the internal tool is less likely to be indexed.
 * Access control is enforced by API auth + the page login gate (not middleware).
 */
export const metadata = {
  title: "Registration Analytics · hackUMBC",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
