'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { DataTable, type ColumnDef, type RowAction } from '@/components/data/data-table';
import { StatusBadge } from '@/components/data/status-badge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUsers } from '@/lib/mock-data';
import type { User } from '@/lib/types';

const ROLE_LABELS: Record<User['role'], string> = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
};

const COLUMNS: ColumnDef<User>[] = [
  {
    key: 'name',
    header: 'User',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
          <p className="truncate text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => (
      <Badge variant="outline" className="capitalize text-xs font-normal">
        {ROLE_LABELS[row.role]}
      </Badge>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'createdAt',
    header: 'Joined',
    sortable: true,
    className: 'hidden md:table-cell',
    render: (row) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    ),
  },
];

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(() => getUsers());
  const [addOpen, setAddOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<User | null>(null);
  const [deleteUser, setDeleteUser] = React.useState<User | null>(null);

  /* ── Add ─────────────────────────────────────────────────────── */
  const [addForm, setAddForm] = React.useState({ name: '', email: '', role: 'viewer' as User['role'] });

  function handleAdd() {
    setAddOpen(false);
    setAddForm({ name: '', email: '', role: 'viewer' });
    toast.info('Invitation sent', { description: `${addForm.email} was invited to join.` });
  }

  /* ── Edit ────────────────────────────────────────────────────── */
  function handleEditSave() {
    setEditUser(null);
    toast.info('User updated', { description: `${editUser?.name}'s details were saved.` });
  }

  /* ── Delete ──────────────────────────────────────────────────── */
  function handleDelete() {
    if (!deleteUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    toast.success('User removed', { description: `${deleteUser.name} has been deleted.` });
    setDeleteUser(null);
  }

  const rowActions: RowAction<User>[] = [
    { label: 'View', onClick: (row) => toast.info(`Viewing ${row.name}`) },
    { label: 'Edit', onClick: (row) => setEditUser(row) },
    { label: 'Delete', onClick: (row) => setDeleteUser(row), variant: 'destructive' },
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Users"
          description={`${users.length} members in your workspace.`}
        >
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Add user
          </Button>
        </PageHeader>

        <DataTable<User>
          columns={COLUMNS}
          data={users}
          rowActions={rowActions}
          searchKeys={['name', 'email']}
          searchPlaceholder="Search by name or email…"
          pageSize={10}
        />
      </div>

      {/* ── Add user dialog ────────────────────────────────────── */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
            <DialogDescription>
              Send an invitation to a new team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="add-name">Full name</Label>
              <Input
                id="add-name"
                placeholder="Jane Doe"
                value={addForm.name}
                onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                placeholder="jane@example.com"
                value={addForm.email}
                onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-role">Role</Label>
              <Select
                value={addForm.role}
                onValueChange={(v) => setAddForm((f) => ({ ...f, role: v as User['role'] }))}
              >
                <SelectTrigger id="add-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!addForm.email}>
              Send invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit user dialog ───────────────────────────────────── */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>Update {editUser?.name}&apos;s details.</DialogDescription>
          </DialogHeader>
          {editUser && (
            <div className="grid gap-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-name">Full name</Label>
                <Input
                  id="edit-name"
                  defaultValue={editUser.name}
                  onChange={(e) => setEditUser((u) => u && { ...u, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={editUser.email}
                  onChange={(e) => setEditUser((u) => u && { ...u, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  defaultValue={editUser.role}
                  onValueChange={(v) =>
                    setEditUser((u) => u && { ...u, role: v as User['role'] })
                  }
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirmation ─────────────────────────────────── */}
      <AlertDialog open={!!deleteUser} onOpenChange={(o) => !o && setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteUser?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will lose access immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
