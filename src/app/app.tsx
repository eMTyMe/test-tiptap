import './styles.css'

import { TextStyleKit } from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import { Color, BackgroundColor, TextStyle, FontSize } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { BulletList, OrderedList, ListItem } from '@tiptap/extension-list'
import { EditorContent, useEditor } from '@tiptap/react'
import { UndoRedo } from '@tiptap/extensions'
import React from 'react'
import { CustomBubbleMenu } from '../components/BubbleMenu.tsx'

const extensions = [Document, Paragraph, Text, Bold, Italic, Strike, Underline, Color, BackgroundColor, TextStyle, FontSize, TextAlign, BulletList, OrderedList, ListItem, TextStyleKit, UndoRedo]

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