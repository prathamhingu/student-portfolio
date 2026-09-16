## Practical 8 — Performance Optimization and Lazy Loading in React

### Objective

The React Task Management application was optimized using route-based
lazy loading and code splitting to reduce the initial JavaScript loading cost.

### Lazy Loading Implemented

The following pages/components are loaded using `React.lazy()`:

- HomePage
- ProjectsPage
- ContactPage
- LoginPage
- HeavyComponent

`Suspense` is used to display fallback UI while lazy-loaded components
are being loaded.

### Code Splitting

Before optimization, the route components were included in the initial
application bundle.

After optimization, route components are generated as separate JavaScript
chunks and loaded when required.

### Before vs After Performance

| Metric | Before | After |
|---|---:|---:|
| Main JS bundle | 454 ms | 224 ms |
| Initial JS transferred | 4,888 KB | 4,838 KB |
| Load / Finish time | 364 ms | 317 ms |

### Additional Lazy-Loaded Component

An additional component named `HeavyComponent` was lazy-loaded in
`ProjectsPage`.

### React DevTools Observation

React Developer Tools Profiler was used to inspect component rendering.

Component identified for unnecessary re-render:

`________________________`

Observation:

`____________________________________________________________`

### Result

The application now uses route-level lazy loading, Suspense fallback UI,
and code splitting to reduce the amount of JavaScript required during the
initial page load.