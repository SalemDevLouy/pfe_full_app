NestJS TypeScript Project

**Project Stack:**
- Framework: NestJS
- Language: TypeScript
- Package Manager: npm
- Port: 3000 (default)

**Available Scripts:**
- `npm run start` - Run development server
- `npm run start:dev` - Development mode with auto-reload
- `npm run start:debug` - Debug mode
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run lint` - Run ESLint

**Project Structure:**
```
src/
  ├── app.controller.ts      # Main controller
  ├── app.controller.spec.ts # Controller tests
  ├── app.module.ts          # App module
  ├── app.service.ts         # App service
  └── main.ts                # Application entry point
test/
  └── app.e2e-spec.ts        # E2E tests
```

**Getting Started:**
- Run `npm run start:dev` to start the development server
- Server will run on http://localhost:3000
- Visit http://localhost:3000/ to see the "Hello World!" message
