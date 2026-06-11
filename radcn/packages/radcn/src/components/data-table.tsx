import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table.tsx'

// DataTable surfaces as Tailwind utilities (Issue 6, Experiment 46). Per-element
// (no parent/child cascade), no Button coupling. The radcn-table-* classes the
// rows/cells carry are now dead markers (Table migrated in Exp 20), so the row
// drops them and keys its selected/reorderable styling on the data attributes it
// already emits. The base rule was shared with the unused .radcn-data-table-recipe
// selector, which is split-kept bespoke in tokens.css. Comments here are ASCII.
const dataTableClass =
  'grid gap-4 max-w-[var(--radcn-data-table-width,46rem)] border border-[var(--radcn-data-table-border,var(--radcn-border))] rounded-md p-4 bg-[var(--radcn-data-table-bg,var(--radcn-background))] text-foreground [font-family:var(--radcn-font)]'
const dataTableToolbarClass = 'flex flex-wrap items-end justify-between gap-3'
const dataTableColumnControlsClass = 'flex flex-wrap items-center justify-end gap-2'
const dataTableFilterClass = 'grid gap-1.5 min-w-[min(100%,14rem)] text-sm font-medium'
const dataTableFilterLabelClass = 'text-foreground'
const dataTableContentClass = 'min-w-0'
const dataTableSortClass = 'inline-flex items-center gap-1.5 text-inherit no-underline hover:underline'
const dataTableSelectionSummaryClass = 'm-0 text-muted-foreground text-sm'
const dataTablePaginationClass = 'flex flex-wrap items-center justify-between gap-3'
const dataTableRowActionsClass = 'flex flex-wrap items-center gap-2'
const dataTableDetailClass = 'border border-border rounded-md p-3 bg-muted text-foreground'
const dataTableEmptyClass = 'h-24 text-center text-muted-foreground'
const dataTableRowStateClass =
  'data-[reorderable=true]:cursor-grab data-[state=selected]:bg-[color-mix(in_srgb,var(--radcn-primary)_8%,transparent)]'

export interface DataTableProps {
  caption?: RemixNode
  children?: RemixNode
  class?: string
  empty?: boolean
  rowCount?: number
  selectedCount?: number
  style?: string
}

export interface DataTablePartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface DataTableFilterProps extends DataTablePartProps {
  for?: string
  label?: RemixNode
}

export interface DataTableContentProps extends DataTablePartProps {
  caption?: RemixNode
  dense?: boolean
}

export interface DataTableHeaderCellProps extends DataTablePartProps {
  ariaSort?: 'ascending' | 'descending' | 'none' | 'other'
  href?: string
}

export interface DataTableRowProps extends DataTablePartProps {
  disabled?: boolean
  reorderable?: boolean
  selected?: boolean
}

export interface DataTableSelectionSummaryProps extends DataTablePartProps {
  rowCount?: number
  selectedCount?: number
}

export interface DataTablePaginationProps extends DataTablePartProps {
  page?: number
  pageCount?: number
}

export interface DataTableEmptyProps extends DataTablePartProps {
  colSpan?: number
}

export function DataTable(handle: Handle<DataTableProps>) {
  return () => {
    let {
      caption,
      children,
      class: className,
      empty,
      rowCount,
      selectedCount,
      style,
    } = handle.props

    return (
      <section
        class={classes(dataTableClass, className)}
        data-empty={empty ? 'true' : undefined}
        data-radcn-data-table
        data-row-count={rowCount === undefined ? undefined : String(rowCount)}
        data-selected-count={selectedCount === undefined ? undefined : String(selectedCount)}
        style={style}
      >
        {caption ? <p class="radcn-data-table-caption" data-radcn-data-table-caption>{caption}</p> : null}
        {children}
      </section>
    )
  }
}

export function DataTableToolbar(handle: Handle<DataTablePartProps>) {
  return () => dataTablePart('div', dataTableToolbarClass, 'data-radcn-data-table-toolbar', handle.props)
}

export function DataTableColumnControls(handle: Handle<DataTablePartProps>) {
  return () => dataTablePart('div', dataTableColumnControlsClass, 'data-radcn-data-table-column-controls', handle.props)
}

