# Architecture Decision Playbook

This playbook defines how we make technical decisions in this project.
Goal: high quality architecture without unnecessary complexity.

## 1) Working principles

1. Build the simplest solution that is correct today.
2. Keep extension points only where change is likely.
3. Prefer clear boundaries over clever abstractions.
4. Make data flow explicit and testable.
5. Separate product complexity from technical complexity.
6. If a pattern is not buying reliability, speed, or clarity, remove it.

## 2) Default quality bar

- Readability first: new team member should understand a module quickly.
- Determinism: same input and state should produce same behavior.
- Recoverability: failed operations should not corrupt persisted data.
- Observability: important state transitions are visible in logs/devtools/tests.
- Testability: critical domain rules and persistence behavior are covered.

## 3) Decision protocol (for every key choice)

For every major decision, document:

1. Context: what problem are we solving now.
2. Options: at least 2 realistic alternatives.
3. Trade-offs:
   - complexity cost
   - delivery speed
   - reliability and UX impact
   - future flexibility
4. Decision: selected option and why.
5. Validation: how we verify this was a good decision.
6. Revisit trigger: what new condition would make us change it.

Use this concise template:

```md
Decision: <title>
Status: proposed | accepted | deprecated
Context:
Options:
- A:
- B:
Trade-offs:
Decision:
Validation plan:
Revisit when:
```

## 4) "Challenge me" contract

If a proposed idea is risky or weak, call it out directly.
Response format:

1. What is good in the idea.
2. What can go wrong (specific risks).
3. Better alternative (pragmatic, minimal).
4. Recommendation with confidence level.

Confidence scale:
- High: known pattern, low risk.
- Medium: acceptable risk, needs guardrails.
- Low: unclear benefit or high uncertainty.

## 5) Complexity guardrails

Do NOT add complexity unless at least one condition is true:

- It reduces repeated logic in 3+ real places.
- It lowers production risk materially.
- It enables a required product capability that cannot be done simply.
- It improves operability/testing in a measurable way.

Red flags:

- Generic abstractions before concrete use-cases.
- New layers without clear ownership.
- Framework coupling leaking into domain rules.
- "Future proofing" without a near-term requirement.

## 6) Project-specific architecture stance

- App: Nuxt SPA with Composition API.
- State: Pinia stores with clear domain/application boundaries.
- Persistence:
  - IndexedDB for business data (accounts, notes, todos).
  - localStorage for user UI preferences and active account pointer.
- Undo/Redo: editor-scoped command history (not global event sourcing).
- UI: reusable components with SCSS and accessibility-first defaults.
- Monorepo: Turborepo with `apps/*` and `packages/*`.

## 7) Testing strategy baseline

- Unit tests:
  - domain rules
  - state transitions
  - persistence adapters
- E2E tests (Playwright):
  - core user flows
  - modal confirmations
  - undo/redo keyboard behavior
  - data persistence after reload

## 8) Definition of done for architecture decisions

A decision is "done" when:

1. It is written in the decision template.
2. Risks and trade-offs are explicit.
3. Validation steps are added to test plan.
4. Team alignment is confirmed.
5. Scope is minimal but sufficient.

## 9) Communication style

- Direct, respectful, evidence-based.
- Disagree early, align quickly.
- No silent assumptions on critical paths.
- Prefer short feedback loops over long theoretical debates.

