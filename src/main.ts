import process from "node:process";
import {
  type Context,
  Controller,
  ControllerMethodArgs,
  Get,
  getComponentJs,
  setupDefaultFullsoakLogger,
  ssr,
  useFullSoak,
} from "@fullsoak/fullsoak";
import { MyComponent } from "./components/MyComponent/index.tsx";
import { MyRouteAwareComponent } from "./components/MyRouteAwareComponent/index.tsx";

setupDefaultFullsoakLogger();

const GLOBAL_COMPONENTS_DIR: string = __dirname + "/components";

@Controller()
class MyController {
  @Get("/")
  renderDynamicallyImportedComponent() {
    return ssr(MyComponent, { foo: "bar" });
  }

  @Get("/app")
  @Get("/app/:page")
  @Get("/app/:page/:sup1")
  renderMyRouteAwareComponent(ctx: Context) {
    return ssr(MyRouteAwareComponent, { url: ctx.request.url.href });
  }

  @Get("/components/:parentComponent/routes/:routeComponent")
  @ControllerMethodArgs("param")
  renderRouteComponent(
    param: { parentComponent: string; routeComponent: string },
    ctx: Context,
  ) {
    ctx.response.headers.set("content-type", "text/javascript");
    const { parentComponent, routeComponent } = param;
    return getComponentJs(
      `${GLOBAL_COMPONENTS_DIR}/${parentComponent}/routes/${routeComponent}`,
    );
  }
}

const port = Number(process.env["PORT"] || 0) ?? 3991;

useFullSoak({
  port,
  controllers: [MyController],
  componentsDir: GLOBAL_COMPONENTS_DIR,
});
