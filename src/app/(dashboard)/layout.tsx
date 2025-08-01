import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DasboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <DasboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
            <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout;