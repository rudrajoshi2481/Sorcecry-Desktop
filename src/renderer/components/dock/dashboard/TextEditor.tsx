import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import {Box,Button as CBtn,HStack } from "@chakra-ui/react"

import {AiOutlineBold,AiOutlineItalic,AiOutlineUnderline,AiOutlineCode} from "react-icons/ai"
// import { Button, Icon, Toolbar } from '../components'


const Icon = (props:any) => {
  return(
    <Box>{props.children}</Box>
  )
}

const Button = (props:any) => {
  return(
    <Box><CBtn variant={"ghost"}>{props.children}</CBtn></Box>
  )
}

const Toolbar = (props:any) => {
  return(
    <HStack pb="1"  display={"flex"} flexWrap={"wrap"}>
      {
        props.children
      }
    </HStack>
  )
}

const HOTKEYS:any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

let LIST_TYPES:any = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES:any = ['left', 'center', 'right', 'justify']

export const TextEditor = () => {
  const renderElement:any = useCallback((props:any) => <Element {...props} />, [])
  const renderLeaf:any = useCallback((props:any) => <Leaf {...props} />, [])
  const editor:any = useMemo(() => withHistory(withReact(createEditor())), [])



  return (
    <Box minW={"100%"}  p="3"  border={"1px solid green"}>

    <Slate  editor={editor} value={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon={<AiOutlineBold />} />
        <MarkButton format="italic" icon={<AiOutlineItalic />} />
        <MarkButton format="underline" icon={<AiOutlineUnderline />} />
        <MarkButton format="code" icon={<AiOutlineCode />} />
        {/* <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" /> */}
      </Toolbar>
      <Box >
      <Editable
      style={{minHeight:"30vh",width:"100%"}}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck={false}
        // autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
      </Box>
    </Slate>
</Box>
  )
}

const toggleBlock = (editor:any, format:any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList:any = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n:any) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n) &&
      // LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: (Partial<SlateElement> | any)
  if (TEXT_ALIGN_TYPES.includes(format)){
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor:any, format:any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor:any, format:any, blockType = "left") => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n)
        // n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor:any, format:any) => {
  const marks:any = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }:any) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }:any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }:any) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event:any) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }:any) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event:any) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const initialValue: any = [
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Aim:",
              "bold": true
          },
          {
              "text": " to perfrom molecular docking studies of Olaparib 🧪."
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Procedure:  ",
              "bold": true
          },
          {
              "text": "Sint deserunt in commodo ea nostrud incididunt do officia pariatur magna est. Irure tempor velit velit sit reprehenderit. Do consequat magna veniam mollit in commodo reprehenderit est officia. Minim id aute nulla ut deserunt sit ipsum laboris ullamco. Ut tempor mollit ad qui id reprehenderit laborum sint Lorem quis sint."
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Velit non ea laborum nostrud ea mollit anim aute tempor sunt velit incididunt non minim. Laboris et excepteur officia anim amet id. Reprehenderit in culpa consectetur occaecat elit et."
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Minim aliqua eu quis eiusmod qui ex consequat consectetur aliqua adipisicing in cillum eiusmod. Minim voluptate laborum id sunt exercitation et ut minim velit. Anim tempor veniam labore qui qui culpa nisi officia aliqua Lorem. Aliqua non sint qui anim. Adipisicing culpa voluptate aute aliqua nulla officia cupidatat occaecat enim id nulla elit. Lorem dolore reprehenderit sunt do proident labore. Duis reprehenderit culpa et et quis."
          }
      ]
  }
]
