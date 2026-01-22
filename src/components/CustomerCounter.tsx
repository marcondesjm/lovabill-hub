import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const CustomerCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase
        .from("site_stats")
        .select("stat_value")
        .eq("stat_key", "customers_count")
        .single();

      if (!error && data) {
        setCount(data.stat_value);
      }
      setIsLoading(false);
    };

    fetchCount();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("site_stats_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_stats",
          filter: "stat_key=eq.customers_count",
        },
        (payload) => {
          if (payload.new && typeof payload.new.stat_value === "number") {
            setCount(payload.new.stat_value);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Users className="w-5 h-5 animate-pulse" />
        <span className="text-lg">Carregando...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 border border-primary/20"
    >
      <Users className="w-6 h-6 text-primary" />
      <span className="text-xl font-bold text-foreground">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          {count?.toLocaleString("pt-BR")}+
        </motion.span>
      </span>
      <span className="text-muted-foreground font-medium">clientes satisfeitos</span>
    </motion.div>
  );
};
