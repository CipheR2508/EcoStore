# Graph Report - E-commerce-App  (2026-04-26)

## Corpus Check
- 79 files · ~106,985 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 200 nodes · 152 edges · 26 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]

## God Nodes (most connected - your core abstractions)
1. `Users Table` - 9 edges
2. `Orders Table` - 9 edges
3. `Products Table` - 7 edges
4. `test()` - 6 edges
5. `API Overall Score: 7.5/10` - 6 edges
6. `Orders Module` - 6 edges
7. `g()` - 5 edges
8. `Q()` - 5 edges
9. `D()` - 5 edges
10. `getNthColumn()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `o()` --calls--> `test()`  [INFERRED]
  E-Commerce-Backend\coverage\lcov-report\prettify.js → E-Commerce-Backend\test_query.js
- `onFilterInput()` --calls--> `test()`  [INFERRED]
  E-Commerce-Backend\coverage\lcov-report\sorter.js → E-Commerce-Backend\test_query.js
- `k()` --calls--> `test()`  [INFERRED]
  E-Commerce-Backend\coverage\lcov-report\prettify.js → E-Commerce-Backend\test_query.js
- `D()` --calls--> `test()`  [INFERRED]
  E-Commerce-Backend\coverage\lcov-report\prettify.js → E-Commerce-Backend\test_query.js
- `Q()` --calls--> `test()`  [INFERRED]
  E-Commerce-Backend\coverage\lcov-report\prettify.js → E-Commerce-Backend\test_query.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (20): Addresses Module, Addresses Table, Authentication Module, Cart Module, Cart Table, Categories Table, Invoices Module, Invoices Table (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (11): a(), B(), D(), g(), i(), k(), o(), Q() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.31
Nodes (11): addSortIndicators(), enableUI(), getNthColumn(), getTable(), getTableBody(), getTableHeader(), loadColumns(), loadData() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (10): API Overall Score: 7.5/10, Code Quality Score: 8/10, Documentation Score: 6/10, Error Handling Score: 7/10, Functionality Score: 9/10, Input Validation (Critical Issue), Performance Score: 7/10, Phase 1: Critical Security (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (5): seedAttributes(), seedCategories(), main(), seedProducts(), slugify()

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (4): useAuth(), AuthModal(), Navbar(), Profile()

### Community 6 - "Community 6"
Cohesion: 0.7
Nodes (4): goToNext(), goToPrevious(), makeCurrent(), toggleClass()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (4): Coverage Controllers: 25.25%, Coverage index.js: 82.25%, Coverage Middlewares: 33.64%, Coverage Overall: 39.27%

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (3): CORS Configuration, Phase 2: Security Hardening, Security Headers (Helmet)

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (2): Admin Endpoints, Admin Operations Testing

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Error Messages Disclosure

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Phase 3: Production Readiness

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): Coverage authMiddleware: 78.57%

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): Coverage swagger.js: 100%

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (1): Coverage Routes: 100%

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (1): Coverage Utils: 100%

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (1): Auth Flow Testing

### Community 84 - "Community 84"
Cohesion: 1.0
Nodes (1): Cart Operations Testing

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (1): Order Flow Testing

### Community 86 - "Community 86"
Cohesion: 1.0
Nodes (1): Payment Flow Testing

### Community 87 - "Community 87"
Cohesion: 1.0
Nodes (1): Invoice Flow Testing

### Community 88 - "Community 88"
Cohesion: 1.0
Nodes (1): Public Endpoints

### Community 89 - "Community 89"
Cohesion: 1.0
Nodes (1): Protected Endpoints

### Community 90 - "Community 90"
Cohesion: 1.0
Nodes (1): Triggers Module

### Community 91 - "Community 91"
Cohesion: 1.0
Nodes (1): Views Module

### Community 92 - "Community 92"
Cohesion: 1.0
Nodes (1): Indexes Module

## Knowledge Gaps
- **29 isolated node(s):** `CORS Configuration`, `Security Headers (Helmet)`, `Error Messages Disclosure`, `Functionality Score: 9/10`, `Code Quality Score: 8/10` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 30`** (2 nodes): `Admin Endpoints`, `Admin Operations Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Error Messages Disclosure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Phase 3: Production Readiness`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Coverage authMiddleware: 78.57%`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `Coverage swagger.js: 100%`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `Coverage Routes: 100%`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `Coverage Utils: 100%`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `Auth Flow Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `Cart Operations Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `Order Flow Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `Payment Flow Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (1 nodes): `Invoice Flow Testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (1 nodes): `Public Endpoints`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `Protected Endpoints`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `Triggers Module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `Views Module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `Indexes Module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onFilterInput()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `test()` (e.g. with `k()` and `o()`) actually correct?**
  _`test()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CORS Configuration`, `Security Headers (Helmet)`, `Error Messages Disclosure` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._