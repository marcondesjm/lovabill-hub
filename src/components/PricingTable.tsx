import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "./ui/card";

const pricingData = [
  { credits: "100", price: "R$ 97", bonus: "+50" },
  { credits: "150", price: "R$ 127", bonus: "+50" },
  { credits: "200", price: "R$ 157", bonus: "+50" },
  { credits: "250", price: "R$ 177", bonus: "+50" },
  { credits: "300", price: "R$ 197", bonus: "+50" },
  { credits: "400", price: "R$ 297", bonus: "+50" },
  { credits: "500", price: "R$ 347", bonus: "+50", featured: true },
  { credits: "1000", price: "R$ 597", bonus: "+50" },
  { credits: "1500", price: "R$ 697", bonus: "+50" },
  { credits: "2000", price: "R$ 847", bonus: "+50" },
];

export const PricingTable = () => {
  return (
    <section className="py-12 px-4 bg-gradient-primary">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-foreground font-bold">
                  Pacote de Créditos
                </th>
                <th className="text-center py-4 px-4 text-foreground font-bold">
                  Preço
                </th>
                <th className="text-center py-4 px-4 text-foreground font-bold">
                  Bônus 🎁
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                    item.featured ? "bg-secondary" : ""
                  }`}
                >
                  <td className="py-4 px-4 text-foreground font-semibold">
                    {item.credits} Créditos
                  </td>
                  <td className="py-4 px-4 text-center text-foreground font-bold text-lg">
                    {item.price}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-accent font-bold text-lg">
                      {item.bonus} <Star className="w-5 h-5 fill-current" />
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Card className="inline-block bg-muted border-border p-4">
            <p className="text-muted-foreground text-sm">
              ⏱️ <strong>PRAZO DE ENTREGA:</strong> Os créditos são processados e
              creditados na sua conta entre 45 a 120 minutos após a confirmação do
              pagamento.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
