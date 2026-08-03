import './styles.css'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import { TextStyle, Color, BackgroundColor, FontSize  } from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { BulletList, OrderedList, ListItem } from '@tiptap/extension-list'
import { EditorContent, useEditor } from '@tiptap/react'
import { UndoRedo } from '@tiptap/extensions'
import InvisibleCharacters from '@tiptap/extension-invisible-characters'
import React from 'react'
import { CustomBubbleMenu } from '../components/BubbleMenu.tsx'
import { useData } from '@uibakery/data'

const extensions = [
  Document, Paragraph, Text,
  Bold, Italic, Strike, Underline, TextStyle, Color, BackgroundColor,
  FontSize, TextAlign.configure({types: ['paragraph'], defaultAlignment: 'left',}),
  BulletList, OrderedList, ListItem,
  UndoRedo, InvisibleCharacters.configure({visible: false})
]

export default () => {
  const editor = useEditor({
    extensions,
    content: `
<h2>
  Hi there,
</h2>
`,
  })

	const data = useData('el', null);
  console.log('el####', data);
  
  return (
    <>
      <CustomBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}