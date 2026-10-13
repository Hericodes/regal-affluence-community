import { useId, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Image from "@tiptap/extension-image";
import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

import { ArticleProse } from "../News/News.styles";
import { Button, Input } from "./Admin.styles";

/* =========================================================
   RICH TEXT EDITOR
   TipTap configured for exactly the formatting the public
   article page supports. Output is sanitised again before
   saving and before rendering.
========================================================= */

interface RichTextEditorProps {
  id: string;
  initialHtml: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string>;
}

type Panel = "none" | "link" | "image";

const RichTextEditor = ({
  id,
  initialHtml,
  invalid,
  describedBy,
  onChange,
  onUploadImage,
}: RichTextEditorProps) => {
  const [panel, setPanel] = useState<Panel>("none");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          protocols: ["http", "https", "mailto", "tel"],
        },
      }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-labelledby": `${id}-label`,
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  const active = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      h2: current?.isActive("heading", { level: 2 }) ?? false,
      h3: current?.isActive("heading", { level: 3 }) ?? false,
      bold: current?.isActive("bold") ?? false,
      italic: current?.isActive("italic") ?? false,
      underline: current?.isActive("underline") ?? false,
      bullet: current?.isActive("bulletList") ?? false,
      ordered: current?.isActive("orderedList") ?? false,
      quote: current?.isActive("blockquote") ?? false,
      link: current?.isActive("link") ?? false,
      canUndo: current?.can().undo() ?? false,
      canRedo: current?.can().redo() ?? false,
    }),
  });

  if (!editor || !active) return null;

  const chain = () => editor.chain().focus();

  return (
    <Wrapper $invalid={invalid}>
      <Toolbar role="toolbar" aria-label="Formatting" aria-controls={id}>
        <Group>
          <Tool label="Heading" pressed={active.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
            H2
          </Tool>
          <Tool label="Subheading" pressed={active.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
            H3
          </Tool>
        </Group>

        <Group>
          <Tool label="Bold" pressed={active.bold} onClick={() => chain().toggleBold().run()}>
            <strong>B</strong>
          </Tool>
          <Tool label="Italic" pressed={active.italic} onClick={() => chain().toggleItalic().run()}>
            <em>I</em>
          </Tool>
          <Tool label="Underline" pressed={active.underline} onClick={() => chain().toggleUnderline().run()}>
            <u>U</u>
          </Tool>
        </Group>

        <Group>
          <Tool label="Bulleted list" pressed={active.bullet} onClick={() => chain().toggleBulletList().run()}>
            • List
          </Tool>
          <Tool label="Numbered list" pressed={active.ordered} onClick={() => chain().toggleOrderedList().run()}>
            1. List
          </Tool>
          <Tool label="Quote" pressed={active.quote} onClick={() => chain().toggleBlockquote().run()}>
            “ Quote
          </Tool>
          <Tool label="Divider" onClick={() => chain().setHorizontalRule().run()}>
            ― Divider
          </Tool>
        </Group>

        <Group>
          <Tool
            label="Link"
            pressed={active.link || panel === "link"}
            onClick={() => setPanel(panel === "link" ? "none" : "link")}
          >
            Link
          </Tool>
          <Tool
            label="Insert image"
            pressed={panel === "image"}
            onClick={() => setPanel(panel === "image" ? "none" : "image")}
          >
            Image
          </Tool>
        </Group>

        <Group>
          <Tool label="Undo" disabled={!active.canUndo} onClick={() => chain().undo().run()}>
            ↶
          </Tool>
          <Tool label="Redo" disabled={!active.canRedo} onClick={() => chain().redo().run()}>
            ↷
          </Tool>
        </Group>
      </Toolbar>

      {panel === "link" && (
        <LinkPanel editor={editor} onClose={() => setPanel("none")} />
      )}

      {panel === "image" && (
        <ImagePanel
          editor={editor}
          onUpload={onUploadImage}
          onClose={() => setPanel("none")}
        />
      )}

      <Surface>
        <EditorContent editor={editor} />
      </Surface>
    </Wrapper>
  );
};

export default RichTextEditor;

/* =========================================================
   TOOL BUTTON
========================================================= */

const Tool = ({
  label,
  pressed,
  disabled,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <ToolButton
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={pressed}
    disabled={disabled}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
  >
    {children}
  </ToolButton>
);

/* =========================================================
   LINK PANEL
========================================================= */

const LINK_PATTERN = /^(https?:\/\/|mailto:|tel:)/i;

const LinkPanel = ({
  editor,
  onClose,
}: {
  editor: Editor;
  onClose: () => void;
}) => {
  const inputId = useId();
  const [url, setUrl] = useState<string>(
    (editor.getAttributes("link").href as string | undefined) ?? ""
  );
  const [error, setError] = useState("");

  const apply = (event: FormEvent) => {
    event.preventDefault();

    let href = url.trim();

    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      onClose();
      return;
    }

    if (!LINK_PATTERN.test(href) && /^[\w-]+(\.[\w-]+)+/.test(href)) {
      href = `https://${href}`;
    }

    if (!LINK_PATTERN.test(href)) {
      setError("Enter a full web address, such as https://example.com.");
      return;
    }

    if (editor.state.selection.empty && !editor.isActive("link")) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: href.replace(/^(https?:\/\/|mailto:|tel:)/i, ""),
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }

    onClose();
  };

  return (
    <InlinePanel onSubmit={apply}>
      <label htmlFor={inputId}>Link address</label>
      <Input
        id={inputId}
        type="url"
        placeholder="https://"
        value={url}
        autoFocus
        onChange={(event) => {
          setUrl(event.target.value);
          setError("");
        }}
      />
      <Button type="submit" $size="sm" $variant="primary">
        Apply
      </Button>
      {editor.isActive("link") && (
        <Button
          type="button"
          $size="sm"
          onClick={() => {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            onClose();
          }}
        >
          Remove link
        </Button>
      )}
      <Button type="button" $size="sm" $variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      {error && <PanelError role="alert">{error}</PanelError>}
    </InlinePanel>
  );
};

