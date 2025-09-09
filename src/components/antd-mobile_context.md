========================
CODE SNIPPETS
========================
TITLE: Installing antd-mobile Package
DESCRIPTION: Provides various command-line options using different package managers (npm, yarn, pnpm, bun) to install the antd-mobile library as a project dependency. This makes the library available for use in the project code.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/quick-start.en.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install --save antd-mobile
```

LANGUAGE: bash
CODE:
```
yarn add antd-mobile
```

LANGUAGE: bash
CODE:
```
pnpm add antd-mobile
```

LANGUAGE: bash
CODE:
```
bun add antd-mobile
```

----------------------------------------

TITLE: Configuring Babel Preset-env for Compatibility (JSON)
DESCRIPTION: Provides a recommended Babel configuration using the @babel/preset-env to target specific browser versions (Chrome 49, iOS 10). This configuration helps achieve maximum compatibility for antd-mobile components across these targeted environments.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/quick-start.en.md#_snippet_2

LANGUAGE: json
CODE:
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "49",
          "ios": "10"
        }
      }
    ]
  ]
}
```

----------------------------------------

TITLE: Installing antd-mobile v5 Package - Bash
DESCRIPTION: Demonstrates how to install the `antd-mobile` package, which will install version 5 if it's the latest, after preparing the project to use `antd-mobile-v2` for the v2 components. This makes both v2 (via `antd-mobile-v2`) and v5 (via `antd-mobile`) available in the project.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_3

LANGUAGE: bash
CODE:
```
$ npm install --save antd-mobile
# or
$ yarn add antd-mobile
# or
$ pnpm add antd-mobile
```

----------------------------------------

TITLE: Installing Ant Design Mobile Icons - Bash
DESCRIPTION: Provides commands for installing the `antd-mobile-icons` package, which contains the icon assets, using common Node.js package managers like npm, yarn, pnpm, or bun. This is the required first step before using any icons in your project.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/components/icon/index.en.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install --save antd-mobile-icons
# or
yarn add antd-mobile-icons
# or
pnpm add antd-mobile-icons
# or
bun add antd-mobile-icons
```

----------------------------------------

TITLE: Installing Ant Design Mobile with Package Managers (Bash)
DESCRIPTION: Shows how to install the 'antd-mobile' package using npm, yarn, pnpm, or bun, the common package managers for Node.js projects. Users should choose the command corresponding to the package manager they are using.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/README.md#_snippet_0

LANGUAGE: Bash
CODE:
```
$ npm install antd-mobile
# or
$ yarn add antd-mobile
# or
$ pnpm add antd-mobile
# or
$ bun add antd-mobile
```

----------------------------------------

TITLE: Importing antd-mobile Component (JavaScript)
DESCRIPTION: Demonstrates how to import a specific component, such as 'Button', from the antd-mobile library in a JavaScript or TypeScript file. This allows you to use the imported component within your application code.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/quick-start.en.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { Button } from 'antd-mobile'
```

----------------------------------------

TITLE: Installing next-transpile-modules for Next.js 12 - Bash
DESCRIPTION: Instructions for installing the necessary `next-transpile-modules` package using different package managers (`npm`, `yarn`, `pnpm`, `bun`). This package is required to transpile the `antd-mobile` library in Next.js v12 projects for SSR.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ npm install --save-dev next-transpile-modules
# or
$ yarn add -D next-transpile-modules
# or
$ pnpm add -D next-transpile-modules
# or
$ bun add -D next-transpile-modules
```

----------------------------------------

TITLE: Installing antd-mobile-v2 Package - Bash
DESCRIPTION: Demonstrates how to install the `antd-mobile-v2` npm package using npm, yarn, or pnpm package managers. This package is a shadow release of the original `antd-mobile` v2 version, allowing it to coexist with v5 during migration.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ npm install --save antd-mobile-v2
# or
$ yarn add antd-mobile-v2
# or
$ pnpm add antd-mobile-v2
```

----------------------------------------

TITLE: Installing Transpile Modules for Next.js 12 | Bash
DESCRIPTION: Installs the `next-transpile-modules` package as a development dependency. This package is necessary in Next.js 12 to correctly transpile the `antd-mobile` library for compatibility with SSR.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ npm install --save-dev next-transpile-modules
# or
$ yarn add -D next-transpile-modules
# or
$ pnpm add -D next-transpile-modules
# or
$ bun add -D next-transpile-modules
```

----------------------------------------

TITLE: Installing antd-mobile v5 via Alias - Bash
DESCRIPTION: Shows how to install version 5 of `antd-mobile` under the alias `antd-mobile-v5` using npm, yarn, or pnpm. This allows the original `antd-mobile` package name to remain as v2 while v5 is accessible via the alias during migration.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_4

LANGUAGE: bash
CODE:
```
$ npm install --save antd-mobile-v5@npm:antd-mobile@5
# or
$ yarn add antd-mobile-v5@npm:antd-mobile@5
# or
$ pnpm add antd-mobile-v5@npm:antd-mobile@5
```

----------------------------------------

TITLE: package.json Entries After antd-mobile v5 Alias - JSON
DESCRIPTION: Displays the typical entries in the `package.json` file after successfully installing `antd-mobile` v5 using the alias `antd-mobile-v5` alongside an existing `antd-mobile` v2 installation. Shows how the alias maps `antd-mobile-v5` to version 5 of the `antd-mobile` package.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_5

LANGUAGE: json
CODE:
```
{
  "antd-mobile": "^2.3.2",
  "antd-mobile-v5": "npm:antd-mobile@5"
}
```

----------------------------------------

TITLE: Using Picker Prompt Method with Await - TypeScript
DESCRIPTION: This snippet demonstrates how to call the imperative `Picker.prompt` method using the `await` keyword. It shows calling the method with column configuration and asynchronously waiting for the promise to resolve to get the selected value or null.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_7

LANGUAGE: ts
CODE:
```
const value = await Picker.prompt({
  columns: yourColumnsConfig,
})
```

----------------------------------------

TITLE: Enabling HD Adaptation in Umi Framework - JavaScript
DESCRIPTION: This snippet shows the configuration required in the `config.js` file of a umi framework project to automatically enable the HD adaptation feature using ant-design-mobile's 2x version. Setting `antdMobile.hd` to `true` instructs the preset/plugin to handle the 2x imports or configurations automatically. This method simplifies HD adaptation integration in umi projects.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/hd.en.md#_snippet_1

LANGUAGE: js
CODE:
```
{
  antdMobile: {
    hd: true
  }
}
```

----------------------------------------

TITLE: Demonstrating Correct loadMore Implementation (JS)
DESCRIPTION: Provides examples showing the correct and incorrect ways to implement the `loadMore` function for the InfiniteScroll component. To prevent duplicate requests, `loadMore` must return a Promise or use `await` internally so the component's internal locking mechanism can track its completion.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/infinite-scroll/index.zh.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
function loadMore() { // 错误
  doRequest()
}
```

