import { createController } from 'remix/router'

import {
  fixtureComponents,
  fixtureScenarios,
  getComponentScenarios,
  getFixtureScenario,
} from '../../../scenarios/index.ts'
import { assetServer } from '../assets.ts'
import { renderCandidateFixture } from '../fixtures/index.tsx'
import {
  descriptionStyle,
  headingStyle,
  listStyle,
  pageStyle,
  shellStyle,
  stageStyle,
} from '../fixtures/styles.ts'
import { routes } from '../routes.ts'
import { Document } from '../ui/document.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },
    home(context) {
      return context.render(
        <Document>
          <main style={pageStyle}>
            <h1 style={headingStyle}>RadCN candidate fixtures</h1>
            <p style={descriptionStyle}>Remix 3 RadCN components for the shared proof-set scenarios.</p>
            <ul style={listStyle}>
              <li>
                <a href="/fixtures">Browse fixtures</a>
              </li>
            </ul>
          </main>
        </Document>,
      )
    },
    fixtures(context) {
      return context.render(
        <Document>
          <main style={pageStyle}>
            <h1 style={headingStyle}>Candidate fixtures</h1>
            <ul style={listStyle}>
              {fixtureComponents.map((item) => (
                <li>
                  <a href={`/fixtures/${item}`}>{item}</a>
                </li>
              ))}
            </ul>
          </main>
        </Document>,
      )
    },
    fixtureComponent(context) {
      let { component } = readFixturePath(context.request)
      let scenarios = getComponentScenarios(component)

      return context.render(
        <Document>
          <main style={pageStyle}>
            <h1 style={headingStyle}>{component}</h1>
            <ul style={listStyle}>
              {scenarios.map((item) => (
                <li>
                  <a href={`/fixtures/${item.component}/${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </main>
        </Document>,
      )
    },
    fixtureScenario(context) {
      let { component, scenario } = readFixturePath(context.request)
      let fixture = getFixtureScenario(component, scenario)

      if (!fixture) {
        return context.render(
          <Document>
            <main style={pageStyle}>
              <h1 style={headingStyle}>Fixture not found</h1>
              <p style={descriptionStyle}>
                {component}/{scenario} is not one of the {fixtureScenarios.length} shared
                scenarios.
              </p>
            </main>
          </Document>,
          { status: 404 },
        )
      }

      return context.render(
        <Document>
          <main
            style={shellStyle}
            data-fixture-app="candidate"
            data-component={fixture.component}
            data-scenario={fixture.id}
          >
            <h1 style={headingStyle}>{fixture.title}</h1>
            <p style={descriptionStyle}>{fixture.description}</p>
            <section data-fixture-stage style={stageStyle}>
              {renderCandidateFixture(fixture)}
            </section>
          </main>
        </Document>,
      )
    },
  },
})

function readFixturePath(request: Request) {
  let segments = new URL(request.url).pathname.split('/').filter(Boolean)

  return {
    component: segments[1],
    scenario: segments[2],
  }
}
