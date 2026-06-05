import type { RemixNode } from 'remix/ui'
import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Badge,
  Button,
  Checkbox,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumnControls,
  DataTableContent,
  DataTableDetail,
  DataTableEmpty,
  DataTableFilter,
  DataTableHeader,
  DataTableHeaderCell,
  DataTablePagination,
  DataTableRow,
  DataTableRowActions,
  DataTableSelectionSummary,
  DataTableToolbar,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'radcn'

const rows = [
  { id: 'radcn-101', owner: 'Ada', status: 'Done', task: 'Port chart' },
  { id: 'radcn-102', owner: 'Grace', status: 'Review', task: 'Document block' },
  { id: 'radcn-103', owner: 'Katherine', status: 'Todo', task: 'Verify recipe' },
]

function DataTableShell({ children, custom = false }: { children: RemixNode; custom?: boolean }) {
  return (
    <DataTable
      caption="Dashboard tasks"
      class={custom ? 'radcn-fixture-custom-data-table' : undefined}
      rowCount={rows.length}
      selectedCount={1}
    >
      {children}
    </DataTable>
  )
}

function TaskTable({ empty = false, selected = false, sort = false }: { empty?: boolean; selected?: boolean; sort?: boolean }) {
  return (
    <DataTableContent caption="Dashboard tasks recipe block." dense>
      <DataTableHeader>
        <DataTableRow>
          <DataTableHeaderCell>Select</DataTableHeaderCell>
          <DataTableHeaderCell ariaSort={sort ? 'ascending' : undefined} href={sort ? '/fixtures/data-table/sort-filter?sort=task' : undefined}>
            {sort ? 'Task ↑' : 'Task'}
          </DataTableHeaderCell>
          <DataTableHeaderCell>Status</DataTableHeaderCell>
          <DataTableHeaderCell>Owner</DataTableHeaderCell>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {empty ? <DataTableEmpty colSpan={4}>No tasks match this filter.</DataTableEmpty> : rows.map((row, index) => (
          <DataTableRow reorderable={index === 0} selected={selected && index === 0}>
            <DataTableCell>
              <Checkbox checked={selected && index === 0} name="rows" value={row.id} />
            </DataTableCell>
            <DataTableCell>{row.task}</DataTableCell>
            <DataTableCell><Badge variant={row.status === 'Done' ? 'secondary' : 'outline'}>{row.status}</Badge></DataTableCell>
            <DataTableCell>{row.owner}</DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTableContent>
  )
}

export function renderDataTableFixture(fixture: FixtureScenario) {
  if (fixture.id === 'sort-filter') {
    return DataTableShell({
      children: (
        <>
          <form action="/fixtures/data-table/sort-filter" method="get">
            <DataTableToolbar>
              <DataTableFilter label="Filter tasks">
                <Input name="q" value="port" />
              </DataTableFilter>
              <Button name="intent" type="submit" value="filter">Apply</Button>
            </DataTableToolbar>
          </form>
          {TaskTable({ sort: true })}
        </>
      ),
    })
  }

  if (fixture.id === 'empty') {
    return DataTableShell({
      children: (
        <>
          <DataTableToolbar>
            <DataTableFilter label="Filter tasks">
              <Input name="q" value="missing" />
            </DataTableFilter>
            <Button name="intent" type="submit" value="filter">Apply</Button>
          </DataTableToolbar>
          {TaskTable({ empty: true })}
        </>
      ),
    })
  }

  if (fixture.id === 'row-editing') {
    return DataTableShell({
      children: (
        <>
          {TaskTable({ selected: true })}
          <DataTableDetail>
            <form style="display:grid;gap:10px">
              <label style="display:grid;gap:6px">
                <span>Task</span>
                <Input name="task" value="Port chart" />
              </label>
              <label style="display:grid;gap:6px">
                <span>Status</span>
                <Select value="done">
                  <SelectTrigger ariaLabel="Task status"><SelectValue placeholder="Done">Done</SelectValue></SelectTrigger>
                  <SelectContent><SelectItem value="done">Done</SelectItem></SelectContent>
                </Select>
              </label>
              <Button type="submit">Save row</Button>
            </form>
          </DataTableDetail>
        </>
      ),
    })
  }

  if (fixture.id === 'column-controls') {
    return DataTableShell({
      children: (
        <>
          <DataTableToolbar>
            <strong>Dashboard tasks</strong>
            <DataTableColumnControls>
              <Button variant="outline">Columns</Button>
              <Button variant="outline">Add row</Button>
            </DataTableColumnControls>
          </DataTableToolbar>
          {TaskTable({})}
        </>
      ),
    })
  }

  if (fixture.id === 'dashboard-composition') {
    return DataTableShell({
      children: (
        <>
          <DataTableToolbar>
            <Select value="outline">
              <SelectTrigger ariaLabel="View"><SelectValue placeholder="Outline">Outline</SelectValue></SelectTrigger>
              <SelectContent>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
            <DataTableColumnControls>
              <Button variant="outline">Columns</Button>
              <Button variant="outline">Add section</Button>
            </DataTableColumnControls>
          </DataTableToolbar>
          {TaskTable({ selected: true })}
          <DataTablePagination page={1} pageCount={2}>
            <DataTableSelectionSummary rowCount={rows.length} selectedCount={1} />
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationLink href="/fixtures/data-table/dashboard-composition?page=1" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="/fixtures/data-table/dashboard-composition?page=2">2</PaginationLink></PaginationItem>
              </PaginationContent>
            </Pagination>
          </DataTablePagination>
        </>
      ),
    })
  }

  if (fixture.id === 'selection') {
    return DataTableShell({
      children: (
        <>
          <DataTableSelectionSummary>1 row selected</DataTableSelectionSummary>
          {TaskTable({ selected: true })}
        </>
      ),
    })
  }

  if (fixture.id === 'pagination') {
    return DataTableShell({
      children: (
        <>
          {TaskTable({})}
          <DataTablePagination page={1} pageCount={2}>
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationLink href="/fixtures/data-table/pagination?page=1" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="/fixtures/data-table/pagination?page=2">2</PaginationLink></PaginationItem>
              </PaginationContent>
            </Pagination>
          </DataTablePagination>
        </>
      ),
    })
  }

  if (fixture.id === 'row-actions') {
    return DataTableShell({
      children: (
        <>
          {TaskTable({})}
          <DataTableRowActions>
            <Button variant="outline">Open row</Button>
            <Button variant="ghost">Duplicate</Button>
          </DataTableRowActions>
        </>
      ),
    })
  }

  if (fixture.id === 'responsive-detail') {
    return DataTableShell({
      children: (
        <>
          {TaskTable({ selected: true })}
          <DataTableDetail>
            <strong>Port chart</strong>
            <p style="margin:6px 0 0;color:var(--radcn-muted-foreground)">Responsive detail panels are recipe code composed beside the table.</p>
          </DataTableDetail>
        </>
      ),
    })
  }

  if (fixture.id === 'custom-token') {
    return DataTableShell({ children: TaskTable({}), custom: true })
  }

  return DataTableShell({
    children: (
      <>
        <DataTableToolbar>
          <strong>Dashboard tasks</strong>
          <Select value="all">
            <SelectTrigger ariaLabel="Status filter"><SelectValue placeholder="All statuses">All statuses</SelectValue></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </DataTableToolbar>
        {TaskTable({})}
      </>
    ),
  })
}
