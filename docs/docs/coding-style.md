# Coding Style

Maintaining a consistent coding style is important for readability and collaboration. This project uses ESLint for enforcing code quality rules and potentially Prettier for code formatting (though Prettier config wasn't explicitly seen, it's often used alongside ESLint).

## ESLint

*   **Purpose:** ESLint statically analyzes the code to quickly find problems, such as potential bugs, stylistic errors, and anti-patterns.
*   **Configuration:**
    *   `eslint.config.mjs`: The primary ESLint configuration file (using the newer "flat config" format). This defines the rules, plugins (like `eslint-config-next`), and target files.
    *   `.eslintrc.json`: An older ESLint configuration file was also present. It might be deprecated or used for specific editor integrations. The `eslint.config.mjs` is likely the source of truth. *(Clarification might be needed if both are actively used)*.
*   **Usage:**
    *   Run ESLint checks from the command line:
        ```bash
        npm run lint
        ```
        *(Based on the standard script in `package.json`)*.
    *   Most code editors have ESLint extensions that provide real-time feedback and auto-fixing capabilities based on the project's configuration. It's highly recommended to install and enable the ESLint extension for your editor (e.g., VS Code).

## Code Formatting (Prettier - Assumed)

*   **Purpose:** While ESLint handles code *quality*, Prettier is commonly used for opinionated code *formatting* (line breaks, spacing, indentation, quote style, etc.) to ensure a consistent visual style across the codebase.
*   **Configuration:** If Prettier is used, there would typically be a configuration file like `.prettierrc.json`, `.prettierrc.js`, or a `prettier` key in `package.json`. *(No specific Prettier config file was identified during the initial scan, but `eslint-config-next` often includes Prettier rules or recommends its use)*.
*   **Usage:**
    *   If integrated with ESLint (common), running `npm run lint -- --fix` might also apply Prettier formatting.
    *   Alternatively, Prettier can be run separately via its own CLI command or editor extensions.
    *   Using a Prettier extension in your editor configured to "format on save" is a common practice.

## General Guidelines

*   Follow the rules enforced by ESLint. Address or disable (with justification) any reported linting errors.
*   Ensure code is consistently formatted (likely via Prettier if configured).
*   Write clear and concise code with meaningful variable and function names.
*   Add comments to explain complex logic or non-obvious code sections. 