import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorOption {
  id: string;
  name: string;
  primary: string;
  accent: string;
  preview: string;
}

const colorPresets: ColorOption[] = [
  {
    id: "red",
    name: "Vermelho",
    primary: "0 84% 60%",
    accent: "45 100% 55%",
    preview: "bg-red-500"
  },
  {
    id: "green",
    name: "Verde",
    primary: "142 71% 45%",
    accent: "45 100% 55%",
    preview: "bg-green-500"
  },
  {
    id: "blue",
    name: "Azul",
    primary: "217 91% 60%",
    accent: "45 100% 55%",
    preview: "bg-blue-500"
  },
  {
    id: "purple",
    name: "Roxo",
    primary: "270 70% 60%",
    accent: "45 100% 55%",
    preview: "bg-purple-500"
  },
  {
    id: "orange",
    name: "Laranja",
    primary: "25 95% 53%",
    accent: "45 100% 55%",
    preview: "bg-orange-500"
  },
  {
    id: "pink",
    name: "Rosa",
    primary: "330 80% 60%",
    accent: "45 100% 55%",
    preview: "bg-pink-500"
  },
  {
    id: "teal",
    name: "Teal",
    primary: "175 70% 45%",
    accent: "45 100% 55%",
    preview: "bg-teal-500"
  },
  {
    id: "yellow",
    name: "Amarelo",
    primary: "45 93% 47%",
    accent: "0 84% 60%",
    preview: "bg-yellow-500"
  }
];

interface ColorPaletteProps {
  value: string;
  onChange: (colorId: string) => void;
  label?: string;
}

export const ColorPalette = ({ value, onChange, label = "Paleta de Cores" }: ColorPaletteProps) => {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="grid grid-cols-4 gap-3">
        {colorPresets.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105",
              value === color.id
                ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "border-border hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full shadow-lg",
                color.preview
              )}
            />
            <span className="text-xs font-medium text-foreground">
              {color.name}
            </span>
            {value === color.id && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const getColorPreset = (colorId: string): ColorOption | undefined => {
  return colorPresets.find(c => c.id === colorId);
};

export const colorPresetsList = colorPresets;
