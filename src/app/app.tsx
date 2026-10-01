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
import { useData, triggerEvent } from '@uibakery/data'

const extensions = [
  Document, Paragraph, Text,
  Bold, Italic, Strike, Underline, TextStyle, Color, BackgroundColor,
  FontSize, TextAlign.configure({types: ['paragraph']}),
  BulletList, OrderedList, ListItem,
  UndoRedo, InvisibleCharacters.configure({visible: false})
]

export default () => {
  console.log('start component')
  let componentData = useData() || {};
  
	const id = componentData.id;

	function onContentOrStyleUpdate({editor}) {
    triggerEvent({type: 'change', data: editor.getJSON(), componentId: id})
  }
  
  const editor = useEditor({
    extensions,
    editable: typeof componentData.editable === 'boolean' ? componentData.editable : true,
    onUpdate: onContentOrStyleUpdate,
    onFocus({ editor, event }) {
    	triggerEvent({type: 'focus', componentId: id})
  	},
  	onBlur({ editor, event }) {
    	triggerEvent({type: 'blur', componentId: id})
  	},
    content: componentData.content || '<p><span style="color: rgb(240, 5, 5);">FORMAZIONE </span><strong>IN <em>MATERIA</em></strong><em> DI</em> SALUTE <span style="font-size: 16px;">E <em>SICUREZZA </em>SUL</span> <span style="background-color: rgb(239, 11, 11);">LAVORO</span></p>'
  })
  
  useEffect(() => {
    console.log("useEffect", componentData)
    if (!editor) {
      return undefined
    }
    
    if (typeof componentData.editable === 'boolean')
    	editor.setEditable(componentData.editable)

    if (typeof componentData.content === 'string') {
    	editor.commands.setContent(componentData.content)   
    }
  }, [editor, componentData])

  if (componentData.content) {
   	editor.commands.setContent(componentData.content) 
  }
  
  return (
    <>
      {componentData.editable === false || <CustomBubbleMenu editor={editor} onUpdate={onContentOrStyleUpdate} />}
      <EditorContent editor={editor} />
    </>
  )
}