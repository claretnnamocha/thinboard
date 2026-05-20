'use client';

import * as React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/dashboard/empty-state';
import { TableToolbar } from './table-toolbar';
import { TablePagination } from './table-pagination';
import { FileSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortDir = 'asc' | 'desc';

export type ColumnDef<T> = {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type RowAction<T> = {
  label: string;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive';
};

interface DataTableProps<T extends { id: string }> {
  columns: ColumnDef<T>[];
  data: T[];
  rowActions?: RowAction<T>[];
  searchKeys?: (keyof T & string)[];
  searchPlaceholder?: string;
  pageSize?: number;
  toolbarActions?: React.ReactNode;
}

function sortData<T>(data: T[], key: keyof T, dir: SortDir): T[] {
  return [...data].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    const cmp = av < bv ? -1 : 1;
    return dir === 'asc' ? cmp : -cmp;
  });
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  rowActions,
  searchKeys = [],
  searchPlaceholder = 'Search…',
  pageSize = 10,
  toolbarActions,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState('');
  const [sortKey, setSortKey] = React.useState<keyof T & string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    if (!search.trim() || searchKeys.length === 0) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)),
    );
  }, [data, search, searchKeys]);

  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    return sortData(filtered, sortKey, sortDir);
  }, [filtered, sortKey, sortDir]);

  const pageCount = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: keyof T & string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  function SortIcon({ col }: { col: ColumnDef<T> }) {
    if (!col.sortable) return null;
    if (sortKey !== col.key)
      return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground/50" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-primary" />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TableToolbar
        search={search}
        onSearchChange={handleSearch}
        searchPlaceholder={searchPlaceholder}
        actions={toolbarActions}
      />

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    >
                      {col.header}
                      <SortIcon col={col} />
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {col.header}
                    </span>
                  )}
                </TableHead>
              ))}
              {rowActions && rowActions.length > 0 && (
                <TableHead className="w-12" />
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowActions ? 1 : 0)}
                  className="p-0"
                >
                  <EmptyState
                    icon={FileSearch}
                    title="No results found"
                    description={
                      search
                        ? `No matches for "${search}". Try a different search term.`
                        : 'No data to display.'
                    }
                    className="rounded-none border-0"
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={cn('py-3', col.className)}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </TableCell>
                  ))}
                  {rowActions && rowActions.length > 0 && (
                    <TableCell className="py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            aria-label="Row actions"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          {rowActions.map((action, i) => (
                            <React.Fragment key={action.label}>
                              {i > 0 && action.variant === 'destructive' && (
                                <DropdownMenuSeparator />
                              )}
                              <DropdownMenuItem
                                onClick={() => action.onClick(row)}
                                className={cn(
                                  action.variant === 'destructive' &&
                                    'text-destructive focus:text-destructive',
                                )}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            </React.Fragment>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        page={page}
        pageCount={pageCount}
        total={sorted.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
