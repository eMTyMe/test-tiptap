import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { bubbleMenuStateSelector } from './BubbleMenuState.tsx'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaUndo, FaRedo, FaListOl, FaListUl, FaRemoveFormat } from "react-icons/fa";
import { RiFontColor } from "react-icons/ri";
import { TbBackground } from "react-icons/tb";
import { Divider } from './Divider.tsx'
import { useEffect } from 'react'

export function CustomBubbleMenu({ editor }: { editor: Editor | null }) {
	const editorState = useEditorState({
    editor,
    selector: bubbleMenuStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu editor={editor} options={{placement: 'bottom', offset: 8, flip: true}}>
      <div className="bubble-menu">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editorState.isBold ? 'is-active' : ''}
          title="Fett"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editorState.isItalic ? 'is-active' : ''}
          title="Kursiv"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editorState.isStrike ? 'is-active' : ''}
          title="Durchgestrichen"
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editorState.isUnderline ? 'is-active' : ''}
          title="Unterstrichen"
        >
          <FaUnderline />
        </button>
        
        <Divider />

				<div>
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
            } }
          />
        </div>
        
        <Divider />

        <div>
        	<RiFontColor id="color-picker-icon" style={{ color: editorState.color }} />
					<input type="color" id="color-picker" onChange={e => editor.chain().focus().setColor(e.target.value).run()} title="Textfarbe" />
        </div>
        
        <div>
        	<TbBackground id="bg-color-picker-icon" style={{ color: editorState.bgColor }} />
					<input type="color" id="bg-color-picker" onChange={e => editor.chain().focus().setBackgroundColor(e.target.value).run()} title="Hintergrundfarbe" />
        </div>
        
        <Divider />
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
          title="Unsortierte Aufszählung"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
          title="Sortierte Aufzählung"
        >
          <FaListOl />
        </button>
        
        <Divider />
        
        <button onClick={() => editor.chain().focus().undo().run()} title="Rückgängig">
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} title="Wiederherstellen">
          <FaRedo />
        </button>

				<Divider />
        
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Formatierung entfernen">
        	<FaRemoveFormat />
        </button>
      </div>
    </BubbleMenu>
  )
}