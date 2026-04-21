"use client";

import * as React from "react";
import {
  AlertCircle, Trash2, Pencil, Eye, MoreVertical, Folder, FolderPlus, Settings,
  TrendingUp, Users, DollarSign, Bell, Home, BarChart3, FileText, LogOut,
} from "lucide-react";
import { ShowcaseLayout, ShowcaseSection } from "@/components/showcase";
import { Button } from "@/components/base/button";
import { Badge } from "@/components/base/badge";
import { Avatar } from "@/components/base/avatar";
import { Alert, Banner, EmptyState } from "@/components/application/alert";
import { Modal, Drawer, ConfirmDialog } from "@/components/application/modal";
import { Tabs, Breadcrumbs, Pagination, Stepper } from "@/components/application/navigation";
import { Dropdown, Combobox, CommandMenu } from "@/components/application/dropdown";
import { Table } from "@/components/application/table";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard, StatGrid } from "@/components/application/card";
import { Sidebar, TopNav } from "@/components/application/sidebar";
import { FileUpload, UploadedFileItem, Skeleton, ToastProvider, useToast } from "@/components/application/feedback";
import { AreaChart, BarChart, DonutChart, ChartLegend } from "@/components/application/charts";
import { FeaturedIcon } from "@/components/base/misc";

const tableData = [
  { id: 1, name: "Olivia Rhye", email: "olivia@untitledui.com", role: "Admin", status: "Active" },
  { id: 2, name: "Phoenix Baker", email: "phoenix@untitledui.com", role: "Editor", status: "Active" },
  { id: 3, name: "Lana Steiner", email: "lana@untitledui.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Demi Wilkinson", email: "demi@untitledui.com", role: "Editor", status: "Active" },
];

const chartData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 5100, expenses: 2800 },
  { month: "Mar", revenue: 4800, expenses: 3100 },
  { month: "Apr", revenue: 6300, expenses: 3400 },
  { month: "May", revenue: 7100, expenses: 3800 },
  { month: "Jun", revenue: 8400, expenses: 4200 },
];

const donutData = [
  { name: "Direct", value: 4200 },
  { name: "Organic", value: 3100 },
  { name: "Paid", value: 1800 },
  { name: "Referral", value: 900 },
];

