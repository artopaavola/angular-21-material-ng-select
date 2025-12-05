# Angular 21 Project Guidelines

## Project Overview

Angular 21 standalone application using Vitest for testing. Uses strict TypeScript with signals-based state management.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm test           # Run Vitest tests
npm run build      # Production build to dist/
ng generate component <name>  # Scaffold new component
```

## Architecture

- **Entry point**: `src/main.ts` bootstraps `App` component with `appConfig`
- **App config**: `src/app/app.config.ts` - providers configured here (router, error listeners)
- **Routes**: `src/app/app.routes.ts` - add lazy-loaded routes here
- **Component files**: `.ts`, `.html`, `.css` pattern (e.g., `app.ts`, `app.html`, `app.css`)

## Angular 21 Patterns (Critical)

### Components
- **Standalone by default** - do NOT set `standalone: true` (it's implicit in v21+)
- Use `signal()` for state, `computed()` for derived state, `input()`/`output()` for I/O
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on all components
- Use `host` object in decorator instead of `@HostBinding`/`@HostListener`

```typescript
@Component({
  selector: 'app-example',
  imports: [RouterOutlet],  // Import dependencies directly
  templateUrl: './example.html',
  styleUrl: './example.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example {
  protected readonly value = signal('initial');
  readonly count = input<number>(0);
  readonly clicked = output<void>();
}
```

### Templates
- Use native control flow: `@if`, `@for`, `@switch` (NOT `*ngIf`, `*ngFor`)
- Use `class` bindings instead of `ngClass`, `style` bindings instead of `ngStyle`
- No arrow functions in templates (not supported)

### Testing (Vitest)
Tests use `vitest/globals` - no imports needed for `describe`, `it`, `expect`.
```typescript
describe('Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MyComponent] }).compileComponents();
  });
  it('should work', async () => {
    const fixture = TestBed.createComponent(MyComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('expected');
  });
});
```

## Code Style

- Prettier configured: 100 char width, single quotes, Angular HTML parser
- Strict TypeScript - avoid `any`, use `unknown` when uncertain
- Signals: use `update()` or `set()`, never `mutate()`
- Images: use `NgOptimizedImage` for static images

## Accessibility

All components must pass AXE checks and WCAG AA standards (focus management, color contrast, ARIA attributes).
