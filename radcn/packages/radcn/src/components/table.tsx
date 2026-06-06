import type { Handle, RemixNode } from 'remix/ui'

import { classes } from '../utils/classes.ts'

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
    let { children, class: className, dense, style } = handle.props

    return (
      <div class="radcn-table-container" data-radcn-table-container>
        <table class={classes('radcn-table', dense ? 'radcn-table--dense' : undefined, className)} data-radcn-table data-dense={dense ? 'true' : undefined} style={style}>
          {children}
        </table>
      </div>
    )
  }
}

export function TableHeader(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <thead class={classes('radcn-table-header', className)} data-radcn-table-header style={style}>{children}</thead>
  }
}

export function TableBody(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tbody class={classes('radcn-table-body', className)} data-radcn-table-body style={style}>{children}</tbody>
  }
}

export function TableFooter(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tfoot class={classes('radcn-table-footer', className)} data-radcn-table-footer style={style}>{children}</tfoot>
  }
}

export function TableRow(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <tr class={classes('radcn-table-row', className)} data-radcn-table-row style={style}>{children}</tr>
  }
}

export function TableHead(handle: Handle<TableHeadProps>) {
  return () => {
    let { ariaSort, children, class: className, style } = handle.props

    return <th aria-sort={ariaSort} class={classes('radcn-table-head', className)} data-radcn-table-head scope="col" style={style}>{children}</th>
  }
}

export function TableCell(handle: Handle<TableCellProps>) {
  return () => {
    let { children, class: className, colSpan, style } = handle.props

    return <td class={classes('radcn-table-cell', className)} colspan={colSpan} data-radcn-table-cell style={style}>{children}</td>
  }
}

export function TableCaption(handle: Handle<TablePartProps>) {
  return () => {
    let { children, class: className, style } = handle.props

    return <caption class={classes('radcn-table-caption', className)} data-radcn-table-caption style={style}>{children}</caption>
  }
}
