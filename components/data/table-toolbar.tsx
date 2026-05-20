import * as React from 'react';
import { SearchInput } from './search-input';

interface TableToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  actions,
}: TableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="w-full max-w-xs"
      />
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
