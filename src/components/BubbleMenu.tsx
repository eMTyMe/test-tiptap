import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { menuStateSelector } from './MenuState.tsx'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaUndo, FaRedo, FaListOl, FaListUl, FaRemoveFormat, FaEye, FaEyeSlash, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";
import { RiFontColor } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import { Divider } from './Divider.tsx'
import { useState, useRef } from 'react'
import { triggerEvent } from '@uibakery/data'

export function CustomBubbleMenu({ editor, pluginKey, componentId }: { editor: Editor | null, pluginKey: String, componentId: String }) {
	const editorState = useEditorState({
    editor,
    selector: menuStateSelector,
  })
  
  if (!editor) {
    return null
  }

	const updatedForCurrentOpen = useRef(false)
  
  return (
    <BubbleMenu
      editor={editor}
   		pluginKey={pluginKey.current}   
      appendTo={document.body}
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
          // close alignment dropdown if its still open from the last time the menu was shown
          const dropdown = document.querySelector('#alignment-dropdown')
          if (dropdown) dropdown.removeAttribute('open')
        },
      }}
    >
      <div className="bubble-menu">
        <button type="button" onClick={() => {console.log('html', editor.getHTML()); console.log('json', editor.getJSON()); console.log('text', editor.getText())}}>CLICK ME</button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout(() => editor.chain().toggleBold().run(), 10)
          }}
          className={editorState.isBold ? 'is-active' : ''}
          title="Fett"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout(() => editor.chain().toggleItalic().run(), 10)
          }}
          className={editorState.isItalic ? 'is-active' : ''}
          title="Kursiv"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().toggleStrike().run(), 10)
          }}
          className={editorState.isStrike ? 'is-active' : ''}
          title="Durchgestrichen"
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().toggleUnderline().run(), 10)
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
              const value = Math.max(Math.min(e.target.value, 64), 8)
              if (!value) return
              if (value !== e.target.value) e.target.value = value
              editor.chain().setFontSize(`${value}px`).run()
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
              editor.chain().setColor(e.target.value).run()
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
              editor.chain().setBackgroundColor(e.target.value).run()
            }}
            title="Hintergrundfarbe"
          />
        </div>
        
        <Divider />
        
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().toggleBulletList().run(), 10)
          }}
          className={editorState.isBulletList ? 'is-active' : ''}
          title="Unsortierte Aufszählung"
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().toggleOrderedList().run(), 10)
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
                type="button"
                onMouseDown={(event) => event.preventDefault()}
              	onClick={() => {
                  editor.commands.focus()
                  setTimeout( () => editor.chain().setTextAlign('left').run(), 10)
                }}
                className={editorState.isLeft ? 'is-active' : ''}
                title="Linksbündig ausrichten"
            	>
                <FaAlignLeft />
              </button>
            </li>
            <li>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
              	onClick={() => {
                  editor.commands.focus()
                  setTimeout( () => editor.chain().setTextAlign('center').run(), 10)
                }}
                className={editorState.isCenter ? 'is-active' : ''}
                title="Zentriert"
            	>
                <FaAlignCenter />
              </button>
            </li>
            <li>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
              	onClick={() => {
                  editor.commands.focus()
                  setTimeout( () => editor.chain().setTextAlign('right').run(), 10)
                }}
                className={editorState.isRight ? 'is-active' : ''}
                title="Rechtsbündig ausrichten"
            	>
                <FaAlignRight />
              </button>
            </li>
            <li>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
              	onClick={() => {
                  editor.commands.focus()
                  setTimeout( () => editor.chain().setTextAlign('justify').run(), 10)
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
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().undo().run(), 10)
          }}
          title="Rückgängig"
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().redo().run(), 10)
          }}
          title="Wiederherstellen"
        >
          <FaRedo />
        </button>

				<Divider />
        
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.chain().unsetAllMarks().run(), 10)
          }}
          title="Formatierung entfernen"
        >
        	<FaRemoveFormat />
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            editor.commands.focus()
            setTimeout( () => editor.commands.toggleInvisibleCharacters(), 10)
          }}
          title={editorState.invCharsVisible === true ? "Verstecke unsichtbare Zeichen" : "Zeige unsichtbare Zeichen" }
          className={editorState.invCharsVisible ? 'is-active' : ''}
        >
          {editorState.invCharsVisible && <FaEye /> || <FaEyeSlash />}
        </button>
      </div>
    </BubbleMenu>
  )
}