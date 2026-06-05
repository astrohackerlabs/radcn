import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from 'radcn'
import { Form, FormDescription, FormField, FormLabel, FormMessage, formControlAttributes, formFieldIds } from 'radcn/form'

function fieldIds(name: string) {
  return formFieldIds(`candidate-form-${name}`)
}

function TextField({
  description,
  invalid,
  label,
  message,
  name,
  required,
  value,
}: {
  description: string
  invalid?: boolean
  label: string
  message?: string
  name: string
  required?: boolean
  value?: string
}) {
  let ids = fieldIds(name)
  let control = formControlAttributes(ids, { invalid, message: !!message })

  return (
    <FormField invalid={invalid} name={name}>
      <FormLabel error={invalid} for={control.id}>{label}</FormLabel>
      <Input
        ariaDescribedBy={control.ariaDescribedBy}
        ariaInvalid={control.ariaInvalid}
        id={control.id}
        name={name}
        required={required}
        value={value}
      />
      <FormDescription id={ids.descriptionId}>{description}</FormDescription>
      <FormMessage id={ids.messageId}>{message}</FormMessage>
    </FormField>
  )
}

export function renderFormFixture(fixture: FixtureScenario) {
  let nativeEmail = formFieldIds('candidate-form-native-email')
  let serverEmail = formFieldIds('candidate-form-server-email')
  let actionName = formFieldIds('candidate-form-action-name')
  let customMessage = formFieldIds('candidate-form-custom-message')

  switch (fixture.id) {
    case 'basic':
      return (
        <Form action="/fixtures/form/basic" method="get">
          {TextField({
            description: 'This value is submitted with the native form.',
            label: 'Workspace',
            name: 'workspace',
            required: true,
            value: 'radcn',
          })}
          <Button name="intent" type="submit" value="save">Save workspace</Button>
        </Form>
      )
    case 'textarea':
      let about = fieldIds('about')
      let aboutControl = formControlAttributes(about)

      return (
        <Form action="/fixtures/form/textarea" method="get">
          <FormField name="about">
            <FormLabel for={aboutControl.id}>About</FormLabel>
            <Textarea
              ariaDescribedBy={aboutControl.ariaDescribedBy}
              id={aboutControl.id}
              name="about"
              value="RadCN ports shadcn patterns to Remix 3."
            />
            <FormDescription id={about.descriptionId}>Textarea fields use the same explicit wiring.</FormDescription>
          </FormField>
          <Button type="submit">Save about</Button>
        </Form>
      )
    case 'select':
      let language = fieldIds('language')
      let languageControl = formControlAttributes(language)

      return (
        <Form action="/fixtures/form/select" method="get">
          <FormField name="language">
            <FormLabel for={languageControl.id}>Language</FormLabel>
            <Select id={languageControl.id} name="language" value="typescript">
              <SelectTrigger ariaLabel="Language"><SelectValue placeholder="Select language">TypeScript</SelectValue></SelectTrigger>
              <SelectContent>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription id={language.descriptionId}>Select submits a hidden native value.</FormDescription>
          </FormField>
          <Button type="submit">Save language</Button>
        </Form>
      )
    case 'checkbox-group':
      return (
        <Form action="/fixtures/form/checkbox-group" method="get">
          <FormField name="notifications">
            <FormLabel>Notifications</FormLabel>
            <FormDescription id="candidate-form-notifications-description">Choose the channels RadCN should use.</FormDescription>
            <label style="display:flex;gap:8px;align-items:center">
              <Checkbox checked name="notifications" value="deploys" />
              Deploys
            </label>
            <label style="display:flex;gap:8px;align-items:center">
              <Checkbox checked name="notifications" value="reviews" />
              Reviews
            </label>
          </FormField>
          <Button type="submit">Save notifications</Button>
        </Form>
      )
    case 'radio-group':
      return (
        <Form action="/fixtures/form/radio-group" method="get">
          <FormField name="plan">
            <FormLabel>Plan</FormLabel>
            <RadioGroup ariaDescribedBy="candidate-form-plan-description" name="plan">
              <label style="display:flex;gap:8px;align-items:center">
                <RadioGroupItem checked id="candidate-form-plan-basic" name="plan" value="basic" />
                Basic
              </label>
              <label style="display:flex;gap:8px;align-items:center">
                <RadioGroupItem id="candidate-form-plan-pro" name="plan" value="pro" />
                Pro
              </label>
            </RadioGroup>
            <FormDescription id="candidate-form-plan-description">Radio groups submit one selected value.</FormDescription>
          </FormField>
          <Button type="submit">Save plan</Button>
        </Form>
      )
    case 'switch':
      let twoFactor = fieldIds('two-factor')
      let twoFactorControl = formControlAttributes(twoFactor)

      return (
        <Form action="/fixtures/form/switch" method="get">
          <FormField name="twoFactor">
            <FormLabel for={twoFactorControl.id}>Two-factor authentication</FormLabel>
            <Switch ariaDescribedBy={twoFactorControl.ariaDescribedBy} checked id={twoFactorControl.id} name="twoFactor" value="enabled" />
            <FormDescription id={twoFactor.descriptionId}>Switches are native checkbox submissions.</FormDescription>
          </FormField>
          <Button type="submit">Save security</Button>
        </Form>
      )
    case 'array-list':
      return (
        <Form action="/fixtures/form/array-list" method="get">
          <FormField name="emails">
            <FormLabel>Team emails</FormLabel>
            <FormDescription id="candidate-form-emails-description">Repeated inputs keep array state in the app route.</FormDescription>
            <Input ariaDescribedBy="candidate-form-emails-description" id="candidate-form-email-0" name="emails" value="ada@example.com" />
            <Input ariaDescribedBy="candidate-form-emails-description" id="candidate-form-email-1" name="emails" value="grace@example.com" />
          </FormField>
          <Button name="intent" type="submit" value="add-email">Add email</Button>
        </Form>
      )
    case 'password-strength':
      let password = fieldIds('password')
      let passwordControl = formControlAttributes(password, { invalid: true, message: true })

      return (
        <Form action="/fixtures/form/password-strength" method="get">
          <FormField invalid name="password">
            <FormLabel error for={passwordControl.id}>Password</FormLabel>
            <InputGroup ariaLabel="Password strength" invalid>
              <InputGroupInput
                ariaDescribedBy={passwordControl.ariaDescribedBy}
                ariaInvalid={passwordControl.ariaInvalid}
                id={passwordControl.id}
                name="password"
                value="radcn"
              />
              <InputGroupAddon align="inline-end"><InputGroupText>Weak</InputGroupText></InputGroupAddon>
            </InputGroup>
            <Progress ariaLabel="Password strength" value={38} />
            <FormDescription id={password.descriptionId}>Use at least 12 characters.</FormDescription>
            <FormMessage id={password.messageId}>Add a number and a symbol.</FormMessage>
          </FormField>
          <Button type="submit">Update password</Button>
        </Form>
      )
    case 'complex':
      return (
        <Form action="/fixtures/form/complex" method="get">
          <Card>
            <CardHeader>
              <CardTitle>Workspace plan</CardTitle>
              <CardDescription>Complex forms are composed from explicit RadCN fields.</CardDescription>
            </CardHeader>
            <CardContent>
              {TextField({ description: 'Shown on invoices and admin screens.', label: 'Workspace', name: 'complex-workspace', value: 'RadCN' })}
              <FormField name="complex-plan">
                <FormLabel>Plan</FormLabel>
                <RadioGroup name="complex-plan">
                  <label style="display:flex;gap:8px;align-items:center"><RadioGroupItem checked name="complex-plan" value="pro" /> Pro</label>
                  <label style="display:flex;gap:8px;align-items:center"><RadioGroupItem name="complex-plan" value="enterprise" /> Enterprise</label>
                </RadioGroup>
              </FormField>
              <FormField name="addons">
                <FormLabel>Add-ons</FormLabel>
                <label style="display:flex;gap:8px;align-items:center"><Checkbox checked name="addons" value="analytics" /> Analytics</label>
                <label style="display:flex;gap:8px;align-items:center"><Checkbox name="addons" value="support" /> Priority support</label>
              </FormField>
              <FormField name="complex-notifications">
                <FormLabel for="candidate-form-complex-notifications">Email notifications</FormLabel>
                <Switch checked id="candidate-form-complex-notifications" name="complex-notifications" value="enabled" />
              </FormField>
            </CardContent>
          </Card>
          <Button type="submit">Save plan</Button>
        </Form>
      )
    case 'server-errors-rich':
      return (
        <Form action="/fixtures/form/server-errors-rich" method="get">
          {TextField({
            description: 'Use the account email for this workspace.',
            invalid: true,
            label: 'Email',
            message: 'Enter a valid email address.',
            name: 'rich-email',
            value: 'not-an-email',
          })}
          {TextField({
            description: 'Workspace names must be unique.',
            invalid: true,
            label: 'Workspace',
            message: 'That workspace is already taken.',
            name: 'rich-workspace',
            value: 'radcn',
          })}
          <Button name="intent" type="submit" value="retry">Try again</Button>
        </Form>
      )
    case 'server-errors':
      let serverControl = formControlAttributes(serverEmail, { invalid: true, message: true })

      return (
        <Form action="/fixtures/form/server-errors" method="get">
          <FormField invalid name="email">
            <FormLabel error for={serverControl.id}>Email</FormLabel>
            <Input
              ariaDescribedBy={serverControl.ariaDescribedBy}
              ariaInvalid={serverControl.ariaInvalid}
              id={serverControl.id}
              name="email"
              value="not-an-email"
            />
            <FormDescription id={serverEmail.descriptionId}>Use your work email address.</FormDescription>
            <FormMessage id={serverEmail.messageId}>Use a valid email address.</FormMessage>
          </FormField>
          <Button name="intent" type="submit" value="retry">Try again</Button>
        </Form>
      )
    case 'action-state':
      let actionControl = formControlAttributes(actionName)

      return (
        <Form action="/fixtures/form/action-state" method="get">
          <FormField name="project">
            <FormLabel for={actionControl.id}>Project</FormLabel>
            <Input ariaDescribedBy={actionControl.ariaDescribedBy} id={actionControl.id} name="project" value="RadCN" />
            <FormDescription id={actionName.descriptionId}>Last saved value: RadCN</FormDescription>
          </FormField>
          <Button name="intent" type="submit" value="save">Save</Button>
        </Form>
      )
    case 'custom-token':
      let customControl = formControlAttributes(customMessage, { invalid: true, message: true })

      return (
        <Form action="/fixtures/form/custom-token" class="radcn-fixture-custom-field" method="get">
          <FormField invalid name="message">
            <FormLabel error for={customControl.id}>Message</FormLabel>
            <Textarea
              ariaDescribedBy={customControl.ariaDescribedBy}
              ariaInvalid={customControl.ariaInvalid}
              id={customControl.id}
              name="message"
              value="Too short"
            />
            <FormDescription id={customMessage.descriptionId}>Keep it short and specific.</FormDescription>
            <FormMessage id={customMessage.messageId}>Custom token form error.</FormMessage>
          </FormField>
          <Button type="submit">Send</Button>
        </Form>
      )
    default:
      let nativeControl = formControlAttributes(nativeEmail)

      return (
        <Form action="/fixtures/form/native-validation" method="get">
          <FormField name="email">
            <FormLabel for={nativeControl.id}>Email</FormLabel>
            <Input
              ariaDescribedBy={nativeControl.ariaDescribedBy}
              id={nativeControl.id}
              name="email"
              placeholder="name@example.com"
              required
            />
            <FormDescription id={nativeEmail.descriptionId}>Native required validation owns this field.</FormDescription>
          </FormField>
          <Button name="intent" type="submit" value="submit">Submit</Button>
        </Form>
      )
  }
}
