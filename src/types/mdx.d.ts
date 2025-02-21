// types/mdx.d.ts
declare module '*.mdx' {
    import { ReactNode } from 'react';
    const content: ReactNode;
    export default content;
  }
  
  declare module '@mdx-js/react' {
    import { ComponentType, ReactNode } from 'react';
  
    export interface MDXProps {
      children: ReactNode;
    }
    export const MDXProvider: ComponentType<MDXProviderProps>;
  }