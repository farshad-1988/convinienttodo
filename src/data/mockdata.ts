import type { Task } from "../types/types";

export const tasks: Partial<Task>[] = [
  {
    subject: "Implement authentication flow",
    explain:
      "Create login and registration pages with JWT-based authentication.",
    dateCreated: new Date("2026-02-01"),
    status: "in-progress",
  },
  {
    subject: "Fix responsive navbar bug",
    explain: "Resolve layout breaking issue on mobile devices below 768px.",
    dateCreated: new Date("2026-02-02"),
    status: "completed",
  },
  {
    subject: "Setup CI/CD pipeline",
    explain: "Configure GitHub Actions to run tests and deploy automatically.",
    dateCreated: new Date("2026-02-03"),
    status: "pending",
  },
  {
    subject: "Optimize image loading",
    explain:
      "Implement lazy loading and compress large assets for performance.",
    dateCreated: new Date("2026-02-04"),
    status: "in-progress",
  },
  {
    subject: "Write unit tests for hooks",
    explain: "Cover custom React hooks with Jest and React Testing Library.",
    dateCreated: new Date("2026-02-05"),
    status: "pending",
  },
  {
    subject: "Integrate payment gateway",
    explain: "Connect Stripe API and handle webhook events securely.",
    dateCreated: new Date("2026-02-06"),
    status: "pending",
  },
  {
    subject: "Refactor dashboard layout",
    explain: "Improve component structure and remove duplicated code.",
    dateCreated: new Date("2026-02-07"),
    status: "completed",
  },
  {
    subject: "Add dark mode support",
    explain: "Implement theme switching with persisted user preference.",
    dateCreated: new Date("2026-02-08"),
    status: "in-progress",
  },
  {
    subject: "Database indexing",
    explain: "Add indexes to frequently queried fields to improve performance.",
    dateCreated: new Date("2026-02-09"),
    status: "pending",
  },
  {
    subject: "Deploy staging environment",
    explain: "Prepare separate staging server for QA testing.",
    dateCreated: new Date("2026-02-10"),
    status: "completed",
  },
];
