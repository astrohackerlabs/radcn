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
