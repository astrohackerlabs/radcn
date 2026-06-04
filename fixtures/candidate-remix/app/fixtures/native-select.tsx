import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Field, FieldDescription, FieldError, Label, NativeSelect, NativeSelectOptGroup, NativeSelectOption } from 'radcn'

function statusOptions(selected = 'todo') {
  return (
    <>
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption selected={selected === 'todo'} value="todo">Todo</NativeSelectOption>
      <NativeSelectOption selected={selected === 'in-progress'} value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption selected={selected === 'done'} value="done">Done</NativeSelectOption>
      <NativeSelectOption selected={selected === 'cancelled'} value="cancelled">Cancelled</NativeSelectOption>
    </>
  )
}

export function renderNativeSelectFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'groups':
      return (
        <Field>
          <Label for="candidate-department">Department</Label>
          <NativeSelect id="candidate-department" name="department">
            <NativeSelectOption value="">Select department</NativeSelectOption>
            <NativeSelectOptGroup label="Engineering">
              <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
              <NativeSelectOption value="backend">Backend</NativeSelectOption>
              <NativeSelectOption value="devops">DevOps</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Sales">
              <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
              <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </Field>
      )
    case 'disabled':
      return (
        <Field>
          <Label disabled for="candidate-priority">Priority</Label>
          <NativeSelect disabled id="candidate-priority" name="priority">
            <NativeSelectOption value="">Select priority</NativeSelectOption>
            <NativeSelectOption value="low">Low</NativeSelectOption>
            <NativeSelectOption value="medium">Medium</NativeSelectOption>
          </NativeSelect>
        </Field>
      )
    case 'invalid':
      return (
        <Field invalid>
          <Label for="candidate-role">Role</Label>
          <NativeSelect ariaDescribedBy="candidate-role-error" ariaInvalid id="candidate-role" name="role">
            <NativeSelectOption selected value="">Select role</NativeSelectOption>
            <NativeSelectOption value="admin">Admin</NativeSelectOption>
            <NativeSelectOption value="editor">Editor</NativeSelectOption>
          </NativeSelect>
          <FieldError id="candidate-role-error">Choose a role.</FieldError>
        </Field>
      )
    case 'sizes':
      return (
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <NativeSelect id="candidate-size-default" name="defaultSize">{statusOptions('todo')}</NativeSelect>
          <NativeSelect id="candidate-size-sm" name="smallSize" size="sm">{statusOptions('done')}</NativeSelect>
        </div>
      )
    case 'custom-token':
      return (
        <Field>
          <Label for="candidate-custom-select">Status</Label>
          <NativeSelect class="radcn-fixture-custom-native-select" id="candidate-custom-select" name="status">
            {statusOptions('done')}
          </NativeSelect>
        </Field>
      )
    case 'form-submit-reset':
      return (
        <form action="/fixtures/native-select/form-submit-reset" method="get" style="display:grid;gap:12px;max-width:360px">
          <Label for="candidate-form-status">Status</Label>
          <NativeSelect id="candidate-form-status" name="status">{statusOptions('todo')}</NativeSelect>
          <div style="display:flex;gap:12px">
            <button name="intent" type="submit" value="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      )
    case 'required-validation':
      return (
        <form action="/fixtures/native-select/required-validation" method="get" style="display:grid;gap:12px;max-width:360px">
          <Label for="candidate-required-status">Status</Label>
          <NativeSelect id="candidate-required-status" name="status" required>
            <NativeSelectOption selected value="">Select status</NativeSelectOption>
            <NativeSelectOption value="todo">Todo</NativeSelectOption>
            <NativeSelectOption value="done">Done</NativeSelectOption>
          </NativeSelect>
          <FieldDescription>Choose a status before submitting.</FieldDescription>
          <button type="submit">Submit</button>
        </form>
      )
    default:
      return (
        <Field>
          <Label for="candidate-status">Status</Label>
          <NativeSelect id="candidate-status" name="status">{statusOptions('todo')}</NativeSelect>
          <FieldDescription>Choose the current project status.</FieldDescription>
        </Field>
      )
  }
}
