import { useEffect, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon, Sparkles, Loader2,
  Undo2, Redo2, Pilcrow, Code,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { htmlToPlainText } from "@/lib/blog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export interface RichEditorContext {
  title?: string;
  subtitle?: string;
  excerpt?: string;
  category?: string;
}

interface Props {
  value: string;
  onChange: (html: string) => void;
  context?: RichEditorContext;
  placeholder?: string;
}

export function RichEditor({ value, onChange, context, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4 w-full" } }),
      Placeholder.configure({ placeholder: placeholder || "Empieza a escribir tu artículo..." }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-5 py-6 " +
          "prose-headings:font-display prose-headings:text-foreground " +
          "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 " +
          "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 " +
          "prose-p:text-foreground/90 prose-p:leading-relaxed " +
          "prose-a:text-primary prose-strong:text-foreground " +
          "prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:not-italic " +
          "prose-img:rounded-lg",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external value (e.g. when loading existing post)
  useEffect(() => {
    if (!editor) return;
    if (value && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-background overflow-hidden">
      <Toolbar editor={editor} context={context} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor, context }: { editor: Editor; context?: RichEditorContext }) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imgOpen, setImgOpen] = useState(false);
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgBusy, setImgBusy] = useState(false);

  const Btn = ({
    onClick, active, title, children, disabled,
  }: any) => (
    <Button
      type="button"
      size="sm"
      variant={active ? "secondary" : "ghost"}
      className="h-8 w-8 p-0"
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </Button>
  );

  const openLink = () => {
    const prev = editor.getAttributes("link").href || "";
    setLinkUrl(prev);
    setLinkOpen(true);
  };
  const applyLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    }
    setLinkOpen(false);
  };

  const generateImage = async (mode: "context" | "manual") => {
    if (mode === "manual" && !imgPrompt.trim()) {
      toast.error("Describe qué quieres ver");
      return;
    }
    setImgBusy(true);
    try {
      const contentText = htmlToPlainText(editor.getHTML()).slice(0, 2000);
      const payload: any = mode === "context"
        ? {
            title: context?.title,
            subtitle: context?.subtitle,
            excerpt: context?.excerpt,
            category: context?.category,
            contentText,
            hint: imgPrompt.trim() || undefined,
          }
        : { prompt: imgPrompt.trim() };
      const { data, error } = await supabase.functions.invoke("generate-blog-image", { body: payload });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const url = (data as any).url as string;
      const alt = imgPrompt.trim() || context?.title || "Imagen del artículo";
      editor.chain().focus().setImage({ src: url, alt }).run();
      toast.success("Imagen insertada");
      setImgOpen(false);
      setImgPrompt("");
    } catch (e: any) {
      toast.error(e.message || "No se pudo generar la imagen");
    } finally {
      setImgBusy(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b bg-muted/30 sticky top-[57px] z-[5]">
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Título H2"><Heading2 className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Subtítulo H3"><Heading3 className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Párrafo"><Pilcrow className="h-4 w-4" /></Btn>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Negrita"><Bold className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Cursiva"><Italic className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Subrayado"><UnderlineIcon className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Tachado"><Strikethrough className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Código"><Code className="h-4 w-4" /></Btn>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista"><List className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista numerada"><ListOrdered className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Cita"><Quote className="h-4 w-4" /></Btn>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Btn onClick={openLink} active={editor.isActive("link")} title="Enlace"><LinkIcon className="h-4 w-4" /></Btn>
        <Btn onClick={() => setImgOpen(true)} title="Imagen IA"><ImageIcon className="h-4 w-4" /></Btn>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Deshacer"><Undo2 className="h-4 w-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Rehacer"><Redo2 className="h-4 w-4" /></Btn>
      </div>

      <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Insertar enlace</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input autoFocus value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." />
            <p className="text-xs text-muted-foreground">Deja vacío para quitar el enlace.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkOpen(false)}>Cancelar</Button>
            <Button onClick={applyLink}>Aplicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={imgOpen} onOpenChange={(o) => { if (!imgBusy) setImgOpen(o); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Generar imagen con IA</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Enfoque visual (opcional)</Label>
              <Input
                value={imgPrompt}
                onChange={(e) => setImgPrompt(e.target.value)}
                placeholder="Ej: tablero de media tensión, electricista en obra…"
              />
              <p className="text-xs text-muted-foreground">
                La IA usará el contenido del artículo como contexto. Añade un detalle opcional para guiar el resultado.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => generateImage("context")} disabled={imgBusy} className="flex-1 min-w-[200px]">
                {imgBusy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generar desde el artículo
              </Button>
              <Button variant="outline" onClick={() => generateImage("manual")} disabled={imgBusy || !imgPrompt.trim()}>
                Solo desde mi descripción
              </Button>
            </div>
            <details className="text-sm">
              <summary className="cursor-pointer text-muted-foreground">O insertar URL manualmente</summary>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="https://ejemplo.com/imagen.jpg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const url = (e.target as HTMLInputElement).value.trim();
                      if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                        setImgOpen(false);
                      }
                    }
                  }}
                />
              </div>
            </details>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
