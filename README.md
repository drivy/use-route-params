<h1 align="center">@getaround-eu/use-route-params</h1>

<div align="center">
  <a href="https://github.com/drivy/use-route-params/blob/main/LICENSE.md">
    <img src="https://badgen.net/github/license/drivy/use-route-params.svg" alt="license" />
  </a>
  <a href="https://npmjs.com/package/drivy/use-route-params">
    <img src="https://badgen.net/npm/v/drivy/use-route-params" alt="package version" />
  </a>
</div>

<p align="center">Get your params typed from the route</p>

### What's it?

`useRouteParams` is a hook which, used with `react-router-dom`, allows you to directly get the typed params from a provided route path.

### Install

Supposing that you __already have `react-router-dom` installed__:

```shell
yarn add @getaround-eu/use-route-params
# or
npm -i @getaround-eu/use-route-params
```

### Usage

```typescript
import useRouteParams from "@getaround-eu/use-route-params"

const MY_COMPONENT_PATH = "/here/:is/:a/route/toMyComponent"


const MyComponent = () => {
  const { a, is } = useRouteParams(MY_COMPONENT_PATH)

  return (...)
}

```

## What is Getaround?

Getaround connects safe, convenient and affordable cars with people who need them to live and work. **We aim to create the world's best carsharing marketplace that make sharing vehicles superior to owning them**. Our community includes people who rely on our cars for on-demand mobility, and owners who share cars on our platform, including those who operate their own carsharing businesses.

Our vision is to make our cities and communities better places to live by:
- Empowering people with convenient access to the cars they need, whenever they need them.
- Improving mobility by relieving congestion and making public transit easier to use.
- Protecting our environment by reducing pollution and advancing sustainable energy.

As a reminder the biggest carbon emitter in most countries are the cars, and this is what we have an impact on at Getaround.

You can [learn more about Getaround on our tech blog](https://getaround.tech/about/).
