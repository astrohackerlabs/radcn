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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

const payments = [
  { id: 'm5gr84i9', status: 'success', statusLabel: 'Success', email: 'ken99@example.com', amount: '$316.00', selected: true },
  { id: '3u1reuv4', status: 'success', statusLabel: 'Success', email: 'abe45@example.com', amount: '$242.00' },
  { id: 'derv1ws0', status: 'processing', statusLabel: 'Processing', email: 'monserrat44@example.com', amount: '$837.00' },
  { id: '5kma53ae', status: 'success', statusLabel: 'Success', email: 'silas22@example.com', amount: '$874.00' },
  { id: 'bhqecj4p', status: 'failed', statusLabel: 'Failed', email: 'carmella@example.com', amount: '$721.00' },
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

function PaymentDemoTable() {
  return (
    <DataTable
      caption="Payments"
      rowCount={payments.length}
      selectedCount={1}
      style="width:100%;max-width:none;"
    >
      <form action="/fixtures/data-table/demo" method="get">
        <DataTableToolbar>
          <DataTableFilter label="Filter emails">
            <Input name="email" placeholder="Filter emails..." />
          </DataTableFilter>
          <DataTableColumnControls>
            <DropdownMenu id="candidate-data-table-columns">
              <DropdownMenuTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">
                Columns <span aria-hidden="true" data-candidate-data-table-icon="chevron-down">v</span>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end" style="width:10rem">
                  <DropdownMenuCheckboxItem checked textValue="status">status</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked textValue="email">email</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked textValue="amount">amount</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </DataTableColumnControls>
        </DataTableToolbar>
      </form>
      <DataTableContent caption="Payments" class="overflow-hidden rounded-md border" dense style="overflow:hidden;border:1px solid var(--radcn-border);border-radius:var(--radcn-radius);">
        <DataTableHeader>
          <DataTableRow>
            <DataTableHeaderCell>
              <label style="display:inline-flex;align-items:center;">
                <Checkbox name="select-all" />
                <span class="radcn-sr-only">Select all</span>
              </label>
            </DataTableHeaderCell>
            <DataTableHeaderCell>Status</DataTableHeaderCell>
            <DataTableHeaderCell ariaSort="ascending" href="/fixtures/data-table/demo?sort=email">
              Email <span aria-hidden="true" data-candidate-data-table-icon="arrow-up-down">↕</span>
            </DataTableHeaderCell>
            <DataTableHeaderCell class="text-right" style="text-align:right;">Amount</DataTableHeaderCell>
            <DataTableHeaderCell class="text-right" style="text-align:right;">Actions</DataTableHeaderCell>
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          {payments.map((payment) => (
            <DataTableRow selected={payment.selected}>
              <DataTableCell>
                <label style="display:inline-flex;align-items:center;">
                  <Checkbox checked={payment.selected} name="rows" value={payment.id} />
                  <span class="radcn-sr-only">Select row</span>
                </label>
              </DataTableCell>
              <DataTableCell><span data-payment-status={payment.status}>{payment.statusLabel}</span></DataTableCell>
              <DataTableCell class="lowercase"><span class="lowercase" data-payment-id={payment.id}>{payment.email}</span></DataTableCell>
              <DataTableCell class="text-right font-medium" style="text-align:right;font-weight:500;">{payment.amount}</DataTableCell>
              <DataTableCell class="text-right" style="text-align:right;">
                <DataTableRowActions>
                  <DropdownMenu id={`candidate-data-table-row-${payment.id}`}>
                    <DropdownMenuTrigger ariaLabel="Open menu" class="radcn-button radcn-button--ghost radcn-button--icon-sm inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 bg-transparent text-foreground [--radcn-btn-w:2rem] [--radcn-btn-mh:2rem] [--radcn-btn-px:0] [--radcn-btn-py:0]" data-payment-id={payment.id}>
                      <span class="radcn-sr-only">Open menu</span>
                      <span aria-hidden="true" data-candidate-data-table-icon="more-horizontal">...</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuContent align="end" style="width:12rem">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem textValue="Copy payment ID"><span data-payment-copy-id={payment.id}>Copy payment ID</span></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem textValue="View customer">View customer</DropdownMenuItem>
                        <DropdownMenuItem textValue="View payment details">View payment details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
                  </DropdownMenu>
                </DataTableRowActions>
              </DataTableCell>
            </DataTableRow>
          ))}
          <DataTableEmpty colSpan={5}>No results.</DataTableEmpty>
        </DataTableBody>
      </DataTableContent>
      <DataTablePagination page={1} pageCount={2}>
        <DataTableSelectionSummary rowCount={payments.length} selectedCount={1}>1 of 5 row(s) selected.</DataTableSelectionSummary>
        <div style="display:flex;gap:0.5rem;">
          <Button disabled size="sm" variant="outline">Previous</Button>
          <Button size="sm" variant="outline">Next</Button>
        </div>
      </DataTablePagination>
      <DataTableDetail>
        <strong>Clipboard behavior</strong>
        <p style="margin:6px 0 0;color:var(--radcn-muted-foreground)">Copy payment ID stays app-owned browser behavior over visible payment id data.</p>
      </DataTableDetail>
    </DataTable>
  )
}

export function renderDataTableFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') {
    return PaymentDemoTable()
  }

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
