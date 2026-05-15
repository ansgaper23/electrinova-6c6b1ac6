import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Trash2, ArrowUp, ArrowDown, Sparkles, Plus,
  Image as ImageIcon, Heading1, Heading2, Pilcrow, List as ListIcon, Quote, Loader2,
} from "lucide-react";
import type { BlogBlock } from "@/lib/blog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PostContext {
  title?: string;
  subtitle?: string;
  excerpt?: string;
  category?: string;
  blocks?: BlogBlock[];
}

interface Props {
  blocks: BlogBlock[];
  onChange: (b: BlogBlock[]) => void;
  context?: PostContext;
}

const blockTemplates: Partial<Record<BlogBlock["type"], BlogBlock>> = {
  heading: { type: "heading", text: "" },
  subheading: { type: "subheading", text: "" },
  paragraph: { type: "paragraph", text: "" },
  list: { type: "list", items: [""] },
  quote: { type: "quote", text: "", cite: "" },
  image: { type: "image", url: "", alt: "", caption: "" },
};

const blockMeta: Record<BlogBlock["type"], { label: string; icon: any }> = {
  heading: { label: "Título H2", icon: Heading1 },
  subheading: { label: "Subtítulo H3", icon: Heading2 },
  paragraph: { label: "Párrafo", icon: Pilcrow },
  list: { label: "Lista", icon: ListIcon },
  quote: { label: "Cita", icon: Quote },
  image: { label: "Imagen IA", icon: ImageIcon },
};

export function blocksToPlainText(blocks: BlogBlock[] = []): string {
  return blocks
    .map((b) => {
      if (b.type === "list") return b.items.join(". ");
      if ("text" in b) return (b as any).text || "";
      return "";
    })
    .filter(Boolean)
    .join(" \n");
}

export function BlockEditor({ blocks, onChange, context }: Props) {
  const update = (i: number, patch: Partial<BlogBlock>) => {
    const next = blocks.slice();
    next[i] = { ...next[i], ...patch } as BlogBlock;
    onChange(next);
  };
  const remove = (i: number) => {
    const next = blocks.slice();
    next.splice(i, 1);
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = blocks.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const insertAt = (i: number, type: BlogBlock["type"]) => {
    const next = blocks.slice();
    next.splice(i, 0, JSON.parse(JSON.stringify(blockTemplates[type])));
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <QuickAdd onAdd={(t) => insertAt(0, t)} hint="Empieza por un párrafo o un título" />
      )}

      {blocks.map((b, i) => {
        const Icon = blockMeta[b.type].icon;
        return (
          <div key={i}>
            <Card className="p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />{blockMeta[b.type].label}
                </span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => move(i, -1)} type="button" title="Subir"><ArrowUp className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => move(i, 1)} type="button" title="Bajar"><ArrowDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(i)} type="button" title="Eliminar"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>

              {b.type === "heading" || b.type === "subheading" ? (
                <Input
                  className={b.type === "heading" ? "text-xl font-bold" : "text-lg font-semibold"}
                  placeholder={b.type === "heading" ? "Título de sección" : "Subtítulo"}
                  value={b.text}
                  onChange={(e) => update(i, { text: e.target.value })}
                />
              ) : null}

              {b.type === "paragraph" ? (
                <Textarea
                  rows={5}
                  placeholder="Escribe el contenido..."
                  value={b.text}
                  onChange={(e) => update(i, { text: e.target.value })}
                  className="text-base leading-relaxed"
                />
              ) : null}

              {b.type === "list" ? (
                <ListEditor items={b.items} onChange={(items) => update(i, { items })} />
              ) : null}

              {b.type === "quote" ? (
                <div className="space-y-2">
                  <Textarea rows={2} placeholder="Texto de la cita" value={b.text} onChange={(e) => update(i, { text: e.target.value })} />
                  <Input placeholder="Autor o fuente (opcional)" value={b.cite || ""} onChange={(e) => update(i, { cite: e.target.value })} />
                </div>
              ) : null}

              {b.type === "image" ? (
                <ImageBlockEditor
                  block={b}
                  onUpdate={(patch) => update(i, patch)}
                  context={context}
                />
              ) : null}
            </Card>

            <QuickAdd onAdd={(t) => insertAt(i + 1, t)} compact />
          </div>
        );
      })}
    </div>
  );
}

function QuickAdd({
  onAdd, compact, hint,
}: { onAdd: (t: BlogBlock["type"]) => void; compact?: boolean; hint?: string }) {
  const types: BlogBlock["type"][] = ["paragraph", "heading", "subheading", "list", "quote", "image"];
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${compact ? "py-1.5 opacity-60 hover:opacity-100 transition-opacity" : "p-2"}`}>
      {hint && <span className="text-xs text-muted-foreground mr-2">{hint}:</span>}
      {!hint && <span className="text-xs text-muted-foreground mr-1">+</span>}
      {types.map((t) => {
        const Icon = blockMeta[t].icon;
        return (
          <Button
            key={t}
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onAdd(t)}
          >
            <Icon className="h-3.5 w-3.5 mr-1" />{blockMeta[t].label}
          </Button>
        );
      })}
    </div>
  );
}

function ListEditor({ items, onChange }: { items: string[]; onChange: (i: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <Input value={it} onChange={(e) => {
            const n = items.slice(); n[i] = e.target.value; onChange(n);
          }} placeholder={`Elemento ${i + 1}`} />
          <Button type="button" size="icon" variant="ghost" onClick={() => {
            const n = items.slice(); n.splice(i, 1); onChange(n.length ? n : [""]);
          }}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
        <Plus className="h-4 w-4 mr-1" />Elemento
      </Button>
    </div>
  );
}

export function ImageBlockEditor({
  block,
  onUpdate,
  context,
}: {
  block: Extract<BlogBlock, { type: "image" }>;
  onUpdate: (patch: Partial<Extract<BlogBlock, { type: "image" }>>) => void;
  context?: PostContext;
}) {
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);

  const generate = async (mode: "context" | "manual") => {
    if (mode === "context" && !context?.title && !context?.excerpt && !(context?.blocks?.length)) {
      toast.error("Agrega título o contenido al post antes de generar");
      return;
    }
    if (mode === "manual" && !hint.trim()) {
      toast.error("Describe qué quieres ver en la imagen");
      return;
    }
    setBusy(true);
    try {
      const payload: any = mode === "context"
        ? {
            title: context?.title,
            subtitle: context?.subtitle,
            excerpt: context?.excerpt,
            category: context?.category,
            contentText: blocksToPlainText(context?.blocks || []),
            hint: hint.trim() || undefined,
          }
        : { prompt: hint.trim() };

      const { data, error } = await supabase.functions.invoke("generate-blog-image", {
        body: payload,
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      const altSeed = hint.trim() || context?.title || "Imagen industrial eléctrica";
      onUpdate({
        url: (data as any).url,
        alt: block.alt || altSeed.slice(0, 120),
      });
      toast.success("Imagen generada");
    } catch (e: any) {
      toast.error(e.message || "No se pudo generar la imagen");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      {block.url ? (
        <img src={block.url} alt={block.alt || ""} className="w-full rounded-lg border aspect-video object-cover" />
      ) : (
        <div className="aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground gap-2">
          <ImageIcon className="h-8 w-8" />
          <span className="text-xs">Genera con IA o pega una URL</span>
        </div>
      )}

      <div className="space-y-2">
        <Input
          placeholder="(Opcional) Enfoque visual: ej. tablero MT, vista aérea de planta, electricista en obra…"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => generate("context")} disabled={busy} className="flex-1 min-w-[180px]">
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generar desde el post
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => generate("manual")} disabled={busy || !hint.trim()}>
            Solo desde mi descripción
          </Button>
        </div>
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer text-muted-foreground">Opciones avanzadas</summary>
        <div className="space-y-2 mt-2">
          <Input placeholder="URL manual de imagen" value={block.url} onChange={(e) => onUpdate({ url: e.target.value })} />
          <Input placeholder="Texto alternativo (alt) — SEO" value={block.alt || ""} onChange={(e) => onUpdate({ alt: e.target.value })} />
          <Input placeholder="Pie de foto (opcional)" value={block.caption || ""} onChange={(e) => onUpdate({ caption: e.target.value })} />
        </div>
      </details>
    </div>
  );
}
