# Contributing

We welcome contributions to the OpenQase project! Please follow these guidelines to ensure a smooth process.

## Getting Started

1.  **Set up the development environment:** Follow the [Installation](./installation.md) and [Running Locally](./running-locally.md) guides.
2.  **Find an issue:** Look for existing issues on the project's issue tracker (e.g., GitHub Issues) that you'd like to work on. If you have a new idea or bug fix, consider creating a new issue first to discuss it.
3.  **Fork & Branch:** Fork the repository and create a new branch for your changes (`git checkout -b feature/your-feature-name` or `fix/your-bug-fix`).

## Development Process

1.  **Code:** Make your changes, adhering to the project's [Coding Style](./coding-style.md).
2.  **Test:** If applicable, add tests for your changes. (Refer to the [Testing](./testing.md) guide - currently, formal testing is TBD). Manually test your changes thoroughly.
3.  **Update Documentation:** If your changes affect user-facing features, APIs, or the development setup, please update the relevant documentation pages within `/docs`.
4.  **Update Migrations:** If you make database schema changes, create a new migration file following the process outlined in [Database Migrations](./migrations.md).
5.  **Commit:** Use clear and descriptive commit messages. Reference the relevant issue number (e.g., `feat: Add user profile page (#123)`).

## Submitting Changes

1.  **Push:** Push your branch to your fork (`git push origin feature/your-feature-name`).
2.  **Create Pull Request:** Open a Pull Request (PR) from your branch to the main branch of the original OpenQase repository.
3.  **Describe PR:** Provide a clear description of the changes made in the PR, why they were made, and link the relevant issue(s). Include steps for testing if applicable.
4.  **Code Review:** A project maintainer will review your PR. Address any feedback or requested changes.
5.  **Merge:** Once approved, your PR will be merged.

## Communication

*   Use the project's issue tracker for bug reports and feature requests.
*   Discuss implementation details or ask questions in the relevant issue or PR.

Thank you for contributing! 