========================
CODE SNIPPETS
========================
TITLE: Local Development Setup and Start
DESCRIPTION: Instructions for cloning the repository, installing dependencies, and starting the local development server for Ant Design. It also shows how to change the development theme.

SOURCE: https://github.com/ant-design/ant-design/blob/master/__wiki__/Development.md#_snippet_0

LANGUAGE: bash
CODE:
```
git clone
npm install
npm start

# change start theme
DEV_THEME=dark npm start
```

----------------------------------------

TITLE: Local Development Setup
DESCRIPTION: Steps to clone the Ant Design repository, install dependencies, and start the local development server.

SOURCE: https://github.com/ant-design/ant-design/blob/master/README.md#_snippet_3

LANGUAGE: bash
CODE:
```
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

----------------------------------------

TITLE: Navigate and Install Dependencies
DESCRIPTION: Steps to navigate into the created project directory, install project dependencies, and start the development server.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-vite.en-US.md#_snippet_1

LANGUAGE: bash
CODE:
```
cd antd-demo
npm install
npm run dev
```

----------------------------------------

TITLE: Local Development Setup
DESCRIPTION: Instructions for setting up Ant Design for local development, including cloning the repository, installing dependencies, and starting the development server. It also mentions using opensumi.run for online development.

SOURCE: https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md#_snippet_5

LANGUAGE: bash
CODE:
```
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

----------------------------------------

TITLE: Create and Initialize Farm Project
DESCRIPTION: Steps to create a new project using Farm and initialize it with a React template. This includes installing dependencies and starting the development server.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-farm.en-US.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ npm create farm@latest
$ cd farm-project
$ npm install
$ npm start
```

----------------------------------------

TITLE: Improving Documentation and Examples
DESCRIPTION: Guidance on enhancing Ant Design's documentation and examples, including language fluency, practical examples, and spell checks.

SOURCE: https://github.com/ant-design/ant-design/blob/master/__wiki__/Collaborators.md#_snippet_9

LANGUAGE: markdown
CODE:
```
改进文档和示例
任何改进都是受欢迎的，例如：
* 使文档语言更加流畅/简洁。
* 使示例在实际应用中更有意义和实用。
* 修正拼写错误
* ...

