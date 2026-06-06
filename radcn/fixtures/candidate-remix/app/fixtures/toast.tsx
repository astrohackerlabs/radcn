import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Button, Toaster } from 'radcn'

const duration = 0

export function renderToastFixture(fixture: FixtureScenario) {
  if (fixture.id === 'demo') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Undo"
          data-toast-action-url="/fixtures/toast/demo?undo=1"
          data-toast-description="Friday, February 10, 2023 at 5:57 PM"
          data-toast-duration="0"
          data-toast-title="Scheduled: Catch up"
        >
          <Button>Add to calendar</Button>
        </span>
        <Toaster defaultDuration={duration} />
      </section>
    )
  }

  if (fixture.id === 'destructive') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Try again"
          data-toast-action-url="/fixtures/toast/destructive?retry=1"
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
          data-toast-type="error"
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster defaultDuration={duration} />
      </section>
    )
  }

  if (fixture.id === 'simple') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <span
          data-radcn-toast-trigger
          data-toast-description="Your message has been sent."
          data-toast-duration="0"
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster defaultDuration={duration} />
      </section>
    )
  }

  if (fixture.id === 'with-action') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <span
          data-radcn-toast-trigger
          data-toast-action-label="Try again"
          data-toast-action-url="/fixtures/toast/with-action?retry=1"
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster defaultDuration={duration} />
      </section>
    )
  }

  if (fixture.id === 'with-title') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <span
          data-radcn-toast-trigger
          data-toast-description="There was a problem with your request."
          data-toast-duration="0"
          data-toast-title="Uh oh! Something went wrong."
        >
          <Button variant="outline">Show Toast</Button>
        </span>
        <Toaster defaultDuration={duration} />
      </section>
    )
  }

  if (fixture.id === 'form-action') {
    return (
      <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
        <form action="/fixtures/toast/form-action" method="get" style="display:flex;gap:12px;align-items:center">
          <Button name="intent" type="submit" value="notify">Save changes</Button>
        </form>
        <Toaster
          defaultDuration={duration}
          toasts={[{
            description: 'A Remix route/action can render this notification as initial state.',
            duration,
            title: 'Changes saved',
            type: 'success',
          }]}
        />
      </section>
    )
  }

  if (fixture.id === 'no-js-initial') {
    return (
      <section data-radcn-toast-recipe>
        <Toaster
          defaultDuration={duration}
          toasts={[{
            description: 'This toast is present in server HTML before enhancement runs.',
            duration,
            title: 'Server notification',
            type: 'info',
          }]}
        />
      </section>
    )
  }

  if (fixture.id === 'empty-payload') {
    return (
      <section data-radcn-toast-recipe>
        <Toaster defaultDuration={duration} toasts={[{ duration }]} />
      </section>
    )
  }

  return (
    <section style="display:grid;gap:16px;max-width:420px" data-radcn-toast-recipe>
      <button
        class="radcn-button radcn-button--default radcn-button--default"
        data-toast-description="The RadCN toaster listens for browser events."
        data-toast-duration="0"
        data-toast-title="Event notification"
        data-toast-type="success"
        data-radcn-toast-trigger
        type="button"
      >
        Show toast
      </button>
      <Toaster defaultDuration={duration} />
    </section>
  )
}
