'use client';

import * as React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CircleAlert as AlertCircle, Bell, Check, ChevronDown, Info, Loader as Loader2, Mail, MoveHorizontal as MoreHorizontal, Settings, Trash2, User } from 'lucide-react';
import { AreaChartWidget } from '@/components/charts/area-chart-widget';
import { BarChartWidget } from '@/components/charts/bar-chart-widget';
import { LineChartWidget } from '@/components/charts/line-chart-widget';
import { ChartCard } from '@/components/charts/chart-card';
import { StatusBadge } from '@/components/data/status-badge';

import { ThemeToggle } from '@/components/theme-toggle';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/* ─── Section wrapper ──────────────────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <div className="mt-1 h-px w-full bg-border" />
      </div>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </section>
  );
}

/* ─── Sample table data ────────────────────────────────────────────────────── */
const TABLE_ROWS = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Markus', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 3, name: 'Carol Smith', email: 'carol@example.com', role: 'Viewer', status: 'Active' },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function UIKitPage() {
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [switched, setSwitched] = React.useState(false);

  function simulateLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Admin Starter
              </span>
              <Badge variant="secondary">UI Kit</Badge>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Component Showcase</h1>
            <p className="mt-2 text-muted-foreground">
              Every primitive in one place. Toggle the theme to verify light/dark parity.
            </p>
          </div>

          {/* ── Buttons ──────────────────────────────────────────────────── */}
          <Section title="Button">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button onClick={simulateLoading} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading…
                </>
              ) : (
                'Click to load'
              )}
            </Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="outline">
              <Bell />
            </Button>
          </Section>

          {/* ── Badge ────────────────────────────────────────────────────── */}
          <Section title="Badge">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </Section>

          {/* ── Avatar ───────────────────────────────────────────────────── */}
          <Section title="Avatar">
            <Avatar>
              <AvatarImage
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80"
                alt="User avatar"
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">BM</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80"
                alt="User avatar"
              />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
          </Section>

          {/* ── Inputs ───────────────────────────────────────────────────── */}
          <Section title="Input / Textarea / Label">
            <div className="flex w-full max-w-sm flex-col gap-1.5">
              <Label htmlFor="demo-email">Email address</Label>
              <Input id="demo-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex w-full max-w-sm flex-col gap-1.5">
              <Label htmlFor="demo-disabled">Disabled input</Label>
              <Input id="demo-disabled" disabled placeholder="Cannot edit this" />
            </div>
            <div className="flex w-full max-w-sm flex-col gap-1.5">
              <Label htmlFor="demo-textarea">Message</Label>
              <Textarea id="demo-textarea" placeholder="Write something…" rows={3} />
            </div>
          </Section>

          {/* ── Select ───────────────────────────────────────────────────── */}
          <Section title="Select">
            <div className="w-48">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pick a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Section>

          {/* ── Checkbox & Switch ────────────────────────────────────────── */}
          <Section title="Checkbox / Switch">
            <div className="flex items-center gap-2">
              <Checkbox
                id="chk1"
                checked={checked}
                onCheckedChange={(v) => setChecked(v === true)}
              />
              <Label htmlFor="chk1">Accept terms</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chk2" defaultChecked />
              <Label htmlFor="chk2">Pre-checked</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="chk3" disabled />
              <Label htmlFor="chk3" className="opacity-50">
                Disabled
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="sw1"
                checked={switched}
                onCheckedChange={setSwitched}
              />
              <Label htmlFor="sw1">{switched ? 'On' : 'Off'}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw2" defaultChecked />
              <Label htmlFor="sw2">Notifications</Label>
            </div>
          </Section>

          {/* ── Separator ────────────────────────────────────────────────── */}
          <Section title="Separator">
            <div className="w-full max-w-xs">
              <p className="text-sm text-muted-foreground">Above</p>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">Below</p>
            </div>
            <div className="flex h-8 items-center gap-3 text-sm text-muted-foreground">
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Right</span>
            </div>
          </Section>

          {/* ── Skeleton ─────────────────────────────────────────────────── */}
          <Section title="Skeleton">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </Section>

          {/* ── Alert ────────────────────────────────────────────────────── */}
          <Section title="Alert">
            <div className="w-full space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                  This is a default informational alert message.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again later.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* ── Card ─────────────────────────────────────────────────────── */}
          <Section title="Card">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
                <CardDescription>Your current usage at a glance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>5 active projects</p>
                <p>12 team members</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">View details</Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-64">
              <CardHeader>
                <CardTitle className="text-base">Minimal card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A card without a footer for concise info display.
                </p>
              </CardContent>
            </Card>
          </Section>

          {/* ── Tabs ─────────────────────────────────────────────────────── */}
          <Section title="Tabs">
            <div className="w-full max-w-md">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardContent className="pt-4 text-sm text-muted-foreground">
                      Summary metrics appear here in Stage 3+.
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card>
                    <CardContent className="pt-4 text-sm text-muted-foreground">
                      Charts and data tables arrive in a later stage.
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardContent className="pt-4 text-sm text-muted-foreground">
                      Preferences and configuration panel.
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </Section>

          {/* ── Table ────────────────────────────────────────────────────── */}
          <Section title="Table">
            <div className="w-full rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TABLE_ROWS.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">{row.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={row.status === 'Active' ? 'default' : 'secondary'}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          {/* ── Tooltip ──────────────────────────────────────────────────── */}
          <Section title="Tooltip">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More information</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
          </Section>

          {/* ── Popover ──────────────────────────────────────────────────── */}
          <Section title="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Open popover
                  <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </Section>

          {/* ── Dropdown Menu ────────────────────────────────────────────── */}
          <Section title="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Options
                  <MoreHorizontal className="ml-2 h-4 w-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          {/* ── Dialog ───────────────────────────────────────────────────── */}
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Update your account details below and click Save.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="dlg-name">Full name</Label>
                    <Input id="dlg-name" defaultValue="Alice Chen" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="dlg-email">Email</Label>
                    <Input id="dlg-email" defaultValue="alice@example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          {/* ── Alert Dialog ─────────────────────────────────────────────── */}
          <Section title="Alert Dialog">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account and all data will be
                    permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>

          {/* ── Sheet ────────────────────────────────────────────────────── */}
          <Section title="Sheet">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open right sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit settings</SheetTitle>
                  <SheetDescription>
                    Adjust your preferences here. Changes save automatically.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="sh-name">Display name</Label>
                    <Input id="sh-name" placeholder="Your name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="sh-notif" />
                    <Label htmlFor="sh-notif">Email notifications</Label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open left sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Mobile nav panel preview.</SheetDescription>
                </SheetHeader>
                <nav className="mt-6 space-y-1">
                  {['Dashboard', 'Users', 'Settings', 'Help'].map((item) => (
                    <button
                      key={item}
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </Section>

          {/* ── StatusBadge ──────────────────────────────────────────────── */}
          <Section title="StatusBadge">
            <StatusBadge status="active" />
            <StatusBadge status="invited" />
            <StatusBadge status="inactive" />
            <StatusBadge status="suspended" />
            <StatusBadge status="pending" />
            <StatusBadge status="success" />
            <StatusBadge status="error" />
          </Section>

          {/* ── Charts ───────────────────────────────────────────────────── */}
          <Section title="Area Chart">
            <div className="w-full">
              <ChartCard title="Revenue vs. Target" description="Last 6 months">
                <AreaChartWidget
                  data={[
                    { month: 'Dec', revenue: 52300, target: 45000 },
                    { month: 'Jan', revenue: 44100, target: 46000 },
                    { month: 'Feb', revenue: 48700, target: 48000 },
                    { month: 'Mar', revenue: 53900, target: 50000 },
                    { month: 'Apr', revenue: 57200, target: 53000 },
                    { month: 'May', revenue: 61400, target: 58000 },
                  ]}
                  xKey="month"
                  series={[
                    { key: 'revenue', color: '#2563eb', label: 'Revenue' },
                    { key: 'target', color: '#64748b', label: 'Target' },
                  ]}
                  valuePrefix="$"
                  height={180}
                />
              </ChartCard>
            </div>
          </Section>

          <Section title="Bar Chart">
            <div className="w-full max-w-sm">
              <ChartCard title="Traffic by Source">
                <BarChartWidget
                  data={[
                    { source: 'Organic', visitors: 14320 },
                    { source: 'Direct', visitors: 9870 },
                    { source: 'Referral', visitors: 6540 },
                    { source: 'Social', visitors: 4210 },
                    { source: 'Email', visitors: 2980 },
                  ]}
                  xKey="source"
                  series={[{ key: 'visitors', color: '#0ea5e9', label: 'Visitors' }]}
                  height={180}
                />
              </ChartCard>
            </div>
          </Section>

          <Section title="Line Chart">
            <div className="w-full">
              <ChartCard title="Daily Orders" description="Last 14 days">
                <LineChartWidget
                  data={Array.from({ length: 14 }, (_, i) => {
                    const d = new Date(2026, 4, i + 6);
                    return {
                      day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      orders: 42 + i * 7 + Math.round(Math.sin(i) * 8),
                    };
                  })}
                  xKey="day"
                  series={[{ key: 'orders', color: '#10b981', label: 'Orders' }]}
                  height={180}
                  tickInterval={2}
                />
              </ChartCard>
            </div>
          </Section>

          {/* ── Toast ────────────────────────────────────────────────────── */}
          <Section title="Toast (Sonner)">
            <Button
              variant="default"
              onClick={() =>
                toast.success('Changes saved', {
                  description: 'Your profile has been updated.',
                })
              }
            >
              <Check className="mr-1 h-4 w-4" />
              Success toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast.error('Save failed', {
                  description: 'Network error — please try again.',
                })
              }
            >
              <AlertCircle className="mr-1 h-4 w-4" />
              Error toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.info('Heads up', {
                  description: 'A new version is available.',
                })
              }
            >
              <Info className="mr-1 h-4 w-4" />
              Info toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast('Email sent', {
                  icon: <Mail className="h-4 w-4" />,
                  description: 'Your message was delivered.',
                })
              }
            >
              <Mail className="mr-1 h-4 w-4" />
              Custom toast
            </Button>
          </Section>
        </main>

        <footer className="mt-12 border-t border-border">
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
            <span className="font-mono text-xs text-muted-foreground">
              Admin Starter — component reference
            </span>
            <Link href="/" className="text-xs text-primary hover:underline">
              ← Back to dashboard
            </Link>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
