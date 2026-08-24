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
import React, { useEffect } from 'react'
import { CustomBubbleMenu } from '../components/BubbleMenu.tsx'
import { MenuBar } from '../components/MenuBar.tsx'
import { useData, triggerEvent } from '@uibakery/data'

const extensions = [
  Document, Paragraph, Text,
  Bold, Italic, Strike, Underline, TextStyle, Color, BackgroundColor,
  FontSize, TextAlign.configure({types: ['paragraph']}),
  BulletList, OrderedList, ListItem,
  UndoRedo, InvisibleCharacters.configure({visible: false})
]

export default () => {
  let componentData = useData() || {};
  
  const editor = useEditor({
    extensions,
    editable: typeof componentData.editable === 'boolean' ? componentData.editable : true,
    onUpdate: ({editor}) => {
      console.log(componentData);
      triggerEvent({type: 'change', data: editor.getJSON(), componentId: componentData?.id})
    },
    content: '<p style="text-align: left;">Lorem <strong>ipsum</strong> dolor <em><strong>sit</strong></em> amet <span style="color: rgb(255,0,0);">consectetur adipiscing</span> elit, odio interdum elementum luctus donec taciti, dui iaculis rutrum nostra quis primis.#</p>'
  })

	useEffect(() => {
    console.log(`componentData changed`, componentData);
  }, [componentData])
  
  useEffect(() => {
    if (!editor) {
      return undefined
    }

    if (typeof componentData.editable === 'boolean')
    	editor.setEditable(componentData.editable)
  }, [editor, componentData])

  if (componentData.content) {
   	editor.commands.setContent(componentData.content) 
  }
  
  return (
    <>
      <CustomBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}