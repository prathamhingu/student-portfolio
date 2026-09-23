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


## Practical 9 - In-Memory Caching and Query Optimization

### Response Time Comparison

The GET /tasks API was tested using Postman with and without in-memory caching.

| Condition | Reading 1 | Reading 2 | Reading 3 | Average |
|-----------|-----------|-----------|-----------|---------|
| Cached | 4 ms | 5 ms | 4 ms | 4.33 ms |
| Uncached | 14 ms | 6 ms | 6 ms | 8.67 ms |

The average response time measured during testing was lower with caching than without caching.

### Cache Configuration

- Library: node-cache
- TTL: 60 seconds
- Cache key: `all_tasks`
- Cache invalidated after POST, PUT, and DELETE operations.