/* =========================================================
   IMAGE PANEL
========================================================= */

const ImagePanel = ({
  editor,
  onUpload,
  onClose,
}: {
  editor: Editor;
  onUpload: (file: File) => Promise<string>;
  onClose: () => void;
}) => {
  const fileId = useId();
  const altId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const insert = async (event: FormEvent) => {
    event.preventDefault();

    const file = fileRef.current?.files?.[0];

    if (!file) {
      setError("Choose an image to upload.");
      return;
    }

    if (!alt.trim()) {
      setError("Describe the image for people using screen readers.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const src = await onUpload(file);
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
      onClose();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The image could not be uploaded."
      );
      setUploading(false);
    }
  };

  return (
    <InlinePanel onSubmit={insert}>
      <label htmlFor={fileId}>Image</label>
      <input
        id={fileId}
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={uploading}
      />
      <label htmlFor={altId}>Description</label>
      <Input
        id={altId}
        value={alt}
        maxLength={250}
        placeholder="What does the image show?"
        disabled={uploading}
        onChange={(event) => setAlt(event.target.value)}
      />
      <Button type="submit" $size="sm" $variant="primary" disabled={uploading} aria-busy={uploading}>
        {uploading ? "Uploading…" : "Upload & insert"}
      </Button>
      <Button type="button" $size="sm" $variant="ghost" onClick={onClose} disabled={uploading}>
        Cancel
      </Button>
      {error && <PanelError role="alert">{error}</PanelError>}
    </InlinePanel>
  );
};

/* =========================================================
   STYLES
========================================================= */

const Wrapper = styled.div<{ $invalid?: boolean }>`
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.error : "rgba(77, 48, 108, 0.2)"};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.white};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.12);
  }
`;

const Toolbar = styled.div`
  position: sticky;
  top: 72px;
  z-index: 2;

  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  padding: 8px;

  border-bottom: 1px solid rgba(77, 48, 108, 0.1);
  border-radius:
    ${({ theme }) => theme.radius.sm}
    ${({ theme }) => theme.radius.sm}
    0 0;

  background: ${({ theme }) => theme.colors.ivory};
`;

const Group = styled.div`
  display: flex;
  gap: 2px;

  & + & {
    padding-left: 6px;

    border-left: 1px solid rgba(77, 48, 108, 0.12);
  }
`;

const ToolButton = styled.button`
  min-width: 34px;
  height: 34px;

  padding: 0 9px;

  border-radius: 6px;

  color: ${({ theme }) => theme.colors.text};

  font-size: 14px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: rgba(91, 33, 182, 0.08);
  }

  &[aria-pressed="true"] {
    background: rgba(91, 33, 182, 0.14);
    color: ${({ theme }) => theme.colors.purple};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const InlinePanel = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  padding: 12px;

  border-bottom: 1px solid rgba(77, 48, 108, 0.1);

  background: rgba(91, 33, 182, 0.03);

  font-size: 14px;

  label {
    font-weight: 600;
  }

  ${Input} {
    flex: 1 1 220px;
    height: 38px;
  }
`;

const PanelError = styled.p`
  flex-basis: 100%;

  color: ${({ theme }) => theme.colors.error};
`;

const Surface = styled(ArticleProse)`
  padding: 20px 22px;

  font-size: 17px;

  .tiptap {
    min-height: 360px;

    &:focus {
      outline: none;
    }

    > * + * {
      margin-top: 1.1em;
    }
  }

  .tiptap img.ProseMirror-selectednode {
    outline: 3px solid ${({ theme }) => theme.colors.purpleSoft};
  }
`;
