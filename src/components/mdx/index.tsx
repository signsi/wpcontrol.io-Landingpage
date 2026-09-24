import Callout from './Callout'
import CodeBlock from './CodeBlock'
import { Step, Steps } from './Steps'
import { KeyTakeaways, MdxImage, MdxLink, MdxTable } from './primitives'

/**
 * Wird als `components`-Prop an jeden MDX-Body übergeben. Bewusst ohne
 * MDXProvider, damit @mdx-js/react keine zusätzliche Abhängigkeit wird.
 */
export const mdxComponents = {
  a: MdxLink,
  pre: CodeBlock,
  table: MdxTable,
  img: MdxImage,
  Callout,
  Steps,
  Step,
  KeyTakeaways,
}