LANGUAGE: JavaScript
CODE:
```
async function loadMore() { // 错误
  doRequest()
}
```

LANGUAGE: JavaScript
CODE:
```
async function loadMore() { // 正确
  await doRequest()
}
```

LANGUAGE: JavaScript
CODE:
```
function loadMore() { // 正确
  return doRequest()
}
```

----------------------------------------

TITLE: Configuring Ant Design Mobile Toast Globally - TypeScript
DESCRIPTION: Demonstrates how to apply global configuration settings to the Ant Design Mobile Toast component using the `Toast.config` method. This example sets the default duration to 1000ms and the default vertical position to 'top'. This affects all subsequent Toast instances unless overridden by individual `show` calls.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/toast/index.en.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
Toast.config({ duration: 1000, position: 'top' })
```

----------------------------------------

TITLE: Importing Specific Icon - JavaScript
DESCRIPTION: Demonstrates how to import a single icon component, `AntOutline` in this case, from the installed `antd-mobile-icons` package into a JavaScript or TypeScript file. Modern build tools support tree-shaking, ensuring only imported icons are included in the final bundle.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/components/icon/index.en.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import { AntOutline } from 'antd-mobile-icons'
```

----------------------------------------

TITLE: Migrating ant-design-mobile Imports to 2x Version - JavaScript
DESCRIPTION: This snippet demonstrates how to manually update import paths in your JavaScript or React code to use the 2x version of ant-design-mobile components and global styles. It replaces the standard `antd-mobile` path with `antd-mobile/2x` to load the high-definition adapted styles. This is suitable for projects where direct import changes are preferred over build tool configurations.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/hd.en.md#_snippet_0

LANGUAGE: js
CODE:
```
import { Button } from 'antd-mobile'
// ⬇️
import { Button } from 'antd-mobile/2x'

import 'antd-mobile/es/global'
// ⬇️
import 'antd-mobile/2x/es/global'
```

----------------------------------------

TITLE: Understanding Internal 'demos' Alias Import (TypeScript)
DESCRIPTION: This import statement is used internally within the antd-mobile project's documentation demos. It refers to an alias pointing to local demo code and is not an external NPM package intended for user installation or direct use in your own project.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/faq.en.md#_snippet_2

LANGUAGE: TypeScript
CODE:
```
import xxx from 'demos'
```

----------------------------------------

TITLE: Controlling CalendarPickerView Page via Ref (TypeScript)
DESCRIPTION: Demonstrates how to use the ref methods `jumpToToday` and `jumpTo` to programmatically change the displayed page of the CalendarPickerView. Examples include jumping to today, a specific date, or a date relative to the current page.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker-view/calendar-picker-view.en.md#_snippet_1

LANGUAGE: ts
CODE:
```
// Jump to today's page
ref.current.jumpToToday()

// Jump to the specified year and month
ref.current.jumpTo({ year: 2021, month: 1 })

// Jump to three years later
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Controlling CalendarPicker with Ref - TypeScript
DESCRIPTION: Demonstrates how to programmatically control the CalendarPicker component using its Ref methods. Examples include `jumpToToday()` to navigate to the current month and `jumpTo()` to navigate to a specific year and month or calculate a new target date based on the current view.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker/calendar-picker.zh.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
// 跳回当月
ref.current.jumpToToday()

// 跳转至指定年月
ref.current.jumpTo({ year: 2021, month: 1 })

// 跳转到三年之后
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Controlling Ant Design Mobile Calendar Page Navigation via Ref (TypeScript)
DESCRIPTION: Demonstrates how to use the ref methods exposed by the Ant Design Mobile Calendar component to programmatically control the displayed calendar page. Examples show jumping to today's date, a specific year and month, and a relative page based on the current view.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.en.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
// Jump to today's page
ref.current.jumpToToday()

// Jump to the specified year and month
ref.current.jumpTo({ year: 2021, month: 1 })

// Jump to three years later
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Creating Lightweight ErrorBlock with Default Image (JSX)
DESCRIPTION: This example shows how to use the `createErrorBlock` utility to create a specialized version of the ErrorBlock component. It imports only the `defaultImage` resource from the library's image assets and configures the new component to use this image specifically for the 'default' status, effectively reducing the overall bundle size compared to including images for all four states.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/error-block/index.en.md#_snippet_1

LANGUAGE: JSX
CODE:
```
import {defaultImage} from 'antd-mobile/es/components/error-block/images'

const ErrorBlock = createErrorBlock({
  'default': defaultImage,
})
```

----------------------------------------

TITLE: Using CalendarPickerView Ref Methods (TypeScript)
DESCRIPTION: Demonstrates how to use the ref object obtained from a `CalendarPickerView` instance to programmatically control its view. Examples show jumping to the current date's month, navigating to a specific year and month, and advancing the view by a calculated number of years based on the current page.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker-view/calendar-picker-view.zh.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
// 跳回当月
ref.current.jumpToToday()

// 跳转至指定年月
ref.current.jumpTo({ year: 2021, month: 1 })

// 跳转到三年之后
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Rendering Picker Value in Form.Item Children Function - JSX
DESCRIPTION: Shows the basic rendering of a Picker's selected value using its children render function, typically used within a Form.Item. The example formats a date value using `dayjs`.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_9

LANGUAGE: jsx
CODE:
```
<DatePicker>
  {value =>
    value ? dayjs(value).format('YYYY-MM-DD') : 'Please select'
  }
