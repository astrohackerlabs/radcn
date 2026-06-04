import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Toaster, type ToastPayload } from 'radcn'

const duration = 0

function payload(type: ToastPayload['type'], title: string, description: string): ToastPayload {
  return { description, duration, title, type }
}

export function renderSonnerFixture(fixture: FixtureScenario) {
  if (fixture.id === 'success') {
    return <Toaster defaultDuration={duration} toasts={[payload('success', 'Project published', 'The latest RadCN preview is live.')]} />
  }

  if (fixture.id === 'error') {
    return <Toaster defaultDuration={duration} toasts={[payload('error', 'Build failed', 'Fix the notification fixture before shipping.')]} />
  }

  if (fixture.id === 'loading') {
    return <Toaster defaultDuration={duration} toasts={[payload('loading', 'Syncing changes', 'This notification stays open until work completes.')]} />
  }

  if (fixture.id === 'action') {
    return <Toaster defaultDuration={duration} toasts={[{ actionLabel: 'Undo', actionUrl: '/fixtures/sonner/action?undo=1', description: 'The page can offer one focused follow-up.', duration, title: 'Item archived', type: 'default' }]} />
  }

  if (fixture.id === 'dismiss') {
    return <Toaster defaultDuration={duration} toasts={[{ description: 'Use the close button or Escape while focused.', duration, title: 'Dismiss me', type: 'info' }]} />
  }

  if (fixture.id === 'stack') {
    return (
      <Toaster
        defaultDuration={duration}
        toasts={[
          payload('success', 'Saved', 'Settings were stored.'),
          payload('info', 'Review queued', 'A teammate was notified.'),
          payload('warning', 'Deploy paused', 'Manual approval is required.'),
        ]}
      />
    )
  }

  if (fixture.id === 'custom-token') {
    return <Toaster class="radcn-fixture-custom-toaster" defaultDuration={duration} toasts={[payload('success', 'Custom tokens', 'Notification colors come from public variables.')]} />
  }

  return <Toaster defaultDuration={duration} toasts={[payload('default', 'Notification ready', 'RadCN renders initial toasts without Sonner.')]} />
}