function ApplicationContent() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [tab, setTab] = React.useState("overview");
  const [page, setPage] = React.useState(3);
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set([2]));
  const [sortKey, setSortKey] = React.useState<string>("name");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [combo, setCombo] = React.useState("us");
  const [activeNav, setActiveNav] = React.useState("dashboard");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ShowcaseLayout
      title="Application UI"
      description="Components for building dashboards and internal tools. All keyboard accessible, all stateful examples are interactive."
    >
      <ShowcaseSection title="Alerts & banners">
        <div className="space-y-3">
          <Alert variant="info" title="New update available" description="Version 2.1.0 is now available with new features and improvements." onClose={() => {}} />
          <Alert variant="success" title="Payment successful" description="Your subscription has been renewed successfully." />
          <Alert variant="warning" title="Storage almost full" description="You've used 92% of your storage. Consider upgrading your plan." />
          <Alert variant="error" title="Connection failed" description="Unable to reach the server. Please check your network." />
          <Banner variant="brand" onClose={() => {}}>
            <Badge color="brand" variant="solid" size="sm">New</Badge>
            <span>Introducing the v2 design system. <a href="#" className="font-semibold underline">Learn more</a></span>
          </Banner>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Modals & drawers">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Confirm dialog</Button>
          <Button variant="secondary" onClick={() => setCmdOpen(true)}>
            Command menu <kbd className="ml-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded">⌘K</kbd>
          </Button>
          <Button variant="secondary" onClick={() => toast({ variant: "success", title: "Saved!", description: "Your changes have been saved." })}>
            Show toast
          </Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Update profile"
          description="Make changes to your profile here. Click save when you're done."
          icon={<FeaturedIcon variant="outline"><Pencil /></FeaturedIcon>}
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Save changes</Button>
            </>
          }
        >
          <p className="text-sm text-gray-600">Modal content goes here.</p>
        </Modal>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Project settings"
          description="Configure your project preferences"
          footer={
            <>
              <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setDrawerOpen(false)}>Save</Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Drawer content with longer scrollable area.</p>
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-4">
                <p className="text-sm font-medium">Setting {i + 1}</p>
                <p className="text-xs text-gray-500 mt-1">Description for this setting.</p>
              </Card>
            ))}
          </div>
        </Drawer>

        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => toast({ variant: "success", title: "Deleted" })}
          title="Delete this project?"
          description="This action cannot be undone. All data associated with this project will be permanently removed."
          confirmText="Delete project"
          variant="destructive"
          icon={<FeaturedIcon color="error" variant="outline"><AlertCircle /></FeaturedIcon>}
        />

        <CommandMenu
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          items={[
            { id: "1", label: "New project", icon: <FolderPlus />, group: "Actions", shortcut: "⌘N" },
            { id: "2", label: "Open file", icon: <FileText />, group: "Actions", shortcut: "⌘O" },
            { id: "3", label: "Settings", icon: <Settings />, group: "Navigate", shortcut: "⌘," },
            { id: "4", label: "Dashboard", icon: <Home />, group: "Navigate" },
            { id: "5", label: "Analytics", icon: <BarChart3 />, group: "Navigate" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Navigation">
        <div className="space-y-8">
          <div>
            <Breadcrumbs
              showHome
              items={[
                { label: "Projects", href: "#" },
                { label: "Design system", href: "#" },
                { label: "Components" },
              ]}
            />
          </div>
          <div>
            <Tabs
              variant="underline"
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "analytics", label: "Analytics", count: 12 },
                { id: "reports", label: "Reports" },
                { id: "notifications", label: "Notifications", count: 4 },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Tabs
              variant="segmented"
              tabs={[{ id: "1", label: "Day" }, { id: "2", label: "Week" }, { id: "3", label: "Month" }]}
              value={tab === "overview" ? "1" : "2"}
              onChange={() => {}}
            />
            <Tabs
              variant="pill"
              tabs={[{ id: "1", label: "All", count: 24 }, { id: "2", label: "Active", count: 12 }, { id: "3", label: "Archived" }]}
              value="1"
              onChange={() => {}}
            />
          </div>
          <div>
            <Pagination page={page} totalPages={10} onPageChange={setPage} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Stepper">
        <div className="space-y-12">
          <Stepper
            current={1}
            steps={[
              { title: "Account" },
              { title: "Verify email" },
              { title: "Personal info" },
              { title: "Done" },
            ]}
          />
          <div className="max-w-md">
            <Stepper
              orientation="vertical"
              current={2}
              steps={[
                { title: "Create account", description: "Set up your credentials" },
                { title: "Verify email", description: "Check your inbox" },
                { title: "Personal information", description: "Add your details" },
                { title: "Setup complete", description: "Welcome aboard" },
              ]}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Dropdowns">
        <div className="flex flex-wrap items-start gap-6">
          <Dropdown
            trigger={<Button variant="secondary"><MoreVertical />Options</Button>}
            items={[
              { id: "1", label: "View", icon: <Eye /> },
              { id: "2", label: "Edit", icon: <Pencil /> },
              { id: "3", label: "Settings", icon: <Settings />, shortcut: "⌘," },
              { id: "sep", label: "", separator: true },
              { id: "4", label: "Delete", icon: <Trash2 />, destructive: true },
            ]}
          />
          <div className="w-64">
            <Combobox
              value={combo}
              onChange={setCombo}
              options={[
                { value: "us", label: "United States" },
                { value: "sa", label: "Saudi Arabia", description: "KSA" },
                { value: "uk", label: "United Kingdom" },
                { value: "ae", label: "United Arab Emirates" },
                { value: "eg", label: "Egypt" },
              ]}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Table">
        <Table
          data={tableData}
          selectable
          selected={selected}
          onSelectChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(k) => {
            if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
            else { setSortKey(k); setSortDir("asc"); }
          }}
          columns={[
            {
              key: "name",
              header: "User",
              sortable: true,
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar size="sm" initials={r.name.split(" ").map((n: string) => n[0]).join("")} />
                  <div>
                    <p className="font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.email}</p>
                  </div>
                </div>
              ),
            },
            { key: "role", header: "Role", sortable: true },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <Badge color={r.status === "Active" ? "success" : "gray"} dot>
                  {r.status}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              render: () => (
                <Dropdown
                  align="end"
                  trigger={<Button variant="ghost" size="icon-sm"><MoreVertical /></Button>}
                  items={[
                    { id: "edit", label: "Edit", icon: <Pencil /> },
                    { id: "delete", label: "Delete", icon: <Trash2 />, destructive: true },
                  ]}
                />
              ),
            },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Cards & metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard label="Total revenue" value="$48,239" change={12.4} icon={<DollarSign />} />
          <MetricCard label="Active users" value="2,847" change={-3.2} icon={<Users />} />
          <MetricCard label="Conversion" value="3.84%" change={8.1} icon={<TrendingUp />} />
        </div>
        <StatGrid
          stats={[
            { label: "MRR", value: "$184k", description: "+12% MoM" },
            { label: "Customers", value: "1,247", description: "+38 this week" },
            { label: "Churn", value: "2.4%", description: "-0.3% MoM" },
            { label: "NPS", value: "67", description: "+4 vs last quarter" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Charts">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Revenue vs expenses</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </div>
            </CardHeader>
            <AreaChart
              data={chartData}
              xKey="month"
              series={[
                { key: "revenue", label: "Revenue" },
                { key: "expenses", label: "Expenses", color: "#039855" },
              ]}
              showLegend
            />
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Monthly comparison</CardTitle>
                <CardDescription>Revenue and expenses</CardDescription>
              </div>
            </CardHeader>
            <BarChart
              data={chartData}
              xKey="month"
              series={[
                { key: "revenue", label: "Revenue" },
                { key: "expenses", label: "Expenses", color: "#f79009" },
              ]}
              showLegend
            />
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <div>
                <CardTitle>Traffic sources</CardTitle>
                <CardDescription>Sessions by source</CardDescription>
              </div>
            </CardHeader>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <DonutChart data={donutData} centerValue="10k" centerLabel="sessions" />
              <ChartLegend
                items={donutData.map((d, i) => ({
                  label: d.name,
                  value: d.value.toLocaleString(),
                  color: ["#7f56d9", "#039855", "#f79009", "#d92d20"][i],
                }))}
              />
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sidebar layout">
        <div className="h-[480px] border border-gray-200 rounded-xl overflow-hidden flex">
          <Sidebar
            activeId={activeNav}
            onItemClick={setActiveNav}
            logo={<span className="font-display text-lg font-semibold">UI Kit</span>}
            items={[
              { id: "dashboard", label: "Dashboard", icon: <Home /> },
              { id: "analytics", label: "Analytics", icon: <BarChart3 />, badge: 12 },
              { id: "projects", label: "Projects", icon: <Folder />, children: [
                { id: "active", label: "Active", icon: <Folder /> },
                { id: "archived", label: "Archived", icon: <Folder /> },
              ]},
              { id: "team", label: "Team", icon: <Users /> },
              { id: "notifications", label: "Notifications", icon: <Bell />, badge: "3" },
              { id: "settings", label: "Settings", icon: <Settings /> },
            ]}
            footer={
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <LogOut className="size-4 text-gray-500" />
                Sign out
              </button>
            }
          />
          <div className="flex-1 bg-gray-50 p-6 overflow-auto">
            <p className="text-sm text-gray-500">Active: <span className="font-mono">{activeNav}</span></p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="File upload">
        <div className="space-y-4">
          <FileUpload hint="SVG, PNG, JPG up to 10MB" />
          <UploadedFileItem name="Annual report 2024.pdf" size={2_400_000} status="complete" onRemove={() => {}} />
          <UploadedFileItem name="Q4 financials.xlsx" size={1_800_000} progress={67} status="uploading" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Empty state & loading">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl">
            <EmptyState
              icon={<Folder />}
              title="No projects yet"
              description="Get started by creating your first project. It only takes a minute."
              actions={<Button><FolderPlus />New project</Button>}
            />
          </div>
          <div className="border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}

export default function ApplicationPage() {
  return (
    <ToastProvider>
      <ApplicationContent />
    </ToastProvider>
  );
}
