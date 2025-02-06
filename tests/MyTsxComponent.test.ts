import { ssr } from "@fullsoak/fullsoak";
import { MyComponent } from "../src/components/MyComponent/index.tsx";
import { expect, test } from "bun:test";

test("MyTsxComponent", async () => {
  const output = await ssr(MyComponent, { foo: "bar" });
  expect(output).toMatchSnapshot();
});