</DatePicker>
```

----------------------------------------

TITLE: Customizing Form.Item Validation Messages - JSX
DESCRIPTION: Illustrates using `messageVariables` on `Form.Item` to customize default validation messages. It shows examples of overriding specific variables like 'another' or 'label' within the validation message template.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_8

LANGUAGE: jsx
CODE:
```
<Form>
  <Form.Item messageVariables={{ another: 'good' }} label="user">
    <Input />
  </Form.Item>
  <Form.Item messageVariables={{ label: 'good' }} label={<span>user</span>>
    <Input />
  </Form.Item>
</Form>
```

----------------------------------------

TITLE: InfiniteScroll Tabs forceRender Issue Example - JSX/React
DESCRIPTION: Demonstrates a scenario where InfiniteScroll used within a Tab component with `forceRender` enabled doesn't load data when the tab becomes visible, because the component's visibility check mechanism isn't re-triggered by the tab switch.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/infinite-scroll/index.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<Tabs>
  <Tabs.Tab title='水果' key='fruits'>菠萝</Tabs.Tab>
  <Tabs.Tab title='蔬菜' key='vegetables' forceRender>
    <InfiniteScroll
      hasMore={true}
      loadMore={() => {
        // When switching to this Tab, this function does not execute
      }}
    />
  </Tabs.Tab>
</Tabs>
```

----------------------------------------

TITLE: List Production JS Bundles (text)
DESCRIPTION: Lists the file paths for the production-ready JavaScript bundles of Ant Design Mobile. These bundles are minified and optimized, including versions with different compatibility levels processed by Babel.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/pre-built-bundles.en.md#_snippet_1

LANGUAGE: text
CODE:
```
/bundle/antd-mobile.cjs.js
/bundle/antd-mobile.es.js
/bundle/antd-mobile.umd.js
/bundle/antd-mobile.compatible.umd.js
```

----------------------------------------

TITLE: List CSS Bundles (text)
DESCRIPTION: Lists the file paths for the CSS bundles of Ant Design Mobile. These style files are separate from the JavaScript bundles and typically need to be imported alongside the chosen JS bundle.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/pre-built-bundles.en.md#_snippet_2

LANGUAGE: text
CODE:
```
/bundle/css-vars-patch.css
/bundle/style.css
```

----------------------------------------

TITLE: List Development JS Bundles (text)
DESCRIPTION: Lists the file paths for the development-only JavaScript bundles of Ant Design Mobile. These bundles are not optimized for production use and are intended for development environments.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/pre-built-bundles.en.md#_snippet_0

LANGUAGE: text
CODE:
```
/bundle/antd-mobile.cjs.development.js
/bundle/antd-mobile.es.development.js
/bundle/antd-mobile.umd.development.js
```

----------------------------------------

TITLE: Calling Imperative ImageViewer Show Method (TypeScript)
DESCRIPTION: Demonstrates the use of the imperative `show` method to open the ImageViewer or ImageViewer.Multi components. This is often a more convenient way to display the viewer compared to using it as a component with the `visible` prop. It returns a handler object with a `close` method.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/image-viewer/index.en.md#_snippet_0

LANGUAGE: typescript
CODE:
```
const handler = ImageViewer.show(props)
const handlerMulti = ImageViewer.Multi.show(props)
```

----------------------------------------

TITLE: Using Dialog.show Imperatively - TypeScript
DESCRIPTION: Demonstrates how to programmatically open a dialog box by calling the static Dialog.show method. This method accepts props similar to the declarative usage (excluding 'visible') and returns a controller object with a 'close' method to dismiss the dialog.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/dialog/index.en.md#_snippet_0

LANGUAGE: typescript
CODE:
```
const handler = Dialog.show(props)
```

----------------------------------------

TITLE: Configuring transpilePackages in Next.js 13 - JavaScript
DESCRIPTION: Demonstrates the simplified configuration for Next.js v13 using the built-in `transpilePackages` option in `next.config.js`. This eliminates the need for `next-transpile-modules` and directly specifies packages like `antd-mobile` for transpilation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_2

LANGUAGE: js
CODE:
```
// next.config.js
const nextConfig = {
  transpilePackages: ['antd-mobile'],
};

module.exports = nextConfig;
```

----------------------------------------

TITLE: Configuring tsconfig.json paths for Remix - JSON
DESCRIPTION: Shows the necessary modifications to the `tsconfig.json` file in a Remix project. This configuration maps the `antd-mobile` import path to its ES module bundle and includes the `global.d.ts` file for proper type resolution.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_4

LANGUAGE: json
CODE:
```
{
  "include": ["remix.env.d.ts", "global.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    ...
    "paths": {
      "antd-mobile": ["node_modules/antd-mobile/bundle/antd-mobile.es.js"]
    }
  }
}
```

----------------------------------------

TITLE: Importing antd-mobile styles in Remix root - TypeScript
DESCRIPTION: Demonstrates how to import the antd-mobile CSS bundle in the `app/root.tsx` file of a Remix project. The imported stylesheet is then returned by the `links` function, ensuring that the necessary styles are included in the document head for all pages.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_6

LANGUAGE: ts
CODE:
```
import styles from "antd-mobile/bundle/style.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

----------------------------------------

TITLE: Using Picker Prompt Method with Then - TypeScript
DESCRIPTION: This snippet demonstrates how to call the imperative `Picker.prompt` method using the Promise `.then()` method. It shows calling the method with column configuration and providing a callback function to handle the selected value or null when the promise resolves.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_8

LANGUAGE: ts
CODE:
```
Picker.prompt({
  columns: yourColumnsConfig,
}).then((value) => {
  // ...
})
```

----------------------------------------

TITLE: Importing antd-mobile Global Styles and Logic (JavaScript)
DESCRIPTION: Shows how to import the necessary global styles and logic for antd-mobile components. This import is required in the entry file when using manual component imports or babel-plugin-import to ensure components function correctly.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/import-on-demand.en.md#_snippet_1

LANGUAGE: javascript
CODE:
```
import 'antd-mobile/es/global'
```

----------------------------------------

TITLE: Showing Modal Imperatively - Ant Design Mobile TypeScript
DESCRIPTION: This snippet shows how to imperatively open an Ant Design Mobile Modal using the static `Modal.show` method. It accepts a `props` object (similar to the component's props, but without the `visible` property) to configure the modal's content and behavior. The method returns a controller object (`handler`) that includes a `close` method to programmatically dismiss the modal.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/modal/index.en.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
const handler = Modal.show(props)
```

----------------------------------------

TITLE: Configuring Next.js 12 Transpilation | JavaScript
DESCRIPTION: Configures the `next.config.js` file in a Next.js 12 project. It wraps the existing configuration with `withTM` from `next-transpile-modules`, specifying `antd-mobile` as the package to be transpiled.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_1

LANGUAGE: javascript
CODE:
```
const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);

module.exports = withTM({
  // 你项目中其他的 Next.js 配置
});
```

----------------------------------------

TITLE: Demonstrating Correct Picker Columns Prop Usage - JSX
DESCRIPTION: This snippet demonstrates the correct way to pass the `columns` prop to the Picker component. It shows the required two-dimensional array structure, where the outer array contains arrays representing each column, and the inner arrays contain the options for those columns.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_2

LANGUAGE: jsx
CODE:
```
<Picker
   columns={[
     [
       { label: 'Foo', value: 'foo' },
       { label: 'Bar', value: 'bar' },
     ]
   ]}
/>
```

----------------------------------------

TITLE: Enabling Client Components in Next.js 13 App Dir - JSX
DESCRIPTION: Illustrates how to add the `'use client'` directive at the top of component files within the Next.js 13 `app` directory. This directive is necessary to mark components as client-side, allowing the use of libraries like antd-mobile that depend on browser APIs.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_3

LANGUAGE: jsx
CODE:
```
// app/page.jsx
'use client'

import { Button } from 'antd-mobile'
```

----------------------------------------

TITLE: Importing antd-mobile v2 and v5 with Alias - JS
DESCRIPTION: Illustrates how to import components from both `antd-mobile` v2 (using the original package name) and `antd-mobile` v5 (using the `antd-mobile-v5` alias) within the same file. This is applicable when using Method 2 for migration.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_6

LANGUAGE: js
CODE:
```
import { Button } from 'antd-mobile' // v2
import { Button } from 'antd-mobile-v5' // v5
```

----------------------------------------

TITLE: Configuring tsconfig.json for Ant Design Mobile in Remix | JSON
DESCRIPTION: Updates the `tsconfig.json` file in a Remix project to include `global.d.ts` in the `include` list and adds a path alias under `compilerOptions.paths` to correctly resolve `antd-mobile` to its bundled ES module, necessary for compilation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_4

LANGUAGE: json
CODE:
```
{
  "include": ["remix.env.d.ts", "global.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    ...
    "paths": {
      "antd-mobile": ["node_modules/antd-mobile/bundle/antd-mobile.es.js"]
    }
  }
}
```

----------------------------------------

TITLE: Defining Picker Prompt Method Signature - TypeScript
DESCRIPTION: Provides the TypeScript signature for the static `Picker.prompt` method, enabling imperative usage. It shows that the method accepts Picker props (excluding `value`, `visible`, `children`) and returns a Promise that resolves with the selected value array or `null` upon cancellation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_6

LANGUAGE: typescript
CODE:
```
prompt: (props: Omit<PickerProps, 'value' | 'visible' | 'children'>) => Promise<PickerValue[] | null>
```

----------------------------------------

TITLE: Creating ErrorBlock with CDN Image (JSX)
DESCRIPTION: This snippet illustrates how to create an ErrorBlock component using an image hosted on a Content Delivery Network (CDN). By passing a URL string for a specific status (in this case, 'empty') to the `createErrorBlock` function, developers can significantly reduce the application's bundle size by loading image assets dynamically from an external source instead of including them in the application's package.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/error-block/index.en.md#_snippet_2

LANGUAGE: JSX
CODE:
```
const ErrorBlock = createErrorBlock({
  'empty': 'https://gw.alipayobjects.com/zos/bmw-prod/7a2970f8-9247-4196-b3b3-2d0218c18b59.svg',
})
```

----------------------------------------

TITLE: Using Ant Design Mobile in Next.js 13 App Directory | JSX
DESCRIPTION: Demonstrates how to import and use `antd-mobile` components within the `app` directory in Next.js 13. The `'use client'` directive is added at the top to mark the file as a Client Component, as `antd-mobile` components are typically client-side interactive.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_3

LANGUAGE: jsx
CODE:
```
// app/page.jsx
'use client'

import { Button } from 'antd-mobile'
```

----------------------------------------

TITLE: Creating Ant Design Mobile Type Declaration File for Remix | TypeScript
DESCRIPTION: Creates a `global.d.ts` file in the root of the Remix project. This file declares the `antd-mobile` module, exporting types from `antd-mobile/es` to ensure correct type checking and module resolution within the Remix environment.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_5

LANGUAGE: typescript
CODE:
```
declare module 'antd-mobile' {
  export * from 'antd-mobile/es';
}
```

----------------------------------------

TITLE: Importing Ant Design Mobile Styles in Remix | TypeScript
DESCRIPTION: Imports the bundled CSS styles from `antd-mobile/bundle/style.css` in the `app/root.tsx` file of a Remix project. The imported styles are returned by the `links` function, ensuring that the necessary CSS is included in the HTML head for styling.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_6

LANGUAGE: typescript
CODE:
```
import styles from "antd-mobile/bundle/style.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
```

----------------------------------------

TITLE: Configuring next-transpile-modules in Next.js 12 - JavaScript
DESCRIPTION: Shows how to modify the `next.config.js` file in a Next.js v12 project to include `next-transpile-modules` and specify `antd-mobile` as a package to be transpiled, enabling its correct use in SSR.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_1

LANGUAGE: js
CODE:
```
const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);

module.exports = withTM({
  // other Next.js configuration in your project
});
```

----------------------------------------

TITLE: Configuring Ant Design Mobile React 19 Rendering Compatibility JavaScript
DESCRIPTION: This snippet demonstrates how to use the temporary `unstableSetRender` method in `antd-mobile` to ensure compatibility with React 19's `createRoot` rendering API. It modifies antd-mobile's internal rendering mechanism to use `react-dom/client`, essential for correct behavior in React 19 environments, but note this method is slated for removal.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/v5-for-19.en.md#_snippet_0

LANGUAGE: JavaScript
CODE:
```
import { unstableSetRender } from 'antd-mobile'; // Support since version ^5.39.1
import { createRoot } from 'react-dom/client';

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});
```

----------------------------------------

TITLE: Replacing antd-mobile Import with antd-mobile-v2 - JSX
DESCRIPTION: Illustrates the required change in import statements when migrating from `antd-mobile` v2 to v5 using the `antd-mobile-v2` package. Replaces the original import path `antd-mobile` with `antd-mobile-v2` for components used from the v2 library.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
import {Button} from 'antd-mobile'
// ⬇️
import {Button} from 'antd-mobile-v2'
```

----------------------------------------

TITLE: Declaring antd-mobile module in Remix - TypeScript
DESCRIPTION: Provides the content for a `global.d.ts` file to be placed in the root of a Remix project. This file declares the `antd-mobile` module, enabling TypeScript to correctly resolve imports from the bundled ES module.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.en.md#_snippet_5

LANGUAGE: ts
CODE:
```
declare module 'antd-mobile' {
  export * from 'antd-mobile/es';
}
```

----------------------------------------

TITLE: Calling Calendar jumpToToday Ref Method - TypeScript
DESCRIPTION: Shows how to call the `jumpToToday` method on the Calendar component's ref. This method programmatically jumps the calendar view to the page containing the current date.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.zh.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
ref.current.jumpToToday()
```

----------------------------------------

TITLE: Configuring Next.js 13 Transpilation | JavaScript
DESCRIPTION: Configures the `next.config.js` file in a Next.js 13 project. It uses the built-in `transpilePackages` option to specify `antd-mobile`, which automatically handles transpilation without requiring external plugins like `next-transpile-modules`.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/ssr.zh.md#_snippet_2

LANGUAGE: javascript
CODE:
```
// next.config.js
const nextConfig = {
  transpilePackages: ['antd-mobile'],
};

module.exports = nextConfig;
```

----------------------------------------

TITLE: Using FloatingPanel and setHeight Method (JSX)
DESCRIPTION: This snippet demonstrates how to render the FloatingPanel component in JSX, attach a ref to it, and then call the 'setHeight' method on the ref's current value. This method is used to programmatically change the panel's height to a specified value.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/floating-panel/index.zh.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<FloatingPanel ref={ref}>...</FloatingPanel>

ref.current.setHeight(100)
```

----------------------------------------

TITLE: Showing ActionSheet Imperatively TypeScript
DESCRIPTION: This code snippet demonstrates how to display an ActionSheet using the imperative `ActionSheet.show` method. This approach directly opens the ActionSheet with the provided props, without requiring state management for visibility. The method returns a handler object that includes a `close` function to programmatically dismiss the ActionSheet. The component instance is automatically destroyed upon closing.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/action-sheet/index.en.md#_snippet_0

LANGUAGE: typescript
CODE:
```
const handler = ActionSheet.show(props)
```

----------------------------------------

TITLE: Defining FloatingPanel Ref Type - TypeScript
DESCRIPTION: This snippet defines the TypeScript type for the `FloatingPanelRef` object, illustrating the structure of the ref used to control the component imperatively. It specifically shows the `setHeight` method, which allows programmatic adjustment of the panel's height and accepts an optional `immediate` flag to skip animation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/floating-panel/index.en.md#_snippet_0

LANGUAGE: ts
CODE:
```
type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean // whether to skip animation
    }
  ) => void
}
```

----------------------------------------

TITLE: Manually Importing Single antd-mobile Component (JavaScript)
DESCRIPTION: Demonstrates how to import a specific antd-mobile component manually when automatic tree shaking is not supported. This approach directly imports the component file from the 'es/components' directory.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/import-on-demand.en.md#_snippet_0

LANGUAGE: javascript
CODE:
```
import Button from 'antd-mobile/es/components/button'
```

----------------------------------------

TITLE: Configuring babel-plugin-import for antd-mobile (JSON Config)
DESCRIPTION: Provides the Babel configuration needed to automatically transform antd-mobile imports using babel-plugin-import. It specifies the library name, directory ('es/components'), and disables style imports via the plugin, assuming styles are handled separately or globally.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/import-on-demand.en.md#_snippet_2

LANGUAGE: json
CODE:
```
module.exports = {
  "plugins": [
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es/components", "style": false}]
  ]
}
```

----------------------------------------

TITLE: Calling Calendar jumpTo Ref Method with Functional Updater - TypeScript
DESCRIPTION: Illustrates using the `jumpTo` method with a function that receives the current `Page` and returns the next target `Page`. This allows navigating relative to the current view, such as jumping three years forward as shown.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.zh.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Calling Calendar jumpTo Ref Method with Specific Date - TypeScript
DESCRIPTION: Demonstrates using the `jumpTo` method on the Calendar component's ref to navigate to a specific year and month. The method accepts a `Page` object specifying the target year and month (month is 1-indexed).

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.zh.md#_snippet_2

LANGUAGE: TypeScript
CODE:
```
ref.current.jumpTo({ year: 2021, month: 1 })
```

----------------------------------------

TITLE: Controlling Picker Visibility via Form.Item onClick and Ref - TSX
DESCRIPTION: Introduces the recommended Ant Design Mobile pattern for controlling Picker visibility. It uses the `onClick` prop of `Form.Item` to access the internal Picker's ref and call its `open()` method, simplifying visibility management.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_11

LANGUAGE: tsx
CODE:
```
<Form.Item
  name='birthday'
  label='Birthday'
  onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
    datePickerRef.current?.open() // ⬅️
  }}