export function DataTableFilter(handle: Handle<DataTableFilterProps>) {
  return () => {
    let { children, class: className, for: htmlFor, label, style } = handle.props

    return (
      <label class={classes(dataTableFilterClass, className)} data-radcn-data-table-filter for={htmlFor} style={style}>
        {label ? <span class={dataTableFilterLabelClass} data-radcn-data-table-filter-label>{label}</span> : null}
        {children}
      </label>
    )
  }
}

export function DataTableContent(handle: Handle<DataTableContentProps>) {
  return () => {
    let { caption, children, class: className, dense, style } = handle.props

    return (
      <div class={classes(dataTableContentClass, className)} data-radcn-data-table-content style={style}>
        <Table dense={dense}>
          {caption ? <TableCaption>{caption}</TableCaption> : null}
          {children}
        </Table>
      </div>
    )
  }
}

export function DataTableHeaderCell(handle: Handle<DataTableHeaderCellProps>) {
  return () => {
    let { ariaSort, children, class: className, href, style } = handle.props

    return (
      <TableHead ariaSort={ariaSort} class={classes('radcn-data-table-header-cell', className)} style={style}>
        {href ? (
          <a class={dataTableSortClass} data-radcn-data-table-sort href={href}>
            {children}
          </a>
        ) : children}
      </TableHead>
    )
  }
}

export function DataTableRow(handle: Handle<DataTableRowProps>) {
  return () => {
    let { children, class: className, disabled, reorderable, selected, style } = handle.props

    return (
      <tr
        aria-disabled={disabled ? 'true' : undefined}
        class={classes(dataTableRowStateClass, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-radcn-data-table-row
        data-radcn-table-row
        data-reorderable={reorderable ? 'true' : undefined}
        data-state={selected ? 'selected' : undefined}
        style={style}
      >
        {children}
      </tr>
    )
  }
}

export function DataTableSelectionSummary(handle: Handle<DataTableSelectionSummaryProps>) {
  return () => {
    let { children, class: className, rowCount, selectedCount, style } = handle.props
    let summary = children ?? `${selectedCount ?? 0} of ${rowCount ?? 0} row(s) selected.`

    return (
      <p
        class={classes(dataTableSelectionSummaryClass, className)}
        data-radcn-data-table-selection-summary
        data-row-count={rowCount === undefined ? undefined : String(rowCount)}
        data-selected-count={selectedCount === undefined ? undefined : String(selectedCount)}
        style={style}
      >
        {summary}
      </p>
    )
  }
}

export function DataTablePagination(handle: Handle<DataTablePaginationProps>) {
  return () => {
    let { children, class: className, page, pageCount, style } = handle.props

    return (
      <div
        class={classes(dataTablePaginationClass, className)}
        data-page={page === undefined ? undefined : String(page)}
        data-page-count={pageCount === undefined ? undefined : String(pageCount)}
        data-radcn-data-table-pagination
        style={style}
      >
        {children}
      </div>
    )
  }
}

export function DataTableRowActions(handle: Handle<DataTablePartProps>) {
  return () => dataTablePart('div', dataTableRowActionsClass, 'data-radcn-data-table-row-actions', handle.props)
}

export function DataTableDetail(handle: Handle<DataTablePartProps>) {
  return () => dataTablePart('aside', dataTableDetailClass, 'data-radcn-data-table-detail', handle.props)
}

export function DataTableEmpty(handle: Handle<DataTableEmptyProps>) {
  return () => {
    let { children = 'No results.', class: className, colSpan = 1, style } = handle.props

    return (
      <tr class="radcn-table-row radcn-data-table-empty-row" data-radcn-data-table-empty-row data-radcn-table-row>
        <td class={classes(dataTableEmptyClass, className)} colspan={colSpan} data-radcn-data-table-empty data-radcn-table-cell style={style}>
          {children}
        </td>
      </tr>
    )
  }
}

function dataTablePart(
  tag: 'aside' | 'div',
  className: string,
  dataAttribute: string,
  props: DataTablePartProps,
) {
  let { children, class: extraClass, style } = props
  let attrs = { [dataAttribute]: true }

  return tag === 'aside' ? (
    <aside class={classes(className, extraClass)} {...attrs} style={style}>{children}</aside>
  ) : (
    <div class={classes(className, extraClass)} {...attrs} style={style}>{children}</div>
  )
}

export {
  TableBody as DataTableBody,
  TableCaption as DataTableCaption,
  TableCell as DataTableCell,
  TableHeader as DataTableHeader,
}
