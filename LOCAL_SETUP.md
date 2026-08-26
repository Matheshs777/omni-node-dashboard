# OMNI-NODE Local Setup

The dashboard dependencies and TypeScript settings are declared in the repository. After copying or cloning the project to a new computer, install the dependencies from the project root before opening it in VS Code:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

If the project was downloaded without `pnpm`, install Node.js 20 or later, enable Corepack, and then run the same commands:

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
```

This installs the packages referenced by the dashboard, including `react`, `@types/react`, `framer-motion`, `lucide-react`, `recharts`, `three`, and the React Three Fiber packages. The TypeScript configuration uses the React JSX runtime and explicitly loads React and React DOM type definitions.