>
  <DatePicker>
    {value =>
      value ? dayjs(value).format('YYYY-MM-DD') : 'Please select'
    }
  </DatePicker>
</Form.Item>
```

----------------------------------------

TITLE: Preventing 300ms Click Delay with Viewport Meta Tag (HTML)
DESCRIPTION: To prevent the 300ms click delay on mobile browsers, add this viewport meta tag to the <head> section of your HTML document. This advises the browser to use a standard viewport and bypasses the delay often associated with double-tap zooming.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/faq.en.md#_snippet_0

LANGUAGE: HTML
CODE:
```
<meta name="viewport" content="width=device-width">
```

----------------------------------------

TITLE: Importing antd-mobile-v2 Styles Manually - JS
DESCRIPTION: Provides code to manually import the default styles for the `antd-mobile-v2` package. This step is necessary if component styles are lost after switching to the `antd-mobile-v2` package in the migration process.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/migration.en.md#_snippet_2

LANGUAGE: js
CODE:
```
import 'antd-mobile-v2/dist/antd-mobile.less';  // or 'antd-mobile-v2/dist/antd-mobile.css'
```

----------------------------------------

TITLE: Defining ResultPage Details Types - TypeScript
DESCRIPTION: This TypeScript snippet defines the interfaces used for the `details` prop of the `ResultPage` component. It specifies the structure for individual detail items (`ResultPageDetail`) and the array type for all details (`ResultPageDetails`). The `bold` field indicates whether the detail value should be displayed in bold.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/result-page/index.en.md#_snippet_0

LANGUAGE: typescript
CODE:
```
interface ResultPageDetail {
  label: ReactNode;
  value: ReactNode;
  bold: boolean; // When the `bold` field is `true`, the text will be bolded.
}

