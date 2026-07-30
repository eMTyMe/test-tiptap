import './styles.css'

import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { MenuBar } from '../components/MenuBar.tsx'
import { CustomBubbleMenu } from '@/components/BubbleMenu.tsx'

const extensions = [TextStyleKit, StarterKit]

export default () => {
  const editor = useEditor({
    extensions,
    content: `
<h2>
  Hi there,
</h2>
`,
  })

      //<MenuBar editor={editor} />
  return (
    <>
      <CustomBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}