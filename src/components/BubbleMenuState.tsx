import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

/**
 * State selector for the BubbleMenu component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function bubbleMenuStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // Text formatting
    isBold: ctx.editor.isActive('bold') ?? false,
    isItalic: ctx.editor.isActive('italic') ?? false,
    isStrike: ctx.editor.isActive('strike') ?? false,
    isUnderline: ctx.editor.isActive('underline') ?? false,

		// Font size
    fontSize: ctx.editor.getAttributes('textStyle').fontSize ?? "12px",
    
    // color
		color: ctx.editor.getAttributes('textStyle').color,
    bgColor: ctx.editor.getAttributes('textStyle').backgroundColor,
    
    // Clear
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
    canClearNodes: ctx.editor.can().chain().clearNodes().run() ?? false,

    // Lists and blocks
    isBulletList: ctx.editor.isActive('bulletList') ?? false,
    isOrderedList: ctx.editor.isActive('orderedList') ?? false,

    // History
    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,
  }
}

export type BubbleMenuState = ReturnType<typeof bubbleMenuStateSelector>