type ResultPageDetails = ResultPageDetail[]
```

----------------------------------------

TITLE: Control CalendarPicker Page with Ref (TypeScript)
DESCRIPTION: Demonstrates how to programmatically control the displayed page of the CalendarPicker component using the 'jumpToToday' and 'jumpTo' methods available via the component's ref. It shows jumping to today, a specific date, or a relative date.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker/calendar-picker.en.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// Jump to today's page
ref.current.jumpToToday()

// Jump to the specified year and month
ref.current.jumpTo({ year: 2021, month: 1 })

// Jump to three years later
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

----------------------------------------

TITLE: Correct and Incorrect loadMore Function Patterns - JavaScript
DESCRIPTION: Illustrates correct and incorrect ways to implement the `loadMore` callback function for the InfiniteScroll component. The component requires `loadMore` to return a Promise or be an `async` function that is properly awaited to correctly manage concurrent requests.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/infinite-scroll/index.en.md#_snippet_0

LANGUAGE: javascript
CODE:
```
function loadMore() { // wrong
  doRequest()
}

async function loadMore() { // wrong
  doRequest()
}

async function loadMore() { // ok
  await doRequest()
}

function loadMore() { // ok
  return doRequest()
}
```

----------------------------------------

TITLE: Handling Async Change Errors - Ant Design Mobile Switch - TSX
DESCRIPTION: This code snippet illustrates how to wrap the logic within an asynchronous `onChange` callback for the Ant Design Mobile Switch component with a `try...catch` block. This pattern allows developers to gracefully handle or ignore potential errors that might occur during the asynchronous operation triggered by the switch state change, preventing unhandled promise rejections.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/switch/index.en.md#_snippet_0

LANGUAGE: tsx
CODE:
```
async function onChange(val: boolean) {
  try {
    await doSomething();
  } catch (e) {
    // handle or ignore error
  }
}
```

----------------------------------------

TITLE: Correctly Wrapping Input in Ant Design Mobile Form.Item (JSX)
DESCRIPTION: This snippet demonstrates the correct way to wrap a single form control, like an `Input`, within `Form.Item`. When a `name` is provided, `Form.Item` expects a single valid React element that can accept `value` and `onChange` props for data binding.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<Form.Item name='foo'>
  <Input />
</Form.Item>
```

