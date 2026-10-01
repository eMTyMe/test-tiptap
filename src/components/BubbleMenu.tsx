import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { menuStateSelector } from './MenuState.tsx'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaUndo, FaRedo, FaListOl, FaListUl, FaRemoveFormat, FaEye, FaEyeSlash, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";
import { RiFontColor } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import { Divider } from './Divider.tsx'
import { useState, useRef } from 'react'

export function CustomBubbleMenu({ editor, onUpdate, pluginKey }: { editor: Editor | null, onUpdate: Function, pluginKey: String }) {
	const editorState = useEditorState({
    editor,
    selector: menuStateSelector,
  })
  
  if (!editor) {
    return null
  }

	const updatedForCurrentOpen = useRef(false);
  
  return (
    <BubbleMenu
      editor={editor}
   		pluginKey={pluginKey.current}   
      appendTo={() => {
        console.log("appending to", document.body);
      	return document.body
      }}
      options={{
        strategy: 'absolute',
    		placement: 'top',
    		offset: 8,
    		flip: {
      		fallbackPlacements: ['bottom', 'top-start', 'bottom-start'],
    		},
    		shift: {
      		padding: 12,
    		},
        onShow: () => {
          const dropdown = document.querySelector('#alignment-dropdown')
          if (dropdown) dropdown.removeAttribute('open')

          // force position update on first show to fix wrong position on initialization
          /*if (updatedForCurrentOpen.current) return
          
          updatedForCurrentOpen.current = true

          requestAnimationFrame(() => {
            if (!editor.isDestroyed) {
              editor.commands.setMeta(
                pluginKey.current,
                'updatePosition',
              )
            }
          })*/
        },
      }}
    >
      <div className="bubble-menu">
        <button onClick={() => {console.log('html', editor.getHTML()); console.log('json', editor.getJSON()); console.log('text', editor.getText())}}>CLICK ME</button>
        <button
          onClick={() => {
            editor.chain().focus().toggleBold().run()
            onUpdate(editor)
          }}
          className={editorState.isBold ? 'is-active' : ''}
          title="Fett"
        >
          <FaBold />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
            onUpdate(editor)
          }}
          className={editorState.isItalic ? 'is-active' : ''}
          title="Kursiv"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleStrike().run()
            onUpdate(editor)
          }}
          className={editorState.isStrike ? 'is-active' : ''}
          title="Durchgestrichen"
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleUnderline().run()
            onUpdate(editor)
          }}
          className={editorState.isUnderline ? 'is-active' : ''}
          title="Unterstrichen"
        >
          <FaUnderline />
        </button>
        
        <Divider />

				<div title="Schriftgröße">
        	<input
            type="number"
            id="font-size"
            min={8}
            max={64}
            value={ Number.isNaN(parseInt(editorState.fontSize)) ? 12 : parseInt(editorState.fontSize) }
            onChange={e => {
              const value = e.target.value
              if (!value) return
              editor.chain().focus().setFontSize(`${value}px`).run()
              onUpdate(editor)
            } }
          />
        </div>
        
        <Divider />

        <div>
        	<RiFontColor id="color-picker-icon" style={{ color: editorState.color }} />
					<input
            type="color"
            id="color-picker"
            onChange={e => {
              editor.chain().focus().setColor(e.target.value).run()
              onUpdate(editor)
            }}
            title="Textfarbe"
          />
        </div>
        
        <div>
        	<TbBackground id="bg-color-picker-icon" style={{ color: editorState.bgColor }} />
					<input
            type="color"
            id="bg-color-picker"
            onChange={e => {
              editor.chain().focus().setBackgroundColor(e.target.value).run()
              onUpdate(editor)
            }}
            title="Hintergrundfarbe"
          />
        </div>
        
        <Divider />
        
        <button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
            onUpdate(editor)
          }}
          className={editorState.isBulletList ? 'is-active' : ''}
          title="Unsortierte Aufszählung"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run()
            onUpdate(editor)
          }}
          className={editorState.isOrderedList ? 'is-active' : ''}
          title="Sortierte Aufzählung"
        >
          <FaListOl />
        </button>
        
        <Divider />

				<details id="alignment-dropdown" title="Ausrichtung">
          <summary>{
            editorState.isCenter && <FaAlignCenter /> ||
            editorState.isRight && <FaAlignRight /> ||
            editorState.isJustify && <FaAlignJustify /> ||
            <FaAlignLeft />
          }</summary>
          <ul>
            <li>
              <button
              	onClick={() => {
                  editor.chain().focus().setTextAlign('left').run()
                  onUpdate(editor)
                }}
                className={editorState.isLeft ? 'is-active' : ''}
                title="Linksbündig ausrichten"
            	>
                <FaAlignLeft />
              </button>
            </li>
            <li>
              <button
              	onClick={() => {
                  editor.chain().focus().setTextAlign('center').run()
                  onUpdate(editor)
                }}
                className={editorState.isCenter ? 'is-active' : ''}
                title="Zentriert"
            	>
                <FaAlignCenter />
              </button>
            </li>
            <li>
              <button
              	onClick={() => {
                  editor.chain().focus().setTextAlign('right').run()
                  onUpdate(editor)
                }}
                className={editorState.isRight ? 'is-active' : ''}
                title="Rechtsbündig ausrichten"
            	>
                <FaAlignRight />
              </button>
            </li>
            <li>
              <button
              	onClick={() => {
                  editor.chain().focus().setTextAlign('justify').run()
                  onUpdate(editor)
                }}
                className={editorState.isJustify ? 'is-active' : ''}
                title="Blocksatz"
            	>
                <FaAlignJustify />
              </button>
            </li>
          </ul>
        </details>
        
        <Divider />
        
        <button
          onClick={() => {
            editor.chain().focus().undo().run()
            onUpdate(editor)
          }}
          title="Rückgängig"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => {
            editor.chain().focus().redo().run()
            onUpdate(editor)
          }}
          title="Wiederherstellen"
        >
          <FaRedo />
        </button>

				<Divider />
        
        <button
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run()
            onUpdate(editor)
          }}
          title="Formatierung entfernen"
        >
        	<FaRemoveFormat />
        </button>
        <button
          onClick={() => editor.commands.toggleInvisibleCharacters()}
          title={editorState.invCharsVisible === true ? "Verstecke unsichtbare Zeichen" : "Zeige unsichtbare Zeichen" }
          className={editorState.invCharsVisible ? 'is-active' : ''}
        >
          {editorState.invCharsVisible && <FaEye /> || <FaEyeSlash />}
        </button>
      </div>
    </BubbleMenu>
  )
}