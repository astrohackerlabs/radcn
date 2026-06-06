import type { FixtureScenario } from '../../../scenarios/types.ts'
import type { RemixNode } from 'remix/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'radcn'
import {
  ChartBarSeries,
  type ChartConfig,
  type ChartSeries,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartLineSeries,
  ChartTooltip,
  ChartTooltipItem,
} from 'radcn'

const labels = ['Jan', 'Feb', 'Mar', 'Apr']
const values = [32, 48, 36, 56]
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const trafficSeries: ChartSeries[] = [
  { name: 'desktop', label: 'Desktop', values: [186, 305, 237, 73, 209, 214] },
  { name: 'mobile', label: 'Mobile', values: [80, 200, 120, 190, 130, 140] },
]
const trafficConfig: ChartConfig = {
  desktop: { color: '#2563eb', label: 'Desktop' },
  mobile: { color: '#60a5fa', label: 'Mobile' },
}

function chartExampleCard({
  children,
  description,
  title,
}: {
  children: RemixNode
  description: string
  title: string
}) {
  return (
    <Card class="radcn-chart-example-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>January - June 2024</CardFooter>
    </Card>
  )
}

function TrafficChart({
  ariaLabel,
  showGrid = false,
  showXAxis = false,
}: {
  ariaLabel: string
  showGrid?: boolean
  showXAxis?: boolean
}) {
  return (
    <ChartContainer ariaLabel={ariaLabel} config={trafficConfig} title={ariaLabel}>
      <ChartBarSeries
        labels={monthLabels}
        name="desktop"
        series={trafficSeries}
        showGrid={showGrid}
        showXAxis={showXAxis}
        values={[]}
      />
    </ChartContainer>
  )
}