----------------------------------------

TITLE: Demonstrating Incorrect Picker Columns Prop Usage - JSX
DESCRIPTION: This snippet illustrates the incorrect way to pass the `columns` prop to the Picker component. It shows providing a flat array of options, which does not match the expected two-dimensional array structure where the outer array represents columns.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<Picker
   columns={[
     { label: 'Foo', value: 'foo' },
     { label: 'Bar', value: 'bar' },
   ]}
/>
```

----------------------------------------

TITLE: Setting Global Locale with ConfigProvider - Ant Design Mobile - JSX
DESCRIPTION: This snippet demonstrates how to apply a global locale to your Ant Design Mobile application using the ConfigProvider component. Wrap your root application component (e.g., <App />) with ConfigProvider and pass the imported locale object (e.g., enUS) to the locale prop. This sets the language for all components rendered within the provider's context.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/i18n.en.md#_snippet_0

LANGUAGE: jsx
CODE:
```
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'

return (
  <ConfigProvider locale={enUS}>
    <App />
  </ConfigProvider>
)
```

----------------------------------------

TITLE: Default Global CSS Variables in Ant Design Mobile
DESCRIPTION: Lists the standard global CSS variables provided by Ant Design Mobile under the `:root` selector. These variables define default colors, fonts, and other theme-related properties that can be overridden for customization.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/theming.en.md#_snippet_3

LANGUAGE: css
CODE:
```
:root {
  --adm-color-primary: #1677ff;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;

  --adm-font-size-main: var(--adm-font-size-5);

  --adm-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue',
  helvetica, segoe ui, arial, roboto, 'PingFang SC', 'miui',
  'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}
```

----------------------------------------

TITLE: Syncing Motion with System Settings - JSX
DESCRIPTION: This snippet shows how to use `react-reduce-motion`'s `useReducedMotion` hook in conjunction with antd-mobile's `reduceMotion` and `restoreMotion`. Inside a React component's `useEffect`, it checks the system preference for reduced motion and applies the appropriate antd-mobile function, ensuring accessibility compliance. Requires the `react` and `react-reduce-motion` libraries.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/reduce-motion.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
import { useReducedMotion } from 'react-reduce-motion'
import { reduceMotion, restoreMotion } from 'antd-mobile'

const MyApp = () => {
  const prefersReducedMotion = useReducedMotion()
  React.useEffect(() => {
    if (prefersReducedMotion) {
      reduceMotion()
    } else {
      restoreMotion()
    }
  }, [prefersReducedMotion])
  // ...
}
```

----------------------------------------

TITLE: Syncing Ant Design Mobile Motion with System Preferences in React
DESCRIPTION: This React component shows how to automatically call `reduceMotion` or `restoreMotion` based on the user's system-wide 'reduce motion' setting. It uses the `useReducedMotion` hook from `react-reduce-motion` and a `useEffect` hook to update the state whenever the preference changes.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/reduce-motion.zh.md#_snippet_1

LANGUAGE: jsx
CODE:
```
import { useReducedMotion } from 'react-reduce-motion'
import { reduceMotion, restoreMotion } from 'antd-mobile'

const MyApp = () => {
  const prefersReducedMotion = useReducedMotion()
  React.useEffect(() => {
    if (prefersReducedMotion) {
      reduceMotion()
    } else {
      restoreMotion()
    }
  }, [prefersReducedMotion])
  // ...
}
```

----------------------------------------

TITLE: Imperatively Setting FloatingPanel Height - JSX
DESCRIPTION: This snippet demonstrates how to use the `setHeight` method available on the `FloatingPanel` component's ref to imperatively change its height. It shows attaching a `ref` to the component instance and then calling `ref.current.setHeight(100)` to set the panel's height to 100 pixels programmatically.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/floating-panel/index.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<FloatingPanel ref={ref}>...</FloatingPanel>

ref.current.setHeight(100)
```

----------------------------------------

TITLE: Defining Picker Component Types - TypeScript
DESCRIPTION: Defines the core TypeScript types used by the Picker component for structuring column data and selected values. This includes `PickerColumnItem` for individual options, `PickerColumn` for a single column's data, `PickerValue` for a selected item's value, and `PickerValueExtend` for extended selection information.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/picker/index.en.md#_snippet_0

LANGUAGE: typescript
CODE:
```
type PickerColumnItem = {
  label: ReactNode
  value: string
  key?: string | number
}

type PickerColumn = (string | PickerColumnItem)[]

type PickerValue = string | null

type PickerValueExtend = {
  items: (PickerColumnItem | null)[]
}
```

----------------------------------------

TITLE: Preventing 300ms Click Delay with Touch Action Style (CSS)
DESCRIPTION: An alternative method to eliminate the 300ms click delay is applying the touch-action: manipulation CSS property. This property tells the browser that the element will handle its own touch behaviors like zooming and panning, allowing immediate click events.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/faq.en.md#_snippet_1

LANGUAGE: CSS
CODE:
```
html {
  touch-action: manipulation;
}
```

----------------------------------------

TITLE: Local Theme Override using CSS Class and React
DESCRIPTION: Illustrates how to apply a specific theme customization locally to a container element and its children by defining CSS variables on a class name (e.g., `.purple-theme`) and applying that class to a React component.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/theming.en.md#_snippet_1

LANGUAGE: css
CODE:
```
.purple-theme {
  --adm-color-primary: #a062d4;
}
```

LANGUAGE: jsx
CODE:
```
<div className='purple-theme'>
  <Button color='primary'>Purple</Button>
</div>
```

----------------------------------------

TITLE: Defining FloatingPanelRef Type (TypeScript)
DESCRIPTION: This TypeScript snippet defines the structure of the ref object available on the FloatingPanel component. It specifically details the 'setHeight' method, which allows for imperatively controlling the panel's height, including an option to skip animation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/floating-panel/index.zh.md#_snippet_0

LANGUAGE: typescript
CODE:
```
type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean // 是否跳过动画
    }
  ) => void
}
```

----------------------------------------

TITLE: Manual Picker Visibility Control in Form.Item with State - TSX
DESCRIPTION: Demonstrates a manual approach to controlling DatePicker visibility using component state (`useState`) and the Form.Item's `onClick`. This method is shown as cumbersome compared to using the Picker's ref.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_10

LANGUAGE: tsx
CODE:
```
const [visible, setVisible] = useState(false)

