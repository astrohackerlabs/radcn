import type { FixtureScenario } from '../../../scenarios/types.ts'
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from 'radcn'

const avatarImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22%3E%3Crect width=%2280%22 height=%2280%22 fill=%22%230f766e%22/%3E%3Ccircle cx=%2240%22 cy=%2232%22 r=%2214%22 fill=%22%23ccfbf1%22/%3E%3Cpath d=%22M16 72c4-18 44-18 48 0%22 fill=%22%23ccfbf1%22/%3E%3C/svg%3E'
const avatarShadcnSrc = 'https://github.com/shadcn.png'
const avatarEvilrabbitSrc = 'https://github.com/evilrabbit.png'
const avatarMaxleiterSrc = 'https://github.com/maxleiter.png'

export function renderAvatarFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'demo':
      return (
        <div
          class="flex flex-row flex-wrap items-center gap-12"
          data-avatar-example="demo"
          style="display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;gap:3rem;"
        >
          <Avatar>
            <AvatarImage alt="@shadcn" src={avatarShadcnSrc} />
            <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
          </Avatar>
          <Avatar class="rounded-lg radcn-fixture-avatar-rounded" style="border-radius:var(--radcn-radius);">
            <AvatarImage alt="@evilrabbit" src={avatarEvilrabbitSrc} />
            <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
          </Avatar>
          <AvatarGroup
            ariaLabel="RadCN contributors"
            class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
          >
            <Avatar style="box-shadow:0 0 0 2px var(--radcn-background);">
              <AvatarImage
                alt="@shadcn"
                class="grayscale radcn-fixture-avatar-grayscale"
                src={avatarShadcnSrc}
                style="filter:grayscale(1);"
              />
              <AvatarFallback ariaHidden={true}>CN</AvatarFallback>
            </Avatar>
            <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
              <AvatarImage
                alt="@maxleiter"
                class="grayscale radcn-fixture-avatar-grayscale"
                src={avatarMaxleiterSrc}
                style="filter:grayscale(1);"
              />
              <AvatarFallback ariaHidden={true}>LR</AvatarFallback>
            </Avatar>
            <Avatar style="margin-left:-0.5rem;box-shadow:0 0 0 2px var(--radcn-background);">
              <AvatarImage
                alt="@evilrabbit"
                class="grayscale radcn-fixture-avatar-grayscale"
                src={avatarEvilrabbitSrc}
                style="filter:grayscale(1);"
              />
              <AvatarFallback ariaHidden={true}>ER</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
      )
    case 'fallback':
      return (
        <Avatar size="lg">
          <AvatarFallback ariaHidden={false}>JD</AvatarFallback>
        </Avatar>
      )
    case 'badge':
      return (
        <Avatar size="lg">
          <AvatarImage alt="Jamie Doe" src={avatarImage} />
          <AvatarFallback ariaHidden={true}>JD</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      )
    case 'group':
      return (
        <AvatarGroup ariaLabel="Design team">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      )
    case 'custom-token':
      return (
        <Avatar class="radcn-fixture-custom-avatar" size="lg">
          <AvatarFallback>FX</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      )
    default:
      return (
        <Avatar>
          <AvatarImage alt="Jamie Doe" src={avatarImage} />
          <AvatarFallback ariaHidden={true}>JD</AvatarFallback>
        </Avatar>
      )
  }
}
