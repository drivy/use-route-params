import { useParams } from "react-router-dom"

// react-router-dom is returning "string | undefiend" as possible type, but here
// we're sure that it should always be string
type NonNullableKeys<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

// Transform the path to params as a string literals list
// example: /root/:id/:car => "id | car"
type PathParamsLiteral<S extends string> = S extends
  | `:${infer T}/${infer U}`
  | `/:${infer T}/${infer U}`
  ? T | PathParamsLiteral<U>
  : S extends `${infer _T}/${infer U}`
  ? PathParamsLiteral<U>
  : S extends `:${infer T}` | `/:${infer T}`
  ? T
  : never

// Now we can wrap useParams to use the path type and our helper to get
// our params correclty typed according to the path
const useRouteParams = <RoutePath extends string>(_path: RoutePath) => {
  const params = useParams<PathParamsLiteral<RoutePath>>()
  return params as NonNullableKeys<typeof params>
}

export default useRouteParams