<Form.Item
  name='birthday'
  label='Birthday'
  onClick={() => {
    setVisible(true)
  }}
>
  <DatePicker
    visible={visible}
    onClose={() => {
      setVisible(false)
    }}
  >
    {value =>
      value ? dayjs(value).format('YYYY-MM-DD') : 'Please select'
    }
  </DatePicker>
</Form.Item>
```

----------------------------------------

TITLE: Defining Calendar Page Type (TypeScript)
DESCRIPTION: Defines the type structure for representing a calendar page, used in the `jumpTo` ref method. A page is specified by its year and month.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker-view/calendar-picker-view.en.md#_snippet_0

LANGUAGE: ts
CODE:
```
type Page = { month: number; year: number }
```

----------------------------------------

TITLE: Importing Ant Design Mobile CSS Variables Patch (JavaScript)
DESCRIPTION: Provides the import statement for the `css-vars-patch.css` file from Ant Design Mobile. This patch provides fallback styles for browsers that do not natively support CSS variables (like iOS 9), ensuring component styles don't break gracefully.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/css-variables.en.md#_snippet_4

LANGUAGE: javascript
CODE:
```
import 'antd-mobile/bundle/css-vars-patch.css'
```

----------------------------------------

TITLE: Defining CalendarPickerView Page Type (TypeScript)
DESCRIPTION: Defines the `Page` type used by the `jumpTo` ref method of the `CalendarPickerView`. It specifies the structure for representing a calendar page with `month` (1-12) and `year` properties, allowing users to specify which calendar page to navigate to.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker-view/calendar-picker-view.zh.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
type Page = { month: number; year: number }
```