也许你需要先阅读[文档和示例的配置指南](https://github.com/ant-design/ant-design/wiki/Configuration-for-Documentation-and-Demo)。
```

----------------------------------------

TITLE: Build and Debug with Webpack or Vite
DESCRIPTION: This snippet outlines the recommended tools for customizing your Ant Design workflow. It suggests using webpack or Vite for efficient building and debugging of your React applications.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/getting-started.en-US.md#_snippet_4

LANGUAGE: javascript
CODE:
```
// Recommended build tools for Ant Design customization
// Use webpack or Vite for building and debugging your React applications.
// Example: npm install webpack webpack-cli --save-dev
// Example: npm install vite --save-dev
```

LANGUAGE: bash
CODE:
```
# Example of starting a Vite project with Ant Design
# npm create vite@latest my-antd-app --template react
# cd my-antd-app
# npm install antd
# npm run dev
```

----------------------------------------

TITLE: Online Demo Tool for Reproduction
DESCRIPTION: Provides a link to an online tool for creating reproducible bug examples, suitable for issues not requiring build tools.

SOURCE: https://github.com/ant-design/ant-design/blob/master/__wiki__/什么是最小化重现，为什么这是必需的？.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Online Demo Tool:
  URL: https://u.ant.design/repro
  Description: Use this tool to create runnable code examples for bug reproduction when build tools are not required.
```

----------------------------------------

TITLE: New User Guide Design
DESCRIPTION: Guidelines for designing a New User Guide, aimed at reducing learning time for new users and providing assistance when modules are empty. It focuses on introducing the platform and guiding users to start their work.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/spec/research-workbench.en-US.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
New User Guide Design:
  When to Use:
    - For new users unfamiliar with the platform.
    - When modules lack content (refer to 'Empty State' guidelines).
  Involved Functions:
    - Help; Empty State Guide.
  Design Suggestions:
    - Introduce the platform's purpose and guide users to begin tasks.
    - Provide a Demo preview for managing complex objects.
```

----------------------------------------

TITLE: Install Compatibility Packages
DESCRIPTION: Commands to install compatibility packages for v4 components like `Comment` and `PageHeader` when migrating to Ant Design v5.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/migration-v5.zh-CN.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm install --save @ant-design/compatible@v5-compatible-v4
npm install --save @ant-design/pro-components
```

----------------------------------------

TITLE: Tour Invitation Example
DESCRIPTION: Demonstrates the use of Tour Invitations, which guide users through new features or design changes. It highlights the importance of keeping tours short, simple, and easy to exit or restart.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/spec/invitation.en-US.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
ImagePreview:
  src: https://gw.alipayobjects.com/zos/rmsportal/dMrVeJJiaCLzoYfJrJKe.png
  alt: example 1 of Tour Invitation
  description: A few of tour points are provided when the user first logs in. Clicking the 'Got It' button leads the user to the next tour step.
```

----------------------------------------

TITLE: Install compatible packages for v4 components
DESCRIPTION: Commands to install `@ant-design/compatible` and `@ant-design/pro-components` for using v4 deprecated components like `Comment` or `PageHeader`.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/migration-v5.en-US.md#_snippet_6

LANGUAGE: bash
CODE:
```
npm install --save @ant-design/compatible@v5-compatible-v4
npm install --save @ant-design/pro-components
```

----------------------------------------

TITLE: Ant Design Steps Basic Usage Examples
DESCRIPTION: Demonstrates various ways to use the Ant Design Steps component, including basic setup, different sizes, icons, step switching, vertical layouts, error states, and dot styles.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/steps/index.en-US.md#_snippet_1

LANGUAGE: tsx
CODE:
```
// Basic
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    items={[
      { title: 'First', description: 'This is a description' },
      { title: 'Second', description: 'This is a description' },
      { title: 'Third', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Mini version
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    size="small"
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// With icon
import React from 'react';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Memory',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Next Step',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Switch Step
import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const steps = [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' },
  ];

  return (
    <div>
      <Steps current={current} onChange={onChange} items={steps} />
      <div style={{ marginTop: 24 }}>
        {current === 0 && 'Content of Step 1'}
        {current === 1 && 'Content of Step 2'}
        {current === 2 && 'Content of Step 3'}
      </div>
      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={() => setCurrent(current + 1)} disabled={current === 2}>
          Next
        </Button>
        <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)} disabled={current === 0}>
          Previous
        </Button>
      </div>
    </div>
  );
};

export default App;
```

LANGUAGE: tsx
CODE:
```
// Vertical
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    direction="vertical"
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Vertical mini version
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    direction="vertical"
    size="small"
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Error status
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    current={1}
    status="error"
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'Error Step', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Dot Style
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    current={1}
    progressDot
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Customized Dot Style
import React from 'react';
import { Steps } from 'antd';
import type { StepsIcon } from 'antd/es/steps';

const iconSteps: StepsIcon[] = [
  { icon: '1' },
  { icon: React.createElement('img', { src: 'https://gw.alipayobjects.com/zos/rmsportal/GfWfXUqjTfQpWfJtqfWf.png', alt: 'step1' }) },
  { icon: React.createElement('img', { src: 'https://gw.alipayobjects.com/zos/rmsportal/GfWfXUqjTfQpWfJtqfWf.png', alt: 'step2' }), status: 'process', /* icon: <LoadingOutlined /> */ },
  { icon: React.createElement('img', { src: 'https://gw.alipayobjects.com/zos/rmsportal/GfWfXUqjTfQpWfJtqfWf.png', alt: 'step3' }), status: 'wait', /* icon: <SmileOutlined /> */ },
];

const App: React.FC = () => (
  <Steps
    current={1}
    progressDot
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
    icon={iconSteps}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Dot Style Size Small
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    current={1}
    size="small"
    progressDot
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Clickable
import React, { useState } from 'react';
import { Steps, message } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const steps = [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' },
  ];

  return (
    <Steps
      current={current}
      onChange={onChange}
      items={steps}
    />
  );
};

export default App;
```

LANGUAGE: tsx
CODE:
```
// Navigation Steps
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    type="navigation"
    size="small"
    current={1}
    onChange={setCurrent}
    className="site-navigation-steps"
    items={[
      { title: 'Step 1', status: 'finish' },
      { title: 'Step 2', status: 'process' },
      { title: 'Step 3', status: 'wait' },
      { title: 'Step 4', status: 'wait' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Steps with progress
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    current={1}
    percent={80}
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Label Placement
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    labelPlacement="vertical"
    current={1}
    items={[
      { title: 'Finished', description: 'This is a description' },
      { title: 'In Progress', description: 'This is a description' },
      { title: 'Waiting', description: 'This is a description' },
    ]}
  />
);

export default App;
```

LANGUAGE: tsx
CODE:
```
// Inline Steps
import React from 'react';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    type="inline"
    items={[
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
    ]}
  />
);

export default App;
```

----------------------------------------

TITLE: Providing a Minimal Reproducible Example
DESCRIPTION: Shows a good practice of providing a small, focused example to reproduce a bug.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/blog/issue-helper.zh-CN.md#_snippet_5

LANGUAGE: text
CODE:
```
我的项目里出现了一个前端组件问题，我简化了一下代码，
发现是 xxx 组件和 yyy 组件同时使用时出现的，这里有个简单的重现例子。
附件：component-xxx-yyy-bug.zip (10KB)
```

----------------------------------------

TITLE: Install Ant Design v5
DESCRIPTION: Command to install the latest version of Ant Design (v5.x) using npm.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/migration-v5.en-US.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm install --save antd@5.x
```

----------------------------------------

TITLE: Start Ant Design Locally
DESCRIPTION: This command starts a local development server for Ant Design, allowing you to see your changes in real-time.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/blog/to-be-collaborator.en-US.md#_snippet_3

LANGUAGE: bash
CODE:
```
npm start
```

----------------------------------------

TITLE: Install Ant Design v5
DESCRIPTION: Command to install the latest version of Ant Design (v5.x) using npm.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/migration-v5.zh-CN.md#_snippet_4

LANGUAGE: bash
CODE:
```
npm install --save antd@5.x
```

----------------------------------------

TITLE: Start Development Server
DESCRIPTION: Command to start the Umi development server and the output indicating the server is running and the local URL to access the application.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-umi.en-US.md#_snippet_2

LANGUAGE: bash
CODE:
```
$ npm run dev
umi dev
info  - Umi v4.0.46
        ╔════════════════════════════════════════════════════╗
        ║ App listening at:                                  ║
        ║  >   Local: http://localhost:8000                  ║
ready - ║  > Network: http://*********:8000                  ║
        ║                                                    ║
        ║ Now you can open browser with the above addresses↑ 
        ╚════════════════════════════════════════════════════╝
```

----------------------------------------

TITLE: Start Rsbuild Development Server
DESCRIPTION: Commands to navigate into the project directory and start the Rsbuild development server.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-rsbuild.en-US.md#_snippet_1

LANGUAGE: bash
CODE:
```
cd demo
npm run dev
```

----------------------------------------

TITLE: Basic Ant Design Component Usage
DESCRIPTION: Demonstrates the basic usage of Ant Design components like Button and DatePicker within a React application. It shows how to import and render these components, along with displaying the Ant Design version.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/getting-started.en-US.md#_snippet_0

LANGUAGE: jsx
CODE:
```
import React from 'react';
import { Button, Space, DatePicker, version } from 'antd';

const App = () => (
  <div style={{ padding: '0 24px' }}>
    <h1>antd version: {version}</h1>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
  </div>
);

export default App;
```

----------------------------------------

TITLE: Jest Configuration for Ant Design ESM Modules
DESCRIPTION: Provides the necessary Jest configuration to handle ES Modules (ESM) used by Ant Design. This is required because Jest traditionally does not support ESM out-of-the-box.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/getting-started.en-US.md#_snippet_3

LANGUAGE: json
CODE:
```
{
  "transform": { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" }
}
```

----------------------------------------

TITLE: Navigate and Start Refine Dev Server
DESCRIPTION: Navigate into the newly created project directory (`antd-demo`) and start the local development server using `npm run dev`.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-refine.zh-CN.md#_snippet_3

LANGUAGE: bash
CODE:
```
$ cd antd-demo
$ npm run dev
```

----------------------------------------

TITLE: Integrating Ant Design Alert Component
DESCRIPTION: Demonstrates how to integrate the Ant Design Alert component into an existing application that uses the DatePicker. It shows the code changes required to add the Alert component and display selected date information.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/getting-started.en-US.md#_snippet_2

LANGUAGE: diff
CODE:
```
import { DatePicker, message, Alert } from 'antd';

// ... inside render function

  <DatePicker onChange={value => this.handleChange(value)} />
  <div style={{ marginTop: 20 }}>
-   Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
+   <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
  </div>
```

----------------------------------------

TITLE: Immediate Response Example
DESCRIPTION: Illustrates a good practice of responding promptly to maintainer requests.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/blog/issue-helper.zh-CN.md#_snippet_3

LANGUAGE: text
CODE:
```
你：使用 Button 时发现控制台报错，提示如下。
维护者（两天内）：我没有重现出你的例子，可以提供一份可重现的示例么？
你（两天内）：可能我的情况有些不同，这里是重现代码。
```

----------------------------------------

TITLE: Empty State Use Case: New User Guidance
DESCRIPTION: Details how empty states can be used for new user guidance, including feature guides and help documents to assist users in getting started.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/spec/research-empty.en-US.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
New User Guidance:
  - Use empty states for first-time use of an application or feature.
  - Fill with feature guides, help documents, etc.
  - Components: state prompt, help guide, suggested actions.
  - Can provide process guide modules for complex processes.
```

----------------------------------------

TITLE: Installing React 16 and Running Component Tests
DESCRIPTION: Specific commands to install React 16 dependencies and run tests for a particular component. This is useful for addressing issues related to React version compatibility.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/blog/to-be-collaborator.zh-CN.md#_snippet_6

LANGUAGE: bash
CODE:
```
npm run install-react-16
npm test componet/XXX
```

----------------------------------------

TITLE: Install Ant Design Moment Webpack Plugin
DESCRIPTION: This command installs the `@ant-design/moment-webpack-plugin` as a development dependency. This plugin allows you to revert Day.js back to Moment.js if needed during the migration.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/migration-v5.zh-CN.md#_snippet_13

LANGUAGE: bash
CODE:
```
npm install --save-dev @ant-design/moment-webpack-plugin
```

----------------------------------------

TITLE: Install React 16 and Test Component
DESCRIPTION: Commands to install a specific React version and run tests for a component. Useful for resolving environment-specific issues during development.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/blog/to-be-collaborator.en-US.md#_snippet_7

LANGUAGE: bash
CODE:
```
npm run install-react-16
npm run test component/XXX
```

----------------------------------------

TITLE: Contribution Guide Link
DESCRIPTION: Provides a direct link to the Ant Design Contribution Guide for detailed instructions on how to contribute to the project.

SOURCE: https://github.com/ant-design/ant-design/blob/master/README.md#_snippet_4

LANGUAGE: markdown
CODE:
```
[Contribution Guide](https://ant.design/docs/react/contributing)
```

----------------------------------------

TITLE: Install Ant Design
DESCRIPTION: Demonstrates how to install the Ant Design library using different package managers like npm, yarn, pnpm, and bun.

SOURCE: https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md#_snippet_3

LANGUAGE: bash
CODE:
```
npm install antd --save
```

LANGUAGE: bash
CODE:
```
yarn add antd
```

LANGUAGE: bash
CODE:
```
pnpm add antd
```

LANGUAGE: bash
CODE:
```
bun add antd
```

----------------------------------------

TITLE: More Responsive Example
DESCRIPTION: Provides additional examples of responsive grid configurations.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/grid/index.en-US.md#_snippet_10

LANGUAGE: typescript
CODE:
```
// This snippet refers to an external file './demo/responsive-more.tsx' which cannot be directly included here.
// It offers more responsive grid examples for Ant Design.
```

----------------------------------------

TITLE: Customizing Week Start Day
DESCRIPTION: Example of how to customize the starting day of the week for date pickers using dayjs.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/date-picker/index.zh-CN.md#_snippet_17

LANGUAGE: javascript
CODE:
```
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
```

----------------------------------------

TITLE: Responsive Layout Example
DESCRIPTION: An example showcasing how the Ant Design Layout can adapt to different screen sizes for responsive design.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/layout/index.en-US.md#_snippet_12

LANGUAGE: jsx
CODE:
```
<Layout>
  <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={value => {
    console.log(value);
  }} onCollapse={value => {
    console.log(value);
  }}>
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} />
  </Sider>
  <Layout>
    <Header className="site-layout-background" style={{ padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
  </Layout>
</Layout>
```

----------------------------------------

TITLE: Tagging Issues and PRs
DESCRIPTION: Guidance on applying appropriate labels to issues and pull requests for better management, with examples.

SOURCE: https://github.com/ant-design/ant-design/blob/master/__wiki__/Collaborators.md#_snippet_5

LANGUAGE: markdown
CODE:
```
例如：
* 有人报告了一个 bug，并且你在本地重现了它。只需为其添加 `Bug` 标签。
* 有人创建了一个问题，并且你记得有一个类似的现有问题。只需在这个重复的问题中评论现有问题的链接并添加 `Duplicate` 标签。
```

----------------------------------------

TITLE: Create React App for Reproduction
DESCRIPTION: Recommends using Create React App to set up a project for reproducing bugs that require build tools, with instructions to push to GitHub.

SOURCE: https://github.com/ant-design/ant-design/blob/master/__wiki__/什么是最小化重现，为什么这是必需的？.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Create React App Setup:
  Tool: create-react-app
  Purpose: Set up a new project for reproducing bugs that require build tools.
  Steps:
    1. Initialize a new project: `npx create-react-app my-app`
    2. Navigate to the project directory: `cd my-app`
    3. Add Ant Design: `npm install antd` or `yarn add antd`
    4. Implement the bug scenario.
    5. Push the project to GitHub.
    6. Provide the GitHub repository link.
  Reference: https://ant.design/docs/react/use-with-create-react-app-cn
```

----------------------------------------

TITLE: Install Dependencies
DESCRIPTION: Commands to install necessary dependencies for the Umi project, including Umi plugins, Ant Design, axios, and Ant Design Pro components.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/react/use-with-umi.en-US.md#_snippet_1

LANGUAGE: bash
CODE:
```
$ pnpm i @umijs/plugins -D
$ pnpm i antd axios @ant-design/pro-components -S
```

----------------------------------------

TITLE: Server-Side Upload Implementation Examples
DESCRIPTION: Provides examples for server-side upload interface implementation. It references the jQuery-File-Upload wiki for general server-side guidance and offers a specific Express.js example for local mocking.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/upload/index.zh-CN.md#_snippet_18

LANGUAGE: javascript
CODE:
```
Refer to [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side) for server-side implementation.

Local mock example using Express:
https://github.com/react-component/upload/blob/211979fdaa2c7896b6496df7061a0cfc0fc5434e/server.js
```

----------------------------------------

TITLE: Install Ant Design
DESCRIPTION: Instructions for installing Ant Design using various package managers like npm, yarn, pnpm, and bun.

SOURCE: https://github.com/ant-design/ant-design/blob/master/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm install antd
```

LANGUAGE: bash
CODE:
```
yarn add antd
```

LANGUAGE: bash
CODE:
```
pnpm add antd
```

LANGUAGE: bash
CODE:
```
bun add antd
```

----------------------------------------

TITLE: Contrast Examples
DESCRIPTION: Illustrates the application of contrast in design through visual examples. Includes comparisons of good and bad contrast, emphasis on primary/secondary actions, and differentiation of states.

SOURCE: https://github.com/ant-design/ant-design/blob/master/docs/spec/contrast.en-US.md#_snippet_0

LANGUAGE: English
CODE:
```
ImagePreview:
  img.preview-img.good[alt="good example"][src="https://gw.alipayobjects.com/zos/rmsportal/DXDSNzVmrVwVRJCTyaTH.png"]
  img.preview-img.bad[alt="bad example"][src="https://gw.alipayobjects.com/zos/rmsportal/tMlELOuJrJrrYtTAbnlu.png"]

ImagePreview:
  img.preview-img[alt="Example of ignoring the primary and secondary sequence"][description="Accept and Reject should use default button, for UI should not affect user's decision."][src="https://gw.alipayobjects.com/zos/rmsportal/gniiMTPEHagxaelGBjAe.png"]

ImagePreview:
  img.preview-img[alt="Example of whole and part 1"][src="https://gw.alipayobjects.com/zos/rmsportal/mGCufzQKHZvViwxAVPPY.png"]

ImagePreview:
  img.preview-img[alt="Example of whole and part 2"][src="https://gw.alipayobjects.com/zos/rmsportal/vQrVvLzKbGXbZotcaMVg.png"]

ImagePreview:
  img.preview-img[alt="Example of static contrast"][description="Points with various colors would be used to show different states. "][src="https://gw.alipayobjects.com/zos/rmsportal/PMVYKxaLBApJFyXAxkHy.png"]

ImagePreview:
  img.preview-img[alt="Example of dynamic contrast"][description="When the mouse doesn't be moved, this item and other items would show different visual effects obviously, which would influence the user's operation."][src="https://gw.alipayobjects.com/zos/rmsportal/WXNjOhgQDMnNoieFrFMP.png"]
```

----------------------------------------

TITLE: Basic Tour Example
DESCRIPTION: A basic example demonstrating the fundamental usage of the Ant Design Tour component.

SOURCE: https://github.com/ant-design/ant-design/blob/master/components/tour/index.zh-CN.md#_snippet_0

LANGUAGE: tsx
CODE:
```
import React from 'react';
import { Tour } from 'antd';

const App: React.FC = () => {
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(null);
  const ref6 = React.useRef(null);
  const ref7 = React.useRef(null);
  const ref8 = React.useRef(null);
  const ref9 = React.useRef(null);
  const ref10 = React.useRef(null);
  const ref11 = React.useRef(null);
  const ref12 = React.useRef(null);
  const ref13 = React.useRef(null);
  const ref14 = React.useRef(null);
  const ref15 = React.useRef(null);
  const ref16 = React.useRef(null);
  const ref17 = React.useRef(null);
  const ref18 = React.useRef(null);
  const ref19 = React.useRef(null);
  const ref20 = React.useRef(null);
  const ref21 = React.useRef(null);
  const ref22 = React.useRef(null);
  const ref23 = React.useRef(null);
  const ref24 = React.useRef(null);
  const ref25 = React.useRef(null);
  const ref26 = React.useRef(null);
  const ref27 = React.useRef(null);
  const ref28 = React.useRef(null);
  const ref29 = React.useRef(null);
  const ref30 = React.useRef(null);
  const ref31 = React.useRef(null);
  const ref32 = React.useRef(null);
  const ref33 = React.useRef(null);
  const ref34 = React.useRef(null);
  const ref35 = React.useRef(null);
  const ref36 = React.useRef(null);
  const ref37 = React.useRef(null);
  const ref38 = React.useRef(null);
  const ref39 = React.useRef(null);
  const ref40 = React.useRef(null);
  const ref41 = React.useRef(null);
  const ref42 = React.useRef(null);
  const ref43 = React.useRef(null);
  const ref44 = React.useRef(null);
  const ref45 = React.useRef(null);
  const ref46 = React.useRef(null);
  const ref47 = React.useRef(null);
  const ref48 = React.useRef(null);
  const ref49 = React.useRef(null);
  const ref50 = React.useRef(null);
  const ref51 = React.useRef(null);
  const ref52 = React.useRef(null);
  const ref53 = React.useRef(null);
  const ref54 = React.useRef(null);
  const ref55 = React.useRef(null);
  const ref56 = React.useRef(null);
  const ref57 = React.useRef(null);
  const ref58 = React.useRef(null);
  const ref59 = React.useRef(null);
  const ref60 = React.useRef(null);
  const ref61 = React.useRef(null);
  const ref62 = React.useRef(null);
  const ref63 = React.useRef(null);
  const ref64 = React.useRef(null);
  const ref65 = React.useRef(null);
  const ref66 = React.useRef(null);
  const ref67 = React.useRef(null);
  const ref68 = React.useRef(null);
  const ref69 = React.useRef(null);
  const ref70 = React.useRef(null);
  const ref71 = React.useRef(null);
  const ref72 = React.useRef(null);
  const ref73 = React.useRef(null);
  const ref74 = React.useRef(null);
  const ref75 = React.useRef(null);
  const ref76 = React.useRef(null);
  const ref77 = React.useRef(null);
  const ref78 = React.useRef(null);
  const ref79 = React.useRef(null);
  const ref80 = React.useRef(null);
  const ref81 = React.useRef(null);
  const ref82 = React.useRef(null);
  const ref83 = React.useRef(null);
  const ref84 = React.useRef(null);
  const ref85 = React.useRef(null);
  const ref86 = React.useRef(null);
  const ref87 = React.useRef(null);
  const ref88 = React.useRef(null);
  const ref89 = React.useRef(null);
  const ref90 = React.useRef(null);
  const ref91 = React.useRef(null);
  const ref92 = React.useRef(null);
  const ref93 = React.useRef(null);
  const ref94 = React.useRef(null);
  const ref95 = React.useRef(null);
  const ref96 = React.useRef(null);
  const ref97 = React.useRef(null);
  const ref98 = React.useRef(null);
  const ref99 = React.useRef(null);
  const ref100 = React.useRef(null);
  const ref101 = React.useRef(null);
  const ref102 = React.useRef(null);
  const ref103 = React.useRef(null);
  const ref104 = React.useRef(null);
  const ref105 = React.useRef(null);
  const ref106 = React.useRef(null);
  const ref107 = React.useRef(null);
  const ref108 = React.useRef(null);
  const ref109 = React.useRef(null);
  const ref110 = React.useRef(null);
  const ref111 = React.useRef(null);
  const ref112 = React.useRef(null);
  const ref113 = React.useRef(null);
  const ref114 = React.useRef(null);
  const ref115 = React.useRef(null);
  const ref116 = React.useRef(null);
  const ref117 = React.useRef(null);
  const ref118 = React.useRef(null);
  const ref119 = React.useRef(null);
  const ref120 = React.useRef(null);
  const ref121 = React.useRef(null);
  const ref122 = React.useRef(null);
  const ref123 = React.useRef(null);
  const ref124 = React.useRef(null);
  const ref125 = React.useRef(null);
  const ref126 = React.useRef(null);
  const ref127 = React.useRef(null);
  const ref128 = React.useRef(null);
  const ref129 = React.useRef(null);
  const ref130 = React.useRef(null);
  const ref131 = React.useRef(null);
  const ref132 = React.useRef(null);
  const ref133 = React.useRef(null);
  const ref134 = React.useRef(null);
  const ref135 = React.useRef(null);
  const ref136 = React.useRef(null);
  const ref137 = React.useRef(null);
  const ref138 = React.useRef(null);
  const ref139 = React.useRef(null);
  const ref140 = React.useRef(null);
  const ref141 = React.useRef(null);
  const ref142 = React.useRef(null);
  const ref143 = React.useRef(null);
  const ref144 = React.useRef(null);
  const ref145 = React.useRef(null);
  const ref146 = React.useRef(null);
  const ref147 = React.useRef(null);
  const ref148 = React.useRef(null);
  const ref149 = React.useRef(null);
  const ref150 = React.useRef(null);
  const ref151 = React.useRef(null);
  const ref152 = React.useRef(null);
  const ref153 = React.useRef(null);
  const ref154 = React.useRef(null);
  const ref155 = React.useRef(null);
  const ref156 = React.useRef(null);
  const ref157 = React.useRef(null);
  const ref158 = React.useRef(null);
  const ref159 = React.useRef(null);
  const ref160 = React.useRef(null);
  const ref161 = React.useRef(null);
  const ref162 = React.useRef(null);
  const ref163 = React.useRef(null);
  const ref164 = React.useRef(null);
  const ref165 = React.useRef(null);
  const ref166 = React.useRef(null);
  const ref167 = React.useRef(null);
  const ref168 = React.useRef(null);
  const ref169 = React.useRef(null);
  const ref170 = React.useRef(null);
  const ref171 = React.useRef(null);
  const ref172 = React.useRef(null);
  const ref173 = React.useRef(null);
  const ref174 = React.useRef(null);
  const ref175 = React.useRef(null);
  const ref176 = React.useRef(null);
  const ref177 = React.useRef(null);
  const ref178 = React.useRef(null);
  const ref179 = React.useRef(null);
  const ref180 = React.useRef(null);
  const ref181 = React.useRef(null);
  const ref182 = React.useRef(null);
  const ref183 = React.useRef(null);
  const ref184 = React.useRef(null);
  const ref185 = React.useRef(null);
  const ref186 = React.useRef(null);
  const ref187 = React.useRef(null);
  const ref188 = React.useRef(null);
  const ref189 = React.useRef(null);
  const ref190 = React.useRef(null);
  const ref191 = React.useRef(null);
  const ref192 = React.useRef(null);
  const ref193 = React.useRef(null);
  const ref194 = React.useRef(null);
  const ref195 = React.useRef(null);
  const ref196 = React.useRef(null);
  const ref197 = React.useRef(null);
  const ref198 = React.useRef(null);
  const ref199 = React.useRef(null);
  const ref200 = React.useRef(null);
  const ref201 = React.useRef(null);
  const ref202 = React.useRef(null);
  const ref203 = React.useRef(null);
  const ref204 = React.useRef(null);
  const ref205 = React.useRef(null);
  const ref206 = React.useRef(null);
  const ref207 = React.useRef(null);
  const ref208 = React.useRef(null);
  const ref209 = React.useRef(null);
  const ref210 = React.useRef(null);
  const ref211 = React.useRef(null);
  const ref212 = React.useRef(null);
  const ref213 = React.useRef(null);
  const ref214 = React.useRef(null);
  const ref215 = React.useRef(null);
  const ref216 = React.useRef(null);
  const ref217 = React.useRef(null);
  const ref218 = React.useRef(null);
  const ref219 = React.useRef(null);
  const ref220 = React.useRef(null);
  const ref221 = React.useRef(null);
  const ref222 = React.useRef(null);
  const ref223 = React.useRef(null);
  const ref224 = React.useRef(null);
  const ref225 = React.useRef(null);
  const ref226 = React.useRef(null);
  const ref227 = React.useRef(null);
  const ref228 = React.useRef(null);
  const ref229 = React.useRef(null);
  const ref230 = React.useRef(null);
  const ref231 = React.useRef(null);
  const ref232 = React.useRef(null);
  const ref233 = React.useRef(null);
  const ref234 = React.useRef(null);
  const ref235 = React.useRef(null);
  const ref236 = React.useRef(null);
  const ref237 = React.useRef(null);
  const ref238 = React.useRef(null);
  const ref239 = React.useRef(null);
  const ref240 = React.useRef(null);
  const ref241 = React.useRef(null);
  const ref242 = React.useRef(null);
  const ref243 = React.useRef(null);
  const ref244 = React.useRef(null);
  const ref245 = React.useRef(null);
  const ref246 = React.useRef(null);
  const ref247 = React.useRef(null);
  const ref248 = React.useRef(null);
  const ref249 = React.useRef(null);
  const ref250 = React.useRef(null);
  const ref251 = React.useRef(null);
  const ref252 = React.useRef(null);
  const ref253 = React.useRef(null);
  const ref254 = React.useRef(null);
  const ref255 = React.useRef(null);
  const ref256 = React.useRef(null);
  const ref257 = React.useRef(null);
  const ref258 = React.useRef(null);
  const ref259 = React.useRef(null);
  const ref260 = React.useRef(null);
  const ref261 = React.useRef(null);
  const ref262 = React.useRef(null);
  const ref263 = React.useRef(null);
  const ref264 = React.useRef(null);
  const ref265 = React.useRef(null);
  const ref266 = React.useRef(null);
  const ref267 = React.useRef(null);
  const ref268 = React.useRef(null);
  const ref269 = React.useRef(null);
  const ref270 = React.useRef(null);
  const ref271 = React.useRef(null);
  const ref272 = React.useRef(null);
  const ref273 = React.useRef(null);
  const ref274 = React.useRef(null);
  const ref275 = React.useRef(null);
  const ref276 = React.useRef(null);
  const ref277 = React.useRef(null);
  const ref278 = React.useRef(null);
  const ref279 = React.useRef(null);
  const ref280 = React.useRef(null);
  const ref281 = React.useRef(null);
  const ref282 = React.useRef(null);
  const ref283 = React.useRef(null);
  const ref284 = React.useRef(null);
  const ref285 = React.useRef(null);
  const ref286 = React.useRef(null);
  const ref287 = React.useRef(null);
  const ref288 = React.useRef(null);
  const ref289 = React.useRef(null);
  const ref290 = React.useRef(null);
  const ref291 = React.useRef(null);
  const ref292 = React.useRef(null);
  const ref293 = React.useRef(null);
  const ref294 = React.useRef(null);
  const ref295 = React.useRef(null);
  const ref296 = React.useRef(null);
  const ref297 = React.useRef(null);
  const ref298 = React.useRef(null);
  const ref299 = React.useRef(null);
  const ref300 = React.useRef(null);
  const ref301 = React.useRef(null);
  const ref302 = React.useRef(null);
  const ref303 = React.useRef(null);
  const ref304 = React.useRef(null);
  const ref305 = React.useRef(null);
  const ref306 = React.useRef(null);
  const ref307 = React.useRef(null);
  const ref308 = React.useRef(null);
  const ref309 = React.useRef(null);
  const ref310 = React.useRef(null);
  const ref311 = React.useRef(null);
  const ref312 = React.useRef(null);
  const ref313 = React.useRef(null);
  const ref314 = React.useRef(null);
  const ref315 = React.useRef(null);
  const ref316 = React.useRef(null);
  const ref317 = React.useRef(null);
  const ref318 = React.useRef(null);
  const ref319 = React.useRef(null);
  const ref320 = React.useRef(null);
  const ref321 = React.useRef(null);
  const ref322 = React.useRef(null);
  const ref323 = React.useRef(null);
  const ref324 = React.useRef(null);
  const ref325 = React.useRef(null);
  const ref326 = React.useRef(null);
  const ref327 = React.useRef(null);
  const ref328 = React.useRef(null);
  const ref329 = React.useRef(null);
  const ref330 = React.useRef(null);
  const ref331 = React.useRef(null);
  const ref332 = React.useRef(null);
  const ref333 = React.useRef(null);
  const ref334 = React.useRef(null);
  const ref335 = React.useRef(null);
  const ref336 = React.useRef(null);
  const ref337 = React.useRef(null);
  const ref338 = React.useRef(null);
  const ref339 = React.useRef(null);
  const ref340 = React.useRef(null);
  const ref341 = React.useRef(null);
  const ref342 = React.useRef(null);
  const ref343 = React.useRef(null);
  const ref344 = React.useRef(null);
  const ref345 = React.useRef(null);
  const ref346 = React.useRef(null);
  const ref347 = React.useRef(null);
  const ref348 = React.useRef(null);
  const ref349 = React.useRef(null);
  const ref350 = React.useRef(null);
  const ref351 = React.useRef(null);
  const ref352 = React.useRef(null);
  const ref353 = React.useRef(null);
  const ref354 = React.useRef(null);
  const ref355 = React.useRef(null);
  const ref356 = React.useRef(null);
  const ref357 = React.useRef(null);
  const ref358 = React.useRef(null);
  const ref359 = React.useRef(null);
  const ref360 = React.useRef(null);
  const ref361 = React.useRef(null);
  const ref362 = React.useRef(null);
  const ref363 = React.useRef(null);
  const ref364 = React.useRef(null);
  const ref365 = React.useRef(null);
  const ref366 = React.useRef(null);
  const ref367 = React.useRef(null);
  const ref368 = React.useRef(null);
  const ref369 = React.useRef(null);
  const ref370 = React.useRef(null);
  const ref371 = React.useRef(null);
  const ref372 = React.useRef(null);
  const ref373 = React.useRef(null);
  const ref374 = React.useRef(null);
  const ref375 = React.useRef(null);
  const ref376 = React.useRef(null);
  const ref377 = React.useRef(null);
  const ref378 = React.useRef(null);
  const ref379 = React.useRef(null);
  const ref380 = React.useRef(null);
  const ref381 = React.useRef(null);
  const ref382 = React.useRef(null);
  const ref383 = React.useRef(null);
  const ref384 = React.useRef(null);
  const ref385 = React.useRef(null);
  const ref386 = React.useRef(null);
  const ref387 = React.useRef(null);
  const ref388 = React.useRef(null);
  const ref389 = React.useRef(null);
  const ref390 = React.useRef(null);
  const ref391 = React.useRef(null);
  const ref392 = React.useRef(null);
  const ref393 = React.useRef(null);
  const ref394 = React.useRef(null);
  const ref395 = React.useRef(null);
  const ref396 = React.useRef(null);
  const ref397 = React.useRef(null);
  const ref398 = React.useRef(null);
  const ref399 = React.useRef(null);
  const ref400 = React.useRef(null);
  const ref401 = React.useRef(null);
  const ref402 = React.useRef(null);
  const ref403 = React.useRef(null);
  const ref404 = React.useRef(null);
  const ref405 = React.useRef(null);
  const ref406 = React.useRef(null);
  const ref407 = React.useRef(null);
  const ref408 = React.useRef(null);
  const ref409 = React.useRef(null);
  const ref410 = React.useRef(null);
  const ref411 = React.useRef(null);
  const ref412 = React.useRef(null);
  const ref413 = React.useRef(null);
  const ref414 = React.useRef(null);
  const ref415 = React.useRef(null);
  const ref416 = React.useRef(null);
  const ref417 = React.useRef(null);
  const ref418 = React.useRef(null);
  const ref419 = React.useRef(null);
  const ref420 = React.useRef(null);
  const ref421 = React.useRef(null);
  const ref422 = React.useRef(null);
  const ref423 = React.useRef(null);
  const ref424 = React.useRef(null);
  const ref425 = React.useRef(null);
  const ref426 = React.useRef(null);
  const ref427 = React.useRef(null);
  const ref428 = React.useRef(null);
  const ref429 = React.useRef(null);
  const ref430 = React.useRef(null);
  const ref431 = React.useRef(null);
  const ref432 = React.useRef(null);
  const ref433 = React.useRef(null);
  const ref434 = React.useRef(null);
  const ref435 = React.useRef(null);
  const ref436 = React.useRef(null);
  const ref437 = React.useRef(null);
  const ref438 = React.useRef(null);
  const ref439 = React.useRef(null);
  const ref440 = React.useRef(null);
  const ref441 = React.useRef(null);
  const ref442 = React.useRef(null);
  const ref443 = React.useRef(null);
  const ref444 = React.useRef(null);
  const ref445 = React.useRef(null);
  const ref446 = React.useRef(null);
  const ref447 = React.useRef(null);
  const ref448 = React.useRef(null);
  const ref449 = React.useRef(null);
  const ref450 = React.useRef(null);
  const ref451 = React.useRef(null);
  const ref452 = React.useRef(null);
  const ref453 = React.useRef(null);
  const ref454 = React.useRef(null);
  const ref455 = React.useRef(null);
  const ref456 = React.useRef(null);
  const ref457 = React.useRef(null);
  const ref458 = React.useRef(null);
  const ref459 = React.useRef(null);
  const ref460 = React.useRef(null);
  const ref461 = React.useRef(null);
  const ref462 = React.useRef(null);
  const ref463 = React.useRef(null);
  const ref464 = React.useRef(null);
  const ref465 = React.useRef(null);
  const ref466 = React.useRef(null);
  const ref467 = React.useRef(null);
  const ref468 = React.useRef(null);
  const ref469 = React.useRef(null);
  const ref470 = React.useRef(null);
  const ref471 = React.useRef(null);
  const ref472 = React.useRef(null);
  const ref473 = React.useRef(null);
  const ref474 = React.useRef(null);
  const ref475 = React.useRef(null);
  const ref476 = React.useRef(null);
  const ref477 = React.useRef(null);
  const ref478 = React.useRef(null);
  const ref479 = React.useRef(null);
  const ref480 = React.useRef(null);
  const ref481 = React.useRef(null);
  const ref482 = React.useRef(null);
  const ref483 = React.useRef(null);
  const ref484 = React.useRef(null);
  const ref485 = React.useRef(null);
  const ref486 = React.useRef(null);
  const ref487 = React.useRef(null);
  const ref488 = React.useRef(null);
  const ref489 = React.useRef(null);
  const ref490 = React.useRef(null);
  const ref491 = React.useRef(null);
  const ref492 = React.useRef(null);
  const ref493 = React.useRef(null);
  const ref494 = React.useRef(null);
  const ref495 = React.useRef(null);
  const ref496 = React.useRef(null);
  const ref497 = React.useRef(null);
  const ref498 = React.useRef(null);
  const ref499 = React.useRef(null);
  const ref500 = React.useRef(null);

  const steps = [
    {
      title: 'Create context',
      description: 'Create context',
      target: () => ref1.current,
    },
    {
      title: 'Add data to context',
      description: 'Add data to context',
      target: () => ref2.current,
    },
    {
      title: 'Render children in context',
      description: 'Render children in context',
      target: () => ref3.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref4.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref5.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref6.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref7.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref8.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref9.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref10.current,
    },
    {
      title: 'Use context',
      description: 'Use context',
      target: () => ref11.current,
    },
    {
      title: '
```