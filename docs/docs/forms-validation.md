# Forms & Validation

Handling user input through forms and ensuring data validity are critical parts of the application, especially within the Admin CMS.

## Form Implementation

*   **UI:** Forms are primarily built using standard HTML form elements (`<form>`, `<input>`, `<textarea>`, `<select>`) combined with components from the [shadcn/ui](./component-library.md) library (e.g., `Input`, `Textarea`, `Checkbox`, `Select`). Custom components like `RelationshipSelector` are also used for specific input types.
*   **Client Components:** Form logic involving state management (handling input changes) and user interaction resides within Client Components (marked with `"use client";`), such as `src/app/admin/[content-type]/[id]/client.tsx`.
*   **Submission:** Form submissions are handled using **Server Actions**. The `<form>` element's `action` prop is typically bound to a Server Action function imported from a corresponding `actions.ts` file. This allows the form data to be securely processed on the server without client-side JavaScript needing to make API calls for mutations.

## Validation with Zod

*   **Library:** [Zod](https://zod.dev/) is used for schema definition and data validation.
*   **Location:** Zod schemas defining the expected shape and constraints for different content types are typically defined within the relevant `actions.ts` file (e.g., `src/app/admin/blog-posts/[id]/actions.ts`) alongside the Server Actions that use them.
*   **Server-Side Validation:** Validation is performed **within the Server Action** *before* any database operations occur.
    *   The Server Action receives the `FormData` from the submitted form.
    *   It extracts the relevant fields.
    *   It uses the corresponding Zod schema's `.parse()` or `.safeParse()` method to validate the extracted data.
    *   If validation fails (`safeParse` returns `{ success: false }`), the Server Action should return an error state (e.g., `{ error: validationErrors }`) back to the Client Component.
    *   If validation succeeds (`safeParse` returns `{ success: true }`), the Server Action proceeds with the database operation using the validated data (`result.data`).
*   **Client-Side Feedback:** The Client Component receives the return value from the Server Action. If an error object (especially validation errors) is returned, the component should update its state to display appropriate error messages to the user next to the relevant form fields. *(Specific implementation of displaying errors needs confirmation from component code).*

## Example Flow (Admin CMS Save Action)

1.  User interacts with the form in `.../[id]/client.tsx`.
2.  User clicks the "Save" button, submitting the `<form>`.
3.  The `updateItem` Server Action (defined in `.../[id]/actions.ts`) associated with the form's `action` prop is invoked on the server.
4.  The Server Action extracts data from the `FormData`.
5.  It uses `contentSchema.safeParse(extractedData)` to validate the data against the Zod schema defined in the same file.
6.  **If validation fails:** The action returns `{ success: false, error: result.error.flatten() }`. The Client Component catches this, updates state, and displays errors.
7.  **If validation succeeds:** The action proceeds to call Supabase (`getSupabaseServiceClientRole().from(...).update(...)`) with `result.data`.
8.  After a successful database update, the action calls `revalidatePath` / `revalidateTag`.
9.  The action returns a success indicator (e.g., `{ success: true }`) or redirects. The Client Component might display a success message.

This server-centric validation approach ensures data integrity before it reaches the database and leverages Server Actions for secure processing. 