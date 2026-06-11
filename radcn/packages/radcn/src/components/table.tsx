import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

// Tailwind utility classes copied verbatim from shadcn/ui v4
// (registry/new-york-v4/ui/table.tsx). See Issue 6, Experiment 20.
const tableContainerClass = 'relative w-full overflow-x-auto'
const tableClass = 'w-full caption-bottom text-sm'
const tableHeaderClass = '[&_tr]:border-b'
const tableBodyClass = '[&_tr:last-child]:border-0'
const tableFooterClass = 'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0'
const tableRowClass = 'border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted'
const tableHeadClass =
  'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
const tableCellClass = 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
const tableCaptionClass = 'mt-4 text-sm text-muted-foreground'

export interface TableProps {
  children?: RemixNode
  class?: string
  dense?: boolean
  style?: string
}

export interface TablePartProps {
  children?: RemixNode
  class?: string
  style?: string
}

export interface TableCellProps extends TablePartProps {
  colSpan?: number
}

export interface TableHeadProps extends TablePartProps {
  ariaSort?: 'ascending' | 'descending' | 'none' | 'other'
}

export function Table(handle: Handle<TableProps>) {
  return () => {
    // `dense` is retained for API compatibility and as the `data-dense` hook,
    // but no longer adds a class or changes padding: shadcn has no dense table
    // variant and its cells are uniformly p-2 (Issue 6, Experiment 20).
    let { children, class: className, dense, style } = handle.props

    return (
      <div class={tableContainerClass} data-radcn-table-container>
        <table class={classes(tableClass, className)} data-radcn-table data-dense={dense ? 'true' : undefined} style={style}>
          {children}
        </table>
      </div>
    )
  }
}

export function TableHeader(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <thead class={classes(tableHeaderClass, className)} data-radcn-table-header style={style}>{children}</thead>
  }
}

export function TableBody(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tbody class={classes(tableBodyClass, className)} data-radcn-table-body style={style}>{children}</tbody>
  }
}

export function TableFooter(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tfoot class={classes(tableFooterClass, className)} data-radcn-table-footer style={style}>{children}</tfoot>
  }
}

export function TableRow(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tr class={classes(tableRowClass, className)} data-radcn-table-row style={style}>{children}</tr>
  }
}

export function TableHead(handle: Handle<TableHeadProps>) {
  return () => {
    let { ariaSort, children, class: className, style } = handle.props

    return <th aria-sort={ariaSort} class={classes(tableHeadClass, className)} data-radcn-table-head scope="col" style={style}>{children}</th>
  }
}

export function TableCell(handle: Handle<TableCellProps>) {
  return () => {
    let { children, class: className, colSpan, style } = handle.props

    return <td class={classes(tableCellClass, className)} colspan={colSpan} data-radcn-table-cell style={style}>{children}</td>
  }
}

export function TableCaption(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <caption class={classes(tableCaptionClass, className)} data-radcn-table-caption style={style}>{children}</caption>
  }
}
