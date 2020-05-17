---
title: 'NGRX | Use effects and router-store to isolate route related side 🧙‍♂️ effects'
date: '2'
tags: angular, ngrx, tutorial
---
One of the major advantages of `ngrx` is that we can isolate side effects from the components.

When we need to have router related data on the component we'll usually use the `ActivatedRoute` service from the component itself. For example, we can get the id from a route using this technique:

```typescript
export class MyComponent {
  id: string;
  id$ = this.activatedRoute.params.pipe(
    map(params => params.id),
    tap(id => this.id = id),
  );
}
```

Let's isolate this using `@ngrx/effects`. The first goal is to get the route param from the URL.

## How not to do it

We might be tempted to try using the `ActivatedRoute` service on the effects, but it's useless. It's only accessible on the "associated with a component loaded in an outlet", quoted from https://angular.io/api/router/ActivatedRoute.

Another thing we might think of is to use the `Router` service. But again we won't have the url parameter accessible in a clear, easy to use way.

What we can do, is to use `selectRouteParam` state selector from `@ngrx/router-store`.

Let's dive into the example. (stackblitz link at the bottom of the article)

## How it's done right

Setting up the effect:

```typescript
  setCurrentCourse$ = createEffect(() => this.store$.pipe(
    select(selectRouteParam('id')))
      .pipe(
        map((id: string) => setIds({id})), // dispatch a new action to set the selected id
      ),
    {dispatch: true},
  );
```

_Kudos for @timdeschryver for the simplified version 🤘🏼_

Then our component can be as simple as:

```typescript
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{selectedId$ | async | json}}`,
})
export class HomeComponent {
  selectedId$ = this.store.pipe(select((state: any) => state.featureName.selectedId));
  constructor(
    private store: Store,
  ) { }
}
```

## The takeaways

That a basic example showing just how to get a param. The real power comes when we need to use that param and fetch some data with it. Then we'll have an effect where we'll use the `mergeMap` operator to fetch the data using this id from the URL. On the component, we'll just subscribe to the fetched data, and that's it.

https://stackblitz.com/edit/ngrx-effects-router-store

If you liked it, please show me some love here or on my twitter @AdamGenshaft.
