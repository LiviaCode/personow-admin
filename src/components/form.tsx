import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type OptionType = string | { label: string; value: string };

export type CampoForm = {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "file" | "select" | "textarea";
  placeholder?: string;
  options?: OptionType[];
};

export function DynamicForm({
  campos,
  valores,
  onChange,
  onSubmit,
  loading,
  submitLabel,
}: {
  campos: CampoForm[];
  valores: Record<string, string | number>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  submitLabel: string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex max-h-[65vh] flex-col gap-4 overflow-y-auto"
    >
      {campos.map((campo) => (
        <div key={campo.key}>
          <Label htmlFor={campo.key} className="text-black">
            {campo.label}:
          </Label>

          {campo.type === "select" ? (
            <select
              id={campo.key}
              value={valores[campo.key] || ""}
              onChange={onChange}
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-sm text-gray-700"
            >
              {campo.options?.map((opt) => {
                const value = typeof opt === "string" ? opt : opt.value;
                const label = typeof opt === "string" ? opt : opt.label;
                return (
                  <option key={value} value={value}>
                    {label || "Selecione"}
                  </option>
                );
              })}
            </select>
          ) : campo.type === "textarea" ? (
            <textarea
              id={campo.key}
              value={valores[campo.key] || ""}
              onChange={onChange}
              placeholder={campo.placeholder || ""}
              className="h-24 w-full rounded border border-orange-400 bg-transparent p-2 text-sm text-gray-700 placeholder:text-xs placeholder:text-gray-400"
            />
          ) : (
            <Input
              id={campo.key}
              type={campo.type}
              value={valores[campo.key] || ""}
              onChange={onChange}
              placeholder={campo.placeholder || ""}
              className="w-full border border-orange-400 bg-transparent placeholder:text-xs placeholder:text-gray-400"
            />
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={loading}
        className={`w-full rounded bg-orange-400 p-3 font-semibold text-white hover:bg-orange-500 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading ? "Processando..." : submitLabel}
      </Button>
    </form>
  );
}