export function renderChartFixture(fixture: FixtureScenario) {
  if (fixture.id === 'bar-demo') {
    return chartExampleCard({
      title: 'Bar Chart Demo',
      description: 'Two device series share one responsive SVG chart.',
      children: TrafficChart({ ariaLabel: 'Device traffic chart' }),
    })
  }

  if (fixture.id === 'bar-demo-grid') {
    return chartExampleCard({
      title: 'Bar Chart Grid',
      description: 'Horizontal grid lines clarify the grouped bar scale.',
      children: TrafficChart({ ariaLabel: 'Device traffic chart with grid', showGrid: true }),
    })
  }

  if (fixture.id === 'bar-demo-axis') {
    return chartExampleCard({
      title: 'Bar Chart Axis',
      description: 'Month ticks label the grouped bar chart.',
      children: TrafficChart({ ariaLabel: 'Device traffic chart with axis', showGrid: true, showXAxis: true }),
    })
  }

  if (fixture.id === 'bar-demo-legend') {
    return chartExampleCard({
      title: 'Bar Chart Legend',
      description: 'Legend and tooltip rows use the same chart color configuration.',
      children: (
        <ChartContainer ariaLabel="Device traffic chart with legend" config={trafficConfig} title="Device traffic">
          <ChartBarSeries labels={monthLabels} name="desktop" series={trafficSeries} showGrid showXAxis values={[]} />
          <ChartTooltip label="June">
            <ChartTooltipItem color="#2563eb" indicator="dot" label="Desktop" name="desktop" value={214} />
            <ChartTooltipItem color="#60a5fa" indicator="dot" label="Mobile" name="mobile" value={140} />
          </ChartTooltip>
          <ChartLegend>
            <ChartLegendItem color="#2563eb" name="desktop">Desktop</ChartLegendItem>
            <ChartLegendItem color="#60a5fa" name="mobile">Mobile</ChartLegendItem>
          </ChartLegend>
        </ChartContainer>
      ),
    })
  }

  if (fixture.id === 'bar-demo-tooltip') {
    return chartExampleCard({
      title: 'Bar Chart Tooltip',
      description: 'Tooltip content is explicit markup rather than a Recharts payload.',
      children: (
        <ChartContainer ariaLabel="Device traffic chart with tooltip" config={trafficConfig} title="Device traffic">
          <ChartBarSeries labels={monthLabels} name="desktop" series={trafficSeries} showGrid showXAxis values={[]} />
          <ChartTooltip label="June">
            <ChartTooltipItem color="#2563eb" indicator="line" label="Desktop" name="desktop" value="214 visitors" />
            <ChartTooltipItem color="#60a5fa" indicator="line" label="Mobile" name="mobile" value="140 visitors" />
          </ChartTooltip>
        </ChartContainer>
      ),
    })
  }

  if (fixture.id === 'tooltip-demo') {
    return (
      <div class="radcn-chart-tooltip-demo" data-radcn-chart-tooltip-demo>
        <ChartTooltip label="Page Views">
          <ChartTooltipItem color="#2563eb" indicator="dot" label="Desktop" name="desktop" value="12,486" />
          <ChartTooltipItem color="#60a5fa" indicator="dot" label="Mobile" name="mobile" value="8,420" />
        </ChartTooltip>
        <ChartTooltip hideLabel label="Browser">
          <ChartTooltipItem color="#22c55e" indicator="dashed" label="Chrome" name="chrome" value="1,286" />
          <ChartTooltipItem color="#f59e0b" indicator="dashed" label="Firefox" name="firefox" value="1,000" />
        </ChartTooltip>
        <ChartTooltip label="Single metric">
          <ChartTooltipItem color="#7c3aed" indicator="line" label="Desktop" name="desktop" value="12,486" />
        </ChartTooltip>
        <ChartTooltip hideLabel label="Hidden indicator">
          <ChartTooltipItem hideIndicator label="Chrome" name="chrome" value="1,286" />
        </ChartTooltip>
      </div>
    )
  }

  if (fixture.id === 'line') {
    return (
      <ChartContainer ariaLabel="Revenue trend" description="Revenue increased from January to April." title="Revenue">
        <ChartLineSeries color="#2563eb" labels={labels} name="revenue" values={[18, 28, 24, 44]} />
      </ChartContainer>
    )
  }

  if (fixture.id === 'legend') {
    return (
      <ChartContainer ariaLabel="Traffic by channel" description="Organic traffic leads paid traffic." title="Traffic">
        <ChartBarSeries color="#18181b" labels={labels} name="organic" values={values} />
        <ChartLegend>
          <ChartLegendItem color="#18181b" name="Organic">Organic</ChartLegendItem>
          <ChartLegendItem color="#2563eb" name="Paid">Paid</ChartLegendItem>
        </ChartLegend>
      </ChartContainer>
    )
  }

  if (fixture.id === 'tooltip') {
    return (
      <ChartContainer ariaLabel="Deployments chart" description="Deployments by month." title="Deployments">
        <ChartBarSeries color="#0f766e" labels={labels} name="deployments" values={values} />
        <ChartTooltip label="April">
          <ChartTooltipItem color="#0f766e" label="Deployments" value={56} />
          <ChartTooltipItem color="#2563eb" label="Incidents" value={2} />
        </ChartTooltip>
      </ChartContainer>
    )
  }

  if (fixture.id === 'accessibility') {
    return (
      <ChartContainer
        ariaDescribedBy="candidate-chart-accessibility-description"
        ariaLabel="Accessible signups chart"
        description="Signups increased every month in the sample."
        title="Signups"
      >
        <p id="candidate-chart-accessibility-description" style="margin:0;color:var(--radcn-muted-foreground);font-size:13px">
          Bar chart with values 12, 24, 30, and 42.
        </p>
        <ChartBarSeries labels={labels} name="signups" values={[12, 24, 30, 42]} />
      </ChartContainer>
    )
  }

  if (fixture.id === 'custom-token') {
    return (
      <ChartContainer class="radcn-fixture-custom-chart" ariaLabel="Custom chart" description="Custom token chart." title="Custom">
        <ChartBarSeries labels={labels} name="custom" values={values} />
        <ChartTooltip label="April">
          <ChartTooltipItem label="Custom" value={56} />
        </ChartTooltip>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer ariaLabel="Monthly visitors" description="Visitors by month." title="Visitors">
      <ChartBarSeries color="#18181b" labels={labels} name="visitors" values={values} />
    </ChartContainer>
  )
}
