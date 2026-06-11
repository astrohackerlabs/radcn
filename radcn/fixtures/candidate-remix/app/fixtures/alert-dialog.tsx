import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radcn'

export function renderAlertDialogFixture(fixture: FixtureScenario) {
  let defaultOpen = fixture.id === 'default-open'
  let small = fixture.id === 'small'
  let custom = fixture.id === 'custom-token'

  if (fixture.id === 'demo') {
    return (
      <AlertDialog id="candidate-alert-dialog-demo">
        <AlertDialogTrigger class="radcn-button radcn-button--outline inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)] min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)] px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)] leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease] focus-visible:border-[var(--radcn-ring)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground">Show Dialog</AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    )
  }

  return (
    <AlertDialog defaultOpen={defaultOpen} id={`candidate-alert-dialog-${fixture.id}`}>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogPortal class={custom ? 'radcn-fixture-custom-alert-dialog' : undefined}>
        <AlertDialogOverlay />
        <AlertDialogContent class={custom ? 'radcn-fixture-custom-alert-dialog' : undefined} size={small ? 'sm' : 'default'}>
          <AlertDialogMedia>!</AlertDialogMedia>
          <AlertDialogHeader>
            <AlertDialogTitle>{custom ? 'Custom destructive action' : 'Delete project?'}</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The project and deployments will be removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Delete</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}