----------------------------------------

TITLE: Using Generics with Ant Design Mobile Selector in TSX
DESCRIPTION: This TSX snippet shows how to explicitly type the `Selector` component's value using generics, allowing only 'a', 'b', or `number` values. It sets a default value of `['a']` and logs the selected array when the value changes. This is useful for ensuring type safety when working with specific, constrained option values.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/selector/index.en.md#_snippet_1

LANGUAGE: TSX
CODE:
```
<Selector<'a' | 'b' | number>
  options={options}
  defaultValue={['a']}
  onChange={arr => console.log(arr)}
/>
```

----------------------------------------

TITLE: Incorrect Usage: Text and Control in Ant Design Mobile Form.Item (JSX)
DESCRIPTION: This snippet illustrates another incorrect usage where `Form.Item` contains both plain text and a control. `Form.Item` with a `name` prop must wrap a single, valid control element for binding.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/form/index.en.md#_snippet_3

LANGUAGE: jsx
CODE:
```
<Form.Item name='foo'>
  hello
  <Input />
</Form.Item>
// Wrong: Same as above, Form.Item's children contains multiple elements
```

----------------------------------------

TITLE: Defining Calendar Page Type - TypeScript
DESCRIPTION: Defines the `Page` type used by the Calendar component's ref methods like `jumpTo`. It's an object with `month` (number) and `year` (number) properties, specifying a target calendar page for navigation.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.zh.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
type Page = { month: number; year: number }
```

----------------------------------------

TITLE: Defining Ant Design Mobile Calendar Page Type (TypeScript)
DESCRIPTION: Defines the structure for the 'Page' type used within the Ant Design Mobile Calendar component's ref methods. This type specifies a particular month and year, enabling navigation to a specific calendar view.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar/calendar.en.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
type Page = { month: number; year: number }
```

----------------------------------------

TITLE: Setting Global Ant Design Mobile CSS Variable (:root) (CSS)
DESCRIPTION: Shows how to set a global CSS variable (`--adm-button-border-radius`) using the `:root` selector. This affects all instances of the corresponding component (Button in this case) throughout the application, providing a way to apply consistent styles globally.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/docs/guide/css-variables.en.md#_snippet_3

LANGUAGE: css
CODE:
```
:root:root {
  --adm-button-border-radius: 2px;
}
```

----------------------------------------

TITLE: Defining Calendar Page Type - TypeScript
DESCRIPTION: Defines the structure for a calendar page object, specifying the required 'month' and 'year' properties, typically used for programmatically navigating the calendar view via Ref methods.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/calendar-picker/calendar-picker.zh.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
type Page = { month: number; year: number }
```

----------------------------------------

TITLE: Integrating Native App Upload | ImageUploader | React TSX
DESCRIPTION: This snippet demonstrates how to disable the default web-based upload functionality of the ImageUploader component and integrate with a native mobile application's upload method. It uses React state to manage the list of uploaded files and a custom button to trigger the native upload logic, updating the component's value prop upon successful upload.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/image-uploader/index.zh.md#_snippet_0

LANGUAGE: typescript
CODE:
```
const App = () => {
  const [fileList, setFileList] = useState([])

  const handleUpload = async () => {
    // 调用app上传
    const url = await hybrid.upload()
    setFileList(fileList => [...fileList, { url }])
  }

  return (
    <ImageUploader
      value={fileList}
      onChange={setFileList}
      disableUpload
    >
      <span
        className='adm-image-uploader-cell adm-image-uploader-upload-button'
        onClick={handleUpload}
      >
        <span className='adm-image-uploader-upload-button-icon'>
          <AddOutline />
        </span>
      </span>
    </ImageUploader>
  )
}
```

----------------------------------------

TITLE: Handling Async onChange Errors - Switch - TSX
DESCRIPTION: This snippet demonstrates how to handle potential errors within an asynchronous `onChange` callback for the Ant Design Mobile Switch component. It uses a `try...catch` block to wrap the asynchronous operation (`doSomething()`), allowing the developer to intercept, handle, or ignore exceptions raised during the promise execution. This prevents unhandled promise rejections that the component re-throws by default, as mentioned in the surrounding text.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/switch/index.zh.md#_snippet_0

LANGUAGE: tsx
CODE:
```
async function onChange(val: boolean) {
  try {
    await doSomething();
  } catch (e) {
    // handle or ignore error
  }
}
```

----------------------------------------

TITLE: Defining createErrorBlock Type Signature (TypeScript)
DESCRIPTION: This snippet provides the TypeScript type definition for the `createErrorBlock` function. It shows that the function takes an `ImageRecord` object as input and returns a React Component Type. The `ImageRecord` type is a partial record mapping `ErrorBlockStatus` values to image sources (string or ReactNode). This helps developers understand the expected input and output types when using the utility.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/error-block/index.en.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
declare function createErrorBlock(imageRecord: ImageRecord): React.ComponentType

type ImageRecord = Partial<Record<ErrorBlockStatus, string | ReactNode>>
type ErrorBlockStatus = 'default' | 'disconnected' | 'empty' | 'busy'
```

----------------------------------------

TITLE: Incorrectly Updating ImageViewer.Multi Index (JSX)
DESCRIPTION: Illustrates an incorrect approach to changing the displayed image in the uncontrolled `ImageViewer.Multi` component. Modifying the `defaultIndex` prop after the component has rendered will not trigger a switch to a different image, as `defaultIndex` is only read on initial load.

SOURCE: https://github.com/ant-design/ant-design-mobile/blob/master/src/components/image-viewer/index.en.md#_snippet_1

LANGUAGE: jsx
CODE:
```
<Button
  onClick={() => {
    setIndex(i => i + 1)
  }}
>
  Next
</Button>
<ImageViewer.Multi
  images={images}
  defaultIndex={index}
  visible={visible}
  onClose={() => {
    setVisible(false);
  }}
/>
```