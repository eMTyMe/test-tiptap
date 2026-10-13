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
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { UndoRedo } from '@tiptap/extensions'
import InvisibleCharacters from '@tiptap/extension-invisible-characters'
import React, { useEffect, useRef, useState } from 'react'
import { CustomBubbleMenu } from '../components/BubbleMenu.tsx'
import { useData, triggerEvent, useLoadAction, useUser, useApplication } from '@uibakery/data'
import { Extension } from "@tiptap/core";

/**
 * Generate a random alphanumeric string of given length
 * @param {Number} length
 * @returns {String}
 */
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  let randomString = Array.from({ length }, () => chars[Math.floor(Math.random() * charsLength)]);
	return randomString.join('');
}

// Custom extension for disabling the enter key when desired
const DisableEnter = Extension.create({
  name: 'disableEnterExt',
  addStorage() {
    return {
      disableEnter: false
    }
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (this.storage.disableEnter)
        	return true
      },
    };
  },
});

export default () => {
  console.log('START CUSTOM COMPONENT')
  
	const pluginKey = useRef(null)
	if (pluginKey.current === null) {
    pluginKey.current = generateRandomString(5)
  }

	const [fallbackId] = useState(() => generateRandomString(5))

  // UIB Data
  const content = useData('content', '<p><span style="color: rgb(240, 5, 5);">FORMAZIONE </span><strong>IN <em>MATERIA</em></strong><em> DI</em> SALUTE <span style="font-size: 16px;">E <em>SICUREZZA </em>SUL</span> <span style="background-color: rgb(239, 11, 11);">LAVORO</span></p>')
  const id = useData('id', fallbackId)
  const editable = useData('editable', true)
	const hideMenu = useData('hideMenu', false)
  const disableStyles = useData('disableStyles', false)
	const disableEnter = useData('disableEnter', false)
  
	let extensions = [
    Document, Paragraph, Text, UndoRedo, InvisibleCharacters.configure({visible: false}), DisableEnter,
    Bold, Italic, Strike, Underline, TextStyle, Color, BackgroundColor,
  	FontSize, TextAlign.configure({types: ['paragraph']}),
  	BulletList, OrderedList, ListItem
  ]

	const updateTimeout = useRef(null)
  const hideMenuTimeout = useRef(null)
  
  const editor = useEditor({
   	extensions,
   	content,
   	editable,
   	onUpdate: ({editor}) => {
			// Debounce update event as to not "spam" an app using this component with events and to only receive the results of user input
      if (updateTimeout.current) clearTimeout(updateTimeout.current)
      updateTimeout.current = setTimeout(() => {
   			triggerEvent({type: 'change', json: editor.getJSON(), text: editor.getText(), componentId: id})  
        updateTimeout.current = null;
      }, 350)
   	},
   	onFocus: ({ editor, event }) => {
	   	triggerEvent({type: 'focus', componentId: id})

      // cancel the timeout since the editor is focused again
      if (hideMenuTimeout.current) {
        clearTimeout(hideMenuTimeout.current)
        hideMenuTimeout.current = null
      }
  	},
  	onBlur: ({ editor, event }) => {
   		triggerEvent({type: 'blur', componentId: id})

      // hide the custom bubble menu after a timeout, because it still shows when focusing a different editor instance leading to multiple menus on the page
      if (hideMenuTimeout.current) {
        clearTimeout(hideMenuTimeout.current)
        hideMenuTimeout.current = null
      }
      hideMenuTimeout.current = setTimeout(() => {
        editor.commands.setMeta(pluginKey.current, 'hide')
      }, 300)
  	},
  })

  // Update when 'disableEnter' changes
	useEffect(() => {
    editor.storage.disableEnterExt.disableEnter = disableEnter
  }, [editor, disableEnter])
  
  // Update when 'disableStyles' changes
	useEffect(() => {
    if (disableStyles) {
      editor.chain().selectAll().unsetAllMarks().blur().run()
    }
  }, [editor, disableStyles])
  
  // Update when 'content' changes
	useEffect(() => {
    editor.commands.setContent(content, {emitUpdate: false})
  }, [editor, content])

  // Update when 'editable' changes
  useEffect(() => {
    editor.setEditable(editable, false)
  }, [editor, editable])
  
  return (
    <>
      {editable && hideMenu === false && <CustomBubbleMenu editor={editor} pluginKey={pluginKey} componentId={id} disableStyles={disableStyles} />}
      <EditorContent editor={editor} />
    </>
  )
}