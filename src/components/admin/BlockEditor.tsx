import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ArrowUp, ArrowDown, Sparkles, Plus, Image as ImageIcon } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  blocks: BlogBlock[];
  onChange: (b: BlogBlock[]) => void;
}

const blockTemplates: Record<BlogBlock["type"], BlogBlock> = {
  heading: { type: "heading", text: "" },
  subheading: { type: "subheading", text: "" },
  paragraph: { type: "paragraph", text: "" },
  list: { type: "list", items: [""] },
  quote: { type: "quote", text: "", cite: "" },
  image: { type: "image", url: "", alt: "", caption: "" },
};

const blockLabel: Record<BlogBlock["type"], string> = {
  heading: "Título de sección (H2)",
  subheading: "Subtítulo (H3)",
  paragraph: "Párrafo",
  list: "Lista con viñetas",
  quote: "Cita destacada",
  image: "Imagen",
};

export function BlockEditor({ blocks, onChange }: Props) {
  const [adding, setAdding] = useState<BlogBlock["type"]>("paragraph");

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
  const add = () => {
    onChange([...blocks, JSON.parse(JSON.stringify(blockTemplates[adding]))]);
  };

  return (
    <div className="space-y-4">
      {blocks.map((b, i) => (
        <Card key={i} className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              {blockLabel[b.type]}
            </span>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => move(i, -1)} type="button"><ArrowUp className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => move(i, 1)} type="button"><ArrowDown className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(i)} type="button"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>

          {b.type === "heading" || b.type === "subheading" ? (
            <Input
              placeholder={b.type === "heading" ? "Título de sección" : "Subtítulo"}
              value={b.text}
              onChange={(e) => update(i, { text: e.target.value })}
            />
          ) : null}

          {b.type === "paragraph" ? (
            <Textarea
              rows={4}
              placeholder="Escribe el contenido del párrafo..."
              value={b.text}
              onChange={(e) => update(i, { text: e.target.value })}
            />
          ) : null}

          {b.type === "list" ? (
            <ListEditor items={b.items} onChange={(items) => update(i, { items })} />
          ) : null}

          {b.type === "quote" ? (
            <div className="space-y-2">
              <Textarea
                rows={2}
                placeholder="Texto de la cita"
                value={b.text}
                onChange={(e) => update(i, { text: e.target.value })}
              />
              <Input
                placeholder="Autor o fuente (opcional)"
                value={b.cite || ""}
                onChange={(e) => update(i, { cite: e.target.value })}
              />
            </div>
          ) : null}

          {b.type === "image" ? (
            <ImageBlockEditor
              block={b}
              onUpdate={(patch) => update(i, patch)}
            />
          ) : null}
        </Card>
      ))}

      <Card className="p-4 bg-muted/30">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
          <div className="flex-1">
            <Label>Agregar bloque</Label>
            <Select value={adding} onValueChange={(v) => setAdding(v as BlogBlock["type"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="heading">Título de sección (H2)</SelectItem>
                <SelectItem value="subheading">Subtítulo (H3)</SelectItem>
                <SelectItem value="paragraph">Párrafo</SelectItem>
                <SelectItem value="list">Lista</SelectItem>
                <SelectItem value="quote">Cita</SelectItem>
                <SelectItem value="image">Imagen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={add}><Plus className="h-4 w-4 mr-2" />Añadir</Button>
        </div>
      </Card>
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
}: {
  block: Extract<BlogBlock, { type: "image" }>;
  onUpdate: (patch: Partial<Extract<BlogBlock, { type: "image" }>>) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) {
      toast.error("Describe la imagen a generar");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-image", {
        body: { prompt },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      onUpdate({ url: (data as any).url, alt: block.alt || prompt.slice(0, 120) });
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
        <img src={block.url} alt={block.alt || ""} className="w-full rounded-lg border" />
      ) : (
        <div className="aspect-video rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground">
          <ImageIcon className="h-10 w-10" />
        </div>
      )}
      <div className="flex gap-2">
        <Input
          placeholder="Describe la imagen para IA (ej: tablero eléctrico industrial Siemens en Lima)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button type="button" onClick={generate} disabled={busy}>
          <Sparkles className="h-4 w-4 mr-2" />
          {busy ? "Generando..." : "Generar IA"}
        </Button>
      </div>
      <Input
        placeholder="URL manual de imagen (opcional)"
        value={block.url}
        onChange={(e) => onUpdate({ url: e.target.value })}
      />
      <Input
        placeholder="Texto alternativo (alt) — importante para SEO"
        value={block.alt || ""}
        onChange={(e) => onUpdate({ alt: e.target.value })}
      />
      <Input
        placeholder="Pie de foto (opcional)"
        value={block.caption || ""}
        onChange={(e) => onUpdate({ caption: e.target.value })}
      />
    </div>
  );
}
