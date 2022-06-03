/**
 * @vitest-environment jsdom
 */

import React from "react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { renderHook } from "@testing-library/react"
import { assert, IsExact, IsNever } from "conditional-type-checks"

import useRouteParams from "./"

declare const global: any
// Remove warning about act environment
// https://github.com/testing-library/react-testing-library/issues/1025#issuecomment-1064081086
global.IS_REACT_ACT_ENVIRONMENT = true

// Get the wrapper that will provide the routing context needed for the hook
const getWrapper =
  <PathArg extends string, UrlArg extends string>(
    routePath: PathArg,
    url: UrlArg
  ) =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: React.ReactNode }) =>
    (
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path={routePath} element={children} />
        </Routes>
      </MemoryRouter>
    )

describe("useRouteParams", () => {
  it("shouldn't return any params if this is a path without params", () => {
    const path = "/here/is/a/route"
    const { result } = renderHook(() => useRouteParams(path), {
      wrapper: getWrapper(path, path),
    })
    expect(result.current).toEqual({})

    assert<IsNever<keyof typeof result.current>>(true)
  })

  it("should return tyoed params if there params in path", () => {
    const path = "/here/:is/:a/route"
    const { result } = renderHook(() => useRouteParams(path), {
      wrapper: getWrapper(path, "/here/456/driive/route"),
    })
    expect(result.current.a).toBe("driive")
    expect(result.current.is).toBe("456")

    assert<IsExact<keyof typeof result.current, "a" | "is">>(true)
  })

  it("should handle path ending by a param", () => {
    const path = "/here/is/a/:route"
    const { result } = renderHook(() => useRouteParams(path), {
      wrapper: getWrapper(path, "/here/is/a/driive"),
    })
    expect(result.current.route).toBe("driive")

    assert<IsExact<keyof typeof result.current, "route">>(true)
  })

  it("should handle path starting by a param", () => {
    const path = "/:here/is/a/route"
    const { result } = renderHook(() => useRouteParams(path), {
      wrapper: getWrapper(path, "/driive/is/a/route"),
    })
    expect(result.current.here).toBe("driive")

    assert<IsExact<keyof typeof result.current, "here">>(true)
  })

  it("should handle path starting by a param even without starting slash", () => {
    const path = ":here/is/a/route"
    const { result } = renderHook(() => useRouteParams(path), {
      wrapper: getWrapper(path, "/driive/is/a/route"),
    })
    expect(result.current.here).toBe("driive")

    assert<IsExact<keyof typeof result.current, "here">>(true)
  })
})
