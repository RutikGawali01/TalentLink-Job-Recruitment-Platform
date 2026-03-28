import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useEffect } from 'react';
import { content } from "../assets/Data/PostJob";

const TextEditor = (props) => {
  useEffect(() => {
    editor?.commands.setContent(props.data);
  }, [props.data]);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link, Superscript, SubScript, Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: props.form.getValues().description,
    onUpdate({ editor }) {
      props.form.setFieldValue('description', editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor} style={{ border: "none" }}>
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={0}
        style={{
          background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
          borderBottom: "1px solid rgba(59,130,246,0.15)",
          borderRadius: 0,
          flexWrap: "wrap",
          gap: 4,
          padding: "6px 10px",
        }}
      >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content style={{
        background: "rgba(255,255,255,0.7)",
        minHeight: 180,
        fontSize: 14,
        lineHeight: 1.7,
      }} />
    </RichTextEditor>
  );
};

export default TextEditor;