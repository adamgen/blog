---
title: 'Making autocomplete with react 🤯 common mistakes and their solutions'
date: '1'
tags: react, tutorial
---

Let's make an autocomplete with react and a promise-based HTTP client. Just a bit less trivial then it seems.

The examples below will show you the common mistakes, and how to write an autocomplete react component using a battle-tested pattern.

## The problem

When first writing an autocomplete with react the most trivial mistake would be to make a request for each input change event, and use the responses _as they arrive_.

The code will look something like this:

```ts
import React, { Fragment, useState } from "react";
import { api } from "./api";

export const AutocompleteTrivialMistake: React.FC = () => {
  const [apiResult, setApiResult] = useState('');
  const handleChange = e => {
    api(e.target.value)
      .then((result)=>{
        setApiResult(result);
      });
  };

  return (
    <div>
      <h3>AutocompleteTrivialMistake</h3>
      <input onChange={handleChange} />
      <p>
        Search result: {apiResult}
      </p>
    </div>
    );
};
```

> Note - at the bottom of the page there's a stackblitz with all of the examples shown here.

And the thing is that when you use it during development it looks like this:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/6siznmocoefoke3m4r3t.gif)

The bug that will happen when the client uses it will look something like this:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4g3qslnzacb90aadtfth.gif)

To put it into words:

- Expected - when deleting all the characters fast you should have the latest response coming from the latest request (an empty string).
- Actual - when deleting all the characters fast you see the latest response coming from an older request (non empty string).

This bug is tricky because it will often work fine during development but it will cause bugs on production.

This happens because older requests are not canceled as newer requests are sent. This brings us to this bug where an old request will return after a new request. Meaning that the latest response we get is not representing the latest search string we typed. Resulting in 🤯

# 🤯

If you see this bug somewhere, remember that an easy way to reproduce this bug is by deleting characters fast. That's because when you reduce the number of characters the search becomes lighter, which results in a faster response, as you delete more characters.

So how can we solve it?

## A trivial solution, but not _yet_ bulletproof

The first and most obvious thing that we need to do is to cancel old requests when newer requests are made.

```ts
import React, { Fragment, useState } from "react";
import { api } from "./api";

let promise;

export const AutocompleteTrivialSolution: React.FC = () => {
  const [apiResult, setApiResult] = useState("");
  const handleChange = e => {
    promise = api(e.target.value);
    const localPromise = promise;
    promise.then(result => {
      // Only send use the response of the latest request
      if(promise === localPromise){
        setApiResult(result);
      }
    });
  };

  return (
    <div>
      <h3>AutocompleteTrivialSolution</h3>
      <input onChange={handleChange} />
      <p>API search result for: {apiResult}</p>
    </div>
  );
};
```

This will actually work, but just as long as the component is used in just a single place. Having the component in multiple places will result that all instances of the component will use the same local variable. It's a bad practice, and even tho it is less likely to create bugs, it still has an opening for unexpected behaviors.

## The complete approach

At this stage, it should be clear that we need to create a local canceling mechanism for each component instance. We can accomplish it by creating a class that will have a new instance created for each component instance that is using it. Each instance will be responsible to cancel only requests made by that component. Let's dive into it.

```ts
import React, { Fragment, useState, useEffect } from "react";
import { api } from "./api";

export class Api {
  promise;
  async request(text) {
    this.promise = api(text);
    const localPromise = this.promise;
    const result = await this.promise;

    if (this.promise === localPromise) {
      return result;
    }
  }
}

export const AutocompleteCompleteSolution: React.FC = () => {
  const [apiResult, setApiResult] = useState("");
  const [apiClient, setApiClient] = useState();

  useEffect(() => {
    const client = new Api();
    setApiClient(client);
  }, []);

  const handleChange = async (e) => {
    if (!apiClient) {
      return;
    }
    const result = await apiClient.request(e.target.value);
    setApiResult(result);
  };

  return (
    <div>
      <h3>AutocompleteCompleteSolution</h3>
      <input onChange={handleChange} />
      <p>API search result for: {apiResult}</p>
    </div>
  );
};

```

https://stackblitz.com/edit/react-ts-async-autocomplete


## Thanks for reading!

Hope you liked it, please let me know what you think.

Yours,
Adam